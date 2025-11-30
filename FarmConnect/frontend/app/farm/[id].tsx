import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { getFarm, deleteFarm } from '../../scripts/api';
import NavigationHeader from '../../components/header';
import NavigationFooter from '../../components/footer';
import { styles } from '../../styles/nav/farmdetail';

const GREEN = '#4CAF50';

const FarmDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarm = async () => {
      try {
        const data = await getFarm(id);
        setFarm(data);
      } catch (err) {
        console.error('Error fetching farm:', err);
        setError('Failed to load farm details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFarm();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteFarm(id);
    } catch (err) {
      console.error('Error deleting farm:', err);
      setError('Failed to delete farm');
    }
    router.replace('/farm');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error || !farm) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Farm not found'}</Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationHeader />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={20} color="#333" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {/* Farm Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.farmName}>{farm.name}</Text>
            <View style={styles.locationContainer}>
              <Feather name="map-pin" size={16} color="#666" />
              <Text style={styles.locationText}>{farm.location}</Text>
            </View>
          </View>
        </View>

        {/* Farm Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{farm.description}</Text>
        </View>

        {/* Farm Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{new Date(farm.created_at || 'N/A').toLocaleDateString()}</Text>
            <Text style={styles.statLabel}>Created</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{farm.products?.length || 0}</Text>
            <Text style={styles.statLabel}>Products</Text>
          </View>
        </View>
        <View style={styles.statItem}>
            <Text style={styles.statValue}>{new Date(farm.updated_at || 'N/A').toLocaleDateString()}</Text>
            <Text style={styles.statLabel}>Updated</Text>
          </View>
      </ScrollView>

       {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
          onPress={() => router.push(`/farm/create?id=${farm.id}`)}
        >
          <Feather name="edit-2" size={18} color="#FFF" />
          <Text style={styles.actionButtonText}>Edit Farm</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#f44336' }]}
          onPress={() => handleDelete()}
        >
          <Feather name="trash" size={18} color="#FFF" />
          <Text style={styles.actionButtonText}>Delete Farm</Text>
        </TouchableOpacity>
      </View>

      <NavigationFooter />
    </View>
  );
};

export default FarmDetailScreen;