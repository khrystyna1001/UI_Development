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
import { getProduct, getMyData, deleteProduct, getCart, addToCart, removeFromCart } from '../../scripts/api';

import NavigationHeader from '../../components/header';
import NavigationFooter from "../../components/footer";

import { UpdateButton } from '../../components/updateButton';
import { DeleteButton } from '../../components/deleteButton';
import ReviewSection from '../../components/reviewSection';

import { styles } from '../../styles/tabs/product';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({ items: [], total: 0 });


  useEffect(() => {
    fetchProduct();
    checkIfInCart();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await getProduct(id);
      setProduct(data);

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

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await getCart(); 
      
      const singleCart = (Array.isArray(response) && response.length > 0) 
                          ? response[0] 
                          : null;
                          
      if (singleCart) {
          const normalizedCart = {
              ...singleCart,
              total: parseFloat(singleCart.total_price) || 0,
          };
          setCart(normalizedCart);
          return normalizedCart;
      } else {
          setCart({ items: [], total: 0 }); 
          return { items: [], total: 0 };
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart({ items: [], total: 0 });
    } finally {
      setLoading(false);
    }
  };

  const checkIfInCart = async () => {
    try {
      const cart = await fetchCart();
      if (cart) {
        const cartItems = cart?.items || []; 
        const itemInCart = cartItems.some(item => item.product.id === parseInt(id));
        setIsInCart(itemInCart);
        console.log("Item in cart:", itemInCart);
        console.log("Cart items:", cartItems);
      }
    } catch (error) {
      console.error('Error checking cart:', error);
    }
  };

  const handleCartAction = async () => {
    try {
      const productId = parseInt(id);
      
      if (user?.id === product?.author) {
          Alert.alert('Error', 'You cannot purchase your own product.');
          return; 
      }

      if (isInCart) {
        await removeFromCart(productId);
        Alert.alert('Success', 'Item removed from cart.');
        
      } else {
        await addToCart(productId, quantity);
        Alert.alert('Success', `${quantity}x ${product.name} added to cart!`);
      }
      
      setIsInCart(prev => !prev);
      await checkIfInCart(); 
      
    } catch (error) {
        let errorMessage = error.message || 'Failed to update cart. Please try again.';
        
        if (errorMessage.includes("You cannot add your own product")) {
            errorMessage = "You cannot purchase your own product.";
        } else if (errorMessage.includes("Insufficient stock")) {
            errorMessage = "There is not enough stock for your requested quantity.";
        }
        
        console.error('Error updating cart:', error);
        Alert.alert('Error', errorMessage);
    }
  };

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
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>

      <TouchableOpacity onPress={() => router.back() || router.replace('/(tabs)/marketplace')} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#333" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        {product?.farms_info && product.farms_info.map((farm) => (
          <TouchableOpacity 
            key={farm.id} 
            style={styles.farmContainer}
            onPress={() => router.push(`/farm/${farm.id}`)}
          >
            <View style={styles.farmHeader}>
              <Icon name="store" size={20} color="#4CAF50" />
              <Text style={styles.farmName}>From {farm.name}</Text>
              <Icon name="chevron-right" size={20} color="#666" />
            </View>
            {farm.location && (
              <View style={styles.farmDetail}>
                <Icon name="location-on" size={16} color="#666" style={styles.farmIcon} />
                <Text style={styles.farmText}>{farm.location}</Text>
              </View>
            )}
            {farm.description && (
              <Text 
                style={styles.farmDescription} 
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {farm.description}
              </Text>
            )}
          </TouchableOpacity>
        ))}
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
            <Text style={styles.detailValue}>{product.author_info?.username}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{product.category || 'Unknown'}</Text>
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

          <ReviewSection 
            itemId={id} 
            itemType="product" 
            userId={user?.id || null} 
            itemAuthorId={product?.author || null} 
          />

          {/* Edit button - only for admin or for the author */}
          {(user?.is_superuser || product?.author === user?.id) && (
            <View style={styles.actionButtonsContainer}>
              <UpdateButton item={product.name} onPress={() => router.push(`/products/create?id=${product?.id}`)} />
              <DeleteButton item={product.name} onPress={() => deleteProductById(product?.id)} />
            </View>
          )}

          {user?.id !== product?.author && (
            <TouchableOpacity 
              style={[styles.cartButton, isInCart && styles.removeFromCartButton]}
              onPress={handleCartAction}
            >
              <Ionicons 
                name='cart'
                size={24} 
                color="white" 
                style={styles.cartIcon} 
              />
              <Text style={styles.cartButtonText}>
                {isInCart ? 'Remove from Cart' : 'Add to Cart'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
    
    <NavigationFooter />
    </View>
  );
}