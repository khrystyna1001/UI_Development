import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator,
  Image,
  Alert
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { getGalleryImage, getMyData, updateGalleryImage, deleteGalleryImage } from '../../scripts/api';
import NavigationHeader from '../../components/header';
import NavigationFooter from "../../components/footer";
import { DeleteButton } from '../../components/deleteButton';
import { UpdateButton } from '../../components/updateButton';
import { styles } from '../../styles/nav/image';

const GalleryImageProfile = () => {
  const { id } = useLocalSearchParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
      const loadData = async () => {
        try {
          const image = await getGalleryImage(id);
          setImage(image);
          
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
        
    const deleteImage = async (id) => {
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
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error || !image) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error || 'Image not found'}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back() || router.replace('/(nav)/gallery')}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationHeader />
      
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back() || router.replace('/(nav)/gallery')}
        >
          <Text style={styles.backButtonText}>← Back to Gallery</Text>
        </TouchableOpacity>

      <View style={styles.contentContainer}>
        {/* Main image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: image.image }}
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel={image.title}
          />
        </View>

        {/* Image details */}
        <View style={styles.detailsContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>{image.title}</Text>
            <Text style={styles.description}>{image.image}</Text>
            
            <View style={styles.metaContainer}>
              <Text style={styles.metaText}>
                Uploaded on {new Date(image.created_at).toLocaleDateString()}
              </Text>
              <Text style={styles.metaText}>{new Date(image.updated_at).toLocaleDateString()}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.actionsContainer}>

        {image?.id && (
          <UpdateButton 
            item="image"
            onPress={() => router.replace(`/gallery/create?id=${image?.id}`)} 
          />
        )}
        <DeleteButton 
          item="image"
          onPress={() => deleteImage(image?.id)}
        />
        
      </View>
      </ScrollView>
      
      <NavigationFooter />
    </View>
  );
};

export default GalleryImageProfile;