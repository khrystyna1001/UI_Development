import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import NavigationHeader from '../../components/header';
import NavigationFooter from '../../components/footer';

import { router } from 'expo-router';

import SearchFilterBar from '../../components/searchfilter';
import FilterModal from '../../components/filtermodal';

import { styles } from '../../styles/nav/farm';

import { getFarms, getMyData } from '../../scripts/api';

const GREEN = '#4CAF50';

const FarmListScreen = () => {
  const [farms, setFarms] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('newest');
  
  const [user, setUser] = useState(null);

  const filterOptions = [
    { label: 'Newest First', value: 'newest' },
    { label: 'Oldest First', value: 'oldest' },
  ];

  const fetchFarms = async () => {
    try {
      const data = await getFarms();
      setFarms(data);

      const filtered = applyFilters(data, searchQuery, selectedFilter);
      setFilteredFarms(filtered);

      const response = await getMyData();
      setUser(response);
    } catch (err) {
      console.error('Error fetching farms:', err);
      setError('Failed to load farms. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, [filteredFarms, farms, selectedFilter]);

  const applyFilters = (data, query, sortBy) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    let result = [...data];
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(farm => 
        (farm?.name?.toLowerCase().includes(lowerQuery) || 
        farm?.location?.toLowerCase().includes(lowerQuery) ||
        farm?.description?.toLowerCase().includes(lowerQuery)) ?? false
      );
    }
    
    switch(sortBy) {
      case 'oldest':
        result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    
    return result;
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = applyFilters(farms, text, selectedFilter);
    setFilteredFarms(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchFarms();
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={GREEN} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={fetchFarms}
        >
          <Text style={styles.primaryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationHeader />
      <ScrollView
        style={styles.scrollViewContent}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[GREEN]}
            tintColor={GREEN}
          />
        }
      >
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onFilterPress={() => setShowFilterModal(true)}
          placeholder="Search farms..."
        />

        <View style={styles.section}>
          {filteredFarms.length > 0 ? (
            filteredFarms.map((farm) => (
              <TouchableOpacity 
                key={farm.id} 
                style={styles.farmCard}
                onPress={() => router.navigate(`/farm/${farm.id}`)}
              >
                <View style={styles.farmImagePlaceholder}>
                  <Image 
                    source={{ uri: farm.image || 'https://via.placeholder.com/300' }} 
                    style={styles.farmImagePlaceholder}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.farmContent}>
                  <Text style={styles.farmName}>{farm.name}</Text>
                  <View style={styles.farmLocation}>
                    <Feather name="map-pin" size={14} color="#666" style={styles.locationIcon} />
                    <Text style={styles.locationText}>{farm.location}</Text>
                  </View>
                  <Text 
                    style={styles.farmDescription}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {farm.description}
                  </Text>
                  <View style={styles.farmMeta}>
                    <View style={styles.farmDetail}>
                      <Feather name="calendar" size={14} color="#777" />
                      <Text style={styles.detailText}>
                        {new Date(farm.created_at).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultsText}>
              {searchQuery ? 'No matching farms found' : 'No farms available'}
            </Text>
          )}
        </View>
      </ScrollView>

      {user?.is_superuser && (
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => router.navigate('/farm/create')}
      >
        <Text style={styles.createButtonText}>Add New Farm</Text>
      </TouchableOpacity>
      )}
       <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        title="Sort By"
        options={filterOptions}
        selectedOption={selectedFilter}
        onSelect={(value) => {
          setSelectedFilter(value);
          setShowFilterModal(false);
        }}
      />
      <NavigationFooter />
    </SafeAreaView>
  );
};

export default FarmListScreen;