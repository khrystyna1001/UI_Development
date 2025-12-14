import React, {useState, useEffect} from "react";
import { SafeAreaView,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    } from "react-native";

import { getProducts, getReviews, getBlogPosts, getMyData } from "../../scripts/api";

import NavigationFooter from "../../components/footer";
import NavigationHeader from '../../components/header';

import { router } from 'expo-router';

import { styles } from '../../styles/tabs/profile.jsx';
import { Ionicons } from '@expo/vector-icons';


export default function Profile () {
  const [blogPosts, setBlogPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({})

  const fetchUserData = async () => {
    try {
      const response = await getMyData();
      setUser(response);
    } catch (e) {
      console.error(`Failed to fetch user data: ${e}`);
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (e) {
      console.error(`Failed to fetch products: ${e}`);
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await getReviews();
      setReviews(response);
    } catch (e) {
      console.error(`Failed to fetch reviews: ${e}`);
    }
  }

  const fetchBlogPosts = async () => {
    try {
      const response = await getBlogPosts();
      setBlogPosts(response);
    } catch (e) {
      console.error(`Failed to fetch blogs: ${e}`);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchReviews();
    fetchBlogPosts();
    fetchUserData();
  }, []);

  const navigateToFavorites = () => {
    router.push('/(tabs)/favorites');
  };
  const navigateToCart = () => {
    router.push('/(tabs)/cart');
  };
	
	return (
		<SafeAreaView style={styles.container}>
      {/* Header */}
      <NavigationHeader />

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            margin: 20
          }}>
          <View style={styles.profileHeader}>
            <Text style={styles.userName}>{user.username || 'User'}</Text>
            <Text style={styles.userEmail}>{user.email || ''}</Text>
          </View>
          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={navigateToFavorites}
            >
              <Ionicons name="heart" size={24} color="#e74c3c" />
              <Text style={styles.actionText}>Favorites</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={navigateToCart}
            >
              <Ionicons name="cart" size={24} color="#2ecc71" />
              <Text style={styles.actionText}>My Cart</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>Available Products</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {Array.isArray(products) && products.slice(0, 4).map((item, index) => (
              <TouchableOpacity onPress={() => router.navigate(`products/${item.id}/`)}>
                <View key={index} style={styles.productCard}>
                  <Text style={styles.tag}>{item.category}</Text>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.price}>{item.price}$/lbs</Text>
                  <Text style={styles.quantity}>Available: {item.quantity} lbs</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Reviews Section */}
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.sectionTitle}>Customer Reviews</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={{ paddingVertical: 8 }}
            >
              {Array.isArray(reviews) && reviews.slice(0, 3).map((review, index) => (
                <TouchableOpacity onPress={() => router.navigate(`reviews/${review.id}/`)}>
                  <View key={index} style={styles.reviewCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                      <Text style={styles.reviewer}>{review.author_info?.username}</Text>
                      <Text style={styles.starRating}>
                        {'★'.repeat(Math.min(5, Math.max(1, Math.round(Number(review.rating) || 0))))}
                        {'☆'.repeat(5 - Math.min(5, Math.max(0, Math.round(Number(review.rating) || 0))))}
                      </Text>
                    </View>
                    <Text style={styles.reviewText}>{review.content}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            </View>

            {/* Recent Updates Section */}
            <View style={{ marginBottom: 24 }}>
              <Text style={styles.sectionTitle}>Recent Updates</Text>
              {Array.isArray(blogPosts) && blogPosts.slice(0, 2).map((post, index) => (
                <TouchableOpacity onPress={() => router.navigate(`blog/${post.id}/`)}>
                  <View key={index} style={styles.updateCard}>
                    <Text style={styles.updateTitle}>{post.title}</Text>
                    <Text style={styles.updateSubtitle}>
                      {post.content.length > 100 
                        ? `${post.content.substring(0, 100)}...` 
                        : post.content}
                    </Text>
                    <Text style={styles.updateAuthor}>Posted by {post.author_info?.username} • {new Date(post.created_at).toLocaleDateString()}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

        {/* Farm Performance */}
        <Text style={styles.sectionTitle}>Farm Performance</Text>
        <View style={styles.performanceContainer}>
          <View style={styles.performanceBox}>
            <Text style={styles.performanceValue}>500 lbs</Text>
            <Text style={styles.performanceLabel}>Crops Yielded</Text>
            <Text style={styles.performanceChange}>+10%</Text>
          </View>
          <View style={styles.performanceBox}>
            <Text style={styles.performanceValue}>$2000</Text>
            <Text style={styles.performanceLabel}>Total Sales</Text>
            <Text style={styles.performanceChange}>+5%</Text>
          </View>
          <View style={styles.performanceBox}>
            <Text style={styles.performanceValue}>150</Text>
            <Text style={styles.performanceLabel}>Customers</Text>
            <Text style={styles.performanceChange}>+20%</Text>
          </View>
        </View>
      </ScrollView>
    <NavigationFooter />
		</SafeAreaView>
	);
};
