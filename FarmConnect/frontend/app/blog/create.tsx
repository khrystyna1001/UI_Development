import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  ActivityIndicator,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { getBlogPost, createBlogPost, updateBlogPost, deleteBlogPost, getMyData } from '../../scripts/api';
import NavigationHeader from '../../components/header';
import NavigationFooter from "../../components/footer";
import { styles } from '../../styles/nav/blogcreate.jsx';

const BlogEditor = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(!!id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [isEditMode, setIsEditMode] = useState(!!id);

  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await getMyData();
        setIsSuperuser(userData.is_superuser);
        
        if (!userData.is_superuser) {
          Alert.alert('Access Denied', 'Only administrators can manage blog posts.');
          router.back();
          return;
        }

        if (id) {
          const post = await getBlogPost(id);
          setFormData({
            title: post.title,
            content: post.content,
            author: userData.id,
          });
        }
      } catch (error) {
        console.error('Error loading data:', error);
        Alert.alert('Error', 'Failed to load data');
        router.back();
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
     try {
        const userData = await getMyData();
        
        const postData = {
            title: formData.title,
            content: formData.content,
            author: userData.id,
        };

        if (isEditMode && id) {
            await updateBlogPost(id, postData);
            Alert.alert('Success', 'Blog post updated successfully');
        } else {
            await createBlogPost(postData);
            Alert.alert('Success', 'Blog post created successfully');
        }
        
        router.replace('/(nav)/blogs');
    } catch (error) {
        console.error('Error saving blog post:', error);
        Alert.alert('Error', 'Failed to save blog post');
    } finally {
        setIsSubmitting(false);
    }
  };

  const deleteBlog = async () => {
    if (!id) return;
    try {
        await deleteBlogPost(id);
        Alert.alert('Success', 'Blog post deleted successfully');
    } catch (error) {
        console.error('Error deleting blog post:', error);
        Alert.alert('Error', 'Failed to delete blog post');
    }
    router.replace('/(nav)/blogs');
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationHeader />
      <ScrollView style={styles.formContainer}>
        <Stack.Screen options={{ title: id ? 'Edit Blog Post' : 'Create Blog Post' }} />
        
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(text) => handleChange('title', text)}
          placeholder="Enter blog post title"
        />

        <Text style={styles.label}>Content *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.content}
          onChangeText={(text) => handleChange('content', text)}
          placeholder="Write your blog post content here..."
          multiline
          numberOfLines={10}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Saving...' : id ? 'Update Post' : 'Create Post'}
            </Text>
          </TouchableOpacity>

          {id && (
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={deleteBlog}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>Delete Post</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <NavigationFooter />
    </View>
  );
};

export default BlogEditor;