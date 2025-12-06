import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { getFarm, deleteFarm, getMyData, getProducts } from '../../scripts/api';

import NavigationHeader from '../../components/header';
import NavigationFooter from '../../components/footer';
import { DeleteButton } from '../../components/deleteButton';

import { styles } from '../../styles/nav/farmdetail';
import { Feather } from '@expo/vector-icons';
import { UpdateButton } from '@/components/updateButton';

const FarmDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [farm, setFarm] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchFarm = async () => {
      try {
        const data = await getFarm(id);
        setFarm(data);

        console.log('Received farm data:', data);

        const myData = await getMyData();
        setUser(myData);

        const productsData = await getProducts();
        console.log('Received products data:', productsData);
        
        if (productsData && Array.isArray(productsData)) {
          const filteredProducts = productsData.filter(product => 
            product.farms && product.farms.some(farm => farm.toString() === id)
          );
          console.log('Products for this farm:', filteredProducts);
          setProducts(filteredProducts);
        }
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
          onPress={() => router.back() || router.replace('/farm')}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationHeader />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back() || router.replace('/farm')}>
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
        
        {/* Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products</Text>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <View key={product.id} style={styles.productItem}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productCategory}>{product.category}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noProducts}>No products available</Text>
          )}
        </View>
      </ScrollView>

       {/* Action Buttons */}
      {user?.is_superuser && (
      <View style={styles.actionButtons}>
        <UpdateButton
          item={farm.name}
          onPress={() => router.push(`/farm/create?id=${farm.id}`)} />
        
        <DeleteButton 
          item={farm.name} 
          onPress={() => handleDelete()} />
      </View>
      )}

      <NavigationFooter />
    </View>
  );
};

export default FarmDetailScreen;