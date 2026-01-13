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
import { getBlogPost, getMyData, deleteBlogPost, getFavorites, toggleFavorite } from '../../scripts/api';

import NavigationHeader from '../../components/header';
import NavigationFooter from "../../components/footer";
import LoadingSpinner from '../../components/LoadingSpinner';
import { UpdateButton } from "../../components/updateButton";
import { DeleteButton } from "../../components/deleteButton";
import ReviewSection from '../../components/reviewSection';

import { styles } from '../../styles/nav/blog.jsx';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function BlogDetail() {
  const { id } = useLocalSearchParams();
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
    checkIfFavorite();
  }, [id]);

  const loadData = async () => {
    try {
        const blogData = await getBlogPost(id);
        setBlog(blogData);
        
        const userData = await getMyData();
        setUser(userData);

        console.log(blogData);
    } catch (err) {
        setError('Failed to load data');
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    try {
      const favorites = await getFavorites();
      const isFav = favorites.some(fav => fav.blog_post.id === parseInt(id));
      setIsFavorite(isFav);
      return isFav;
    } catch (error) {
      console.error("Error checking for favorites: ", error)
    }
  }

  const handleFavoriteAction = async () => {
    try {
      if (isFavorite) {
        const isFav = await checkIfFavorite();
        if (isFav) {
          await toggleFavorite(isFav);
          Alert.alert('Success', 'Removed from favorites');
        }
      } else {
        await toggleFavorite(id);
        Alert.alert('Success', 'Added to favorites');
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorites:', error);
      Alert.alert('Error', 'Failed to update favorites. Please try again.');
    }
  };

  const deleteBlog = async (id) => {
    try {
      await deleteBlogPost(id);
      Alert.alert('Success', 'Blog post deleted successfully');
    } catch (error) {
      console.error('Error deleting blog post:', error);
      Alert.alert('Error', 'Failed to delete blog post');
    }
    router.replace('/(nav)/blogs');
  };

  if (loading) {
    return (
        <LoadingSpinner />
    );
  }

  if (error || !blog) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Blog post not found'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationHeader />
      <ScrollView style={styles.container}>
        <Stack.Screen options={{ title: blog.title }} />
        
        <View style={styles.imageContainer}>
          <Image 
          source={{ uri: blog.image || 'https://via.placeholder.com/400x300' }} 
          style={styles.blogImage}
          resizeMode="cover"
        />
      </View>

      <TouchableOpacity onPress={() => router.back() || router.replace('/blogs')} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#333" />
            <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={styles.blogTitle}>{blog.title}</Text>
        <Text style={styles.blogContent}>{blog.content}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content</Text>
          <Text style={styles.description}>{blog.content}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Author:</Text>
            <Text style={styles.detailValue}>{blog.author_info?.username || 'Unknown'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{blog.category || 'Unknown'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Posted:</Text>
            <Text style={styles.detailValue}>
              {new Date(blog.created_at).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last Updated:</Text>
            <Text style={styles.detailValue}>
              {new Date(blog.updated_at || blog.created_at).toLocaleDateString()}
            </Text>
          </View>
          {/* Review Section */}
          <ReviewSection 
            itemId={id} 
            itemType="blog" 
            userId={user?.id || null}
            itemAuthorId={blog?.author || null}
          />

          {/* Edit button - only for the author */}
          {(blog.author === user?.id || user?.is_superuser) && (
            <View style={styles.actionButtonsContainer}>
              <UpdateButton onPress={() => router.replace(`/blog/create?id=${blog.id}`)} />
              <DeleteButton onPress={() => deleteBlog(blog.id)} />
            </View>
          )}

          {/* Message and favorite button - only for non-authors */}
          {(blog.author !== user?.id || user?.is_superuser) && (
            <React.Fragment>
              <TouchableOpacity 
                style={[styles.actionButton, styles.messageButton]} 
                onPress={() => router.replace('/(tabs)/messages')}
              >
                <Text style={styles.actionButtonText}>Message Author</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleFavoriteAction}
              >
                <Text style={styles.actionButtonText}>{isFavorite ? 'Remove From Favorites': 'Add to Favorites'}</Text>
              </TouchableOpacity>
            </React.Fragment>
          )}
        </View>
      </View>
    </ScrollView>
    
    <NavigationFooter />
    </View>
  );
}