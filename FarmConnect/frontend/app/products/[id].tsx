import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    Image,
    ScrollView, 
    ActivityIndicator, 
    TouchableOpacity,
    Alert
} from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { getProduct, getMyData, getUser, deleteProduct } from '../../scripts/api';

import NavigationHeader from '../../components/header';
import NavigationFooter from "../../components/footer";
import { styles } from '../../styles/tabs/product';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [author, setAuthor] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);

        if (data.author) {
          const author = await getUser(data.author);
          setAuthor(author);
        }

        const user = await getMyData();
        setUser(user);

      } catch (err) {
        setError('Failed to fetch product');
        console.error(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const deleteProductById = async (id) => {
      try {
        await deleteProduct(id);
        Alert.alert('Success', 'Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        Alert.alert('Error', 'Failed to delete product');
      }
      router.replace('/(tabs)/marketplace');
    };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Product not found'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationHeader />
      <ScrollView style={styles.container}>
        <Stack.Screen options={{ title: product.name }} />
        
        <View style={styles.imageContainer}>
          <Image 
          source={{ uri: product.image || 'https://via.placeholder.com/400x300' }} 
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#333" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Available:</Text>
            <Text style={styles.detailValue}>{product.quantity} lbs</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Seller:</Text>
            <Text style={styles.detailValue}>{author?.username}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Posted:</Text>
            <Text style={styles.detailValue}>
              {new Date(product.created_at).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last Updated:</Text>
            <Text style={styles.detailValue}>
              {new Date(product.updated_at || product.created_at).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.quantityRow}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setQuantity(prev => prev + 1)}
                disabled={quantity >= (product.quantity || 10)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.priceInfo}>${(product.price * quantity)?.toFixed(2) || '0.00'}</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.messageButton]} 
            onPress={() => console.log('Message clicked')}
          >
            <Text style={styles.actionButtonText}>Message Seller</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.editButton]} 
            onPress={() => router.replace(`/products/create?id=${product.id}`)}
          >
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]} 
            onPress={() => deleteProductById(product.id)}
          >
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    
    <NavigationFooter />
    </View>
  );
}