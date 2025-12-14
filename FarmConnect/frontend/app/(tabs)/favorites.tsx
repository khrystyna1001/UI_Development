import React, { useState, useEffect } from "react";
import { SafeAreaView, 
    View, 
    Text, 
    FlatList, 
    Image, 
    TouchableOpacity } from "react-native";
import { getFavorites, toggleFavorite } from "../../scripts/api";
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
      const response = await getFavorites();
      setFavorites(response);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      const favorite = favorites.find(fav => fav.id === favoriteId);
      if (favorite) {
        await toggleFavorite(favorite.blog_post.id);
        fetchFavorites(); 
      }
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
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.blog_post.title}</Text>
          <Text style={styles.author}>By {item.blog_post.author_info?.username}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => handleRemoveFavorite(item.id)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>Remove from favorites</Text>
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