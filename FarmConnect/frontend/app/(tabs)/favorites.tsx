import React, { useState, useEffect } from "react";
import { SafeAreaView, 
    View, 
    Text, 
    FlatList, 
    Image, 
    TouchableOpacity } from "react-native";
import { getFavoriteBlogs, removeFromFavorites } from "../../scripts/api";
import { styles } from "../../styles/tabs/favorites";

import NavigationFooter from '../../components/footer';
import NavigationHeader from '../../components/header';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { router } from 'expo-router';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await getFavoriteBlogs();
      setFavorites(response);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleRemoveFavorite = async (blogId) => {
    try {
      await removeFromFavorites(blogId);
      fetchFavorites(); // Refresh the list
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity 
        onPress={() => router.push(`/blog/${item.blog_post.id}`)}
        style={styles.cardContent}
      >
        <Image 
          source={{ uri: item.blog_post.image || 'https://via.placeholder.com/100' }} 
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.blog_post.title}</Text>
          <Text style={styles.author}>By {item.blog_post.author?.username}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => handleRemoveFavorite(item.id)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        <NavigationHeader />
        <TouchableOpacity onPress={() => router.back() || router.replace('/(tabs)/profile')} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#333" />
            <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      <Text style={styles.header}>My Favorites</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite blogs yet</Text>
        </View>
      )}
      <NavigationFooter />
    </SafeAreaView>
  );
}