import React, { useState, useEffect } from "react";
import { SafeAreaView, 
    View, 
    Text, 
    FlatList, 
    Image, 
    TouchableOpacity, 
    ActivityIndicator 
} from "react-native";

import { getCart, removeFromCart, checkout } from "../../scripts/api";
import { router } from 'expo-router';

import { styles } from "../../styles/tabs/cart";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import NavigationFooter from '../../components/footer';
import NavigationHeader from '../../components/header';


export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  useEffect(() => {
    fetchCart();
  }, []);
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await getCart();
      setCart(response || { items: [], total: 0 });
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart({ items: [], total: 0 });
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
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
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.product?.image || 'https://via.placeholder.com/80' }} 
        style={styles.image}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.name}>{item.product?.name || 'Product'}</Text>
        <Text style={styles.price}>${item.product?.price || 0} x {item.quantity}</Text>
        <Text style={styles.total}>${((item.product?.price || 0) * item.quantity).toFixed(2)}</Text>
      </View>
      <TouchableOpacity 
        onPress={() => handleRemoveItem(item.id)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#2ecc71" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
        <NavigationHeader />
        <TouchableOpacity onPress={() => router.back() || router.replace('/(tabs)/profile')} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#333" />
            <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      <Text style={styles.header}>My Cart</Text>
      {cart?.items?.length > 0 ? (
        <>
          <FlatList
            data={cart.items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
          />
          <View style={styles.summary}>
            <Text style={styles.total}>Total: ${cart.total?.toFixed(2) || '0.00'}</Text>
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
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={64} color="#bdc3c7" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      )}
      <NavigationFooter />
    </SafeAreaView>
  );
}