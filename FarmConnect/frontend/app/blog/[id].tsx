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
import { getBlogPost, getMyData, deleteBlogPost } from '../../scripts/api';

import NavigationHeader from '../../components/header';
import NavigationFooter from "../../components/footer";
import { styles } from '../../styles/nav/blog.jsx';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function BlogDetail() {
  const { id } = useLocalSearchParams();
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
          const blogData = await getBlogPost(id);
          setBlog(blogData);
          
          const userData = await getMyData();
          setUser(userData);
      } catch (err) {
          setError('Failed to load data');
          console.error(err);
      } finally {
          setLoading(false);
      }
    };

    loadData();
  }, [id]);

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading blog post...</Text>
      </View>
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
          
          {/* Edit button - only for the author */}
          {blog.author === user?.id && (
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.editButton]}
                onPress={() => router.replace(`/blog/create?id=${blog.id}`)}
              >
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => deleteBlog(blog.id)}
              >
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Message button - only for non-authors */}
          {blog.author !== user?.id && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.messageButton]} 
              onPress={() => router.replace('/(tabs)/messages')}
            >
              <Text style={styles.actionButtonText}>Message Author</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
    
    <NavigationFooter />
    </View>
  );
}