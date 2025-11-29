import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  ActivityIndicator
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { getGalleryImage, createGalleryImage, updateGalleryImage, deleteGalleryImage, getMyData } from '../../scripts/api';
import NavigationHeader from '../../components/header';
import NavigationFooter from "../../components/footer";
import { styles } from '../../styles/nav/gallerycreate';
import Icon from 'react-native-vector-icons/MaterialIcons';


const GalleryEditor = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(!!id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(!!id);

  const [formData, setFormData] = useState({
    title: '',
  });

  useEffect(() => {
    const loadData = async () => {
      try {

        if (id) {
          const imageData = await getGalleryImage(id);
          setFormData({
            title: imageData.title,
          });
        }
      } catch (error) {
        console.error('Error loading data:', error);
        Alert.alert('Error', 'Failed to load image data');
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
    if (!formData.title.trim()) {
      Alert.alert('Validation Error', 'Please fill in all required fields and select an image');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const galleryItem = {
        title: formData.title,
      };

      if (isEditMode && id) {
        const response = await updateGalleryImage(id, galleryItem);
        console.log(response);
        Alert.alert('Success', 'Image updated successfully');
      } else {
        const response = await createGalleryImage(galleryItem);
        console.log(response);
        Alert.alert('Success', 'Image added to gallery successfully');
      }
      router.replace('/(nav)/gallery');
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Error', 'Failed to save image');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteImage = async () => {
    if (!id) return;
    try {
      await deleteGalleryImage(id);
      Alert.alert('Success', 'Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      Alert.alert('Error', 'Failed to delete image');
    }
    router.replace('/(nav)/gallery');
  };

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
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back to Gallery</Text>
        </TouchableOpacity>
        
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(text) => handleChange('title', text)}
          placeholder="Enter image title"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Saving...' : id ? 'Update Image' : 'Add to Gallery'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={deleteImage}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>Delete Image</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
      <NavigationFooter />
    </View>
  );
};

export default GalleryEditor;