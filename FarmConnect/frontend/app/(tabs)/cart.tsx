import React, { useState, useEffect } from "react";
import { SafeAreaView, 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    ScrollView
} from "react-native";

import { getCart, removeFromCart, checkout, getMyData } from "../../scripts/api";
import { router } from 'expo-router';

import { styles } from "../../styles/tabs/cart";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import NavigationFooter from '../../components/footer';
import NavigationHeader from '../../components/header';
import LoadingSpinner from '../../components/LoadingSpinner';


export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const response = await getMyData();
        setUser(response)
      } catch (error) {
        console.error("Error fetching my data", error)
      }
    }
    fetchMyData();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

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
      } else {
          setCart({ items: [], total: 0 }); 
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart({ items: [], total: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      await checkout();
      setCart({ items: [], total: 0 });
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const renderItem = (i) => { 
    if (!i || !i.product) return null;

    return (
    <View key={i.id.toString()} style={styles.card}>
      <View style={styles.itemDetails}>
        <TouchableOpacity onPress={() => router.push(`/products/${i.product?.id}`)}>
          <Text style={styles.name}>{i.product?.name || 'Product'}</Text>
          <Text style={styles.price}>${i.product?.price || 0} x {i.quantity}</Text>
          <Text style={styles.total}>${((i.product?.price || 0) * i.quantity).toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        onPress={() => handleRemoveItem(i.product?.id)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
    );
  };

  if (loading) {
    return <LoadingSpinner color="#2ecc71" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader />
      
      <ScrollView style={styles.mainContentArea}>
        <TouchableOpacity 
          onPress={() => router.back() || router.replace('/(tabs)/profile')} 
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#333" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <View style={styles.content}>
          <Text style={styles.header}>My Cart</Text>
          {cart?.items?.length > 0 ? (
            cart.items.map((item) => renderItem(item)) 
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="cart-outline" size={64} color="#bdc3c7" />
              <Text style={styles.emptyText}>Your cart is empty</Text>
            </View>
          )}
        </View>
      </ScrollView>
      
      {cart?.items?.length > 0 && (
        <View style={styles.summaryFixed}>
          <Text style={styles.totalSummary}>Total: ${cart.total?.toFixed(2) || '0.00'}</Text>
          <TouchableOpacity 
            style={[styles.checkoutButton, checkoutLoading && styles.disabledButton]}
            onPress={handleCheckout}
            disabled={checkoutLoading}
          >
            <Text style={styles.checkoutButtonText}>
              {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      
      <NavigationFooter />
    </SafeAreaView>
  );
}