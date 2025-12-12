import { useEffect, useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import NavigationFooter from '../../components/footer';
import NavigationHeader from '../../components/header';
import { CreateButton } from '../../components/createButton';

import { getGalleryImages, getMyData } from '../../scripts/api';

import { styles } from '../../styles/nav/gallery.jsx';
import { router } from 'expo-router';

const GalleryItem = ({ label, size }) => {
    const isLarge = size === 'large';

    const SCREEN_WIDTH = Dimensions.get('window').width;
    const PADDING_HORIZONTAL = 16;
    const ITEM_MARGIN = 8;

    const dimensions = isLarge
      ? {
          width: SCREEN_WIDTH - (PADDING_HORIZONTAL * 2),
          height: 250
        }
      : {
          width: (SCREEN_WIDTH - (PADDING_HORIZONTAL * 2) - ITEM_MARGIN) / 2,
          height: 180,
        };

    return (
        <View style={[styles.galleryItem, dimensions, isLarge ? styles.largeItemMargin : styles.smallItemMargin]}>
          <Text style={styles.galleryLabel}>{label}</Text>
          <Text style={styles.gallerySizeText}>({size})</Text>
        </View>
    );
};


export default function GalleryScreen (){
    const [images, setImages] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await getGalleryImages();
            const userData = await getMyData();
            setUser(userData);
            setImages(response);
        };
        fetchImages();
    }, []);
    
    return (
      <View style={styles.container}>
        <NavigationHeader />
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.galleryContainer}>
        {images
          .filter((image) => image.author === user?.id)
          .map((image, index, filteredImages) => {
            if (index === 0) {
              return (
                <TouchableOpacity 
                  key={image.id} 
                  onPress={() => router.navigate(`/gallery/${image.id}`)}
                  style={styles.largeImageContainer}
                >
                  <GalleryItem label={image.title} size="large" />
                </TouchableOpacity>
              );
            }
            
            if (index === 1 || index === 2) {
              if (index === 1) {
                const nextImage = filteredImages[2] || null;
                return (
                  <View key={`pair-${image.id}`} style={styles.smallImagesContainer}>
                    <TouchableOpacity 
                      onPress={() => router.navigate(`/gallery/${image.id}`)}
                      style={styles.smallImageContainer}
                    >
                      <GalleryItem label={image.title} size="small" />
                    </TouchableOpacity>
                    
                    {nextImage && (
                      <TouchableOpacity 
                        onPress={() => router.navigate(`/gallery/${nextImage.id}`)}
                        style={styles.smallImageContainer}
                      >
                        <GalleryItem label={nextImage.title} size="small" />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }
              return null;
            }
            if ((index - 3) % 4 === 0) {
              return (
                <TouchableOpacity 
                  key={image.id} 
                  onPress={() => router.navigate(`/gallery/${image.id}`)}
                  style={styles.largeImageContainer}
                >
                  <GalleryItem label={image.title} size="large" />
                </TouchableOpacity>
              );
            }
            if ((index - 3) % 4 === 1 || (index - 3) % 4 === 2) {
              const nextImage = filteredImages[index + 1] || null;
              return (
                <View key={`pair-${image.id}`} style={styles.smallImagesContainer}>
                  <TouchableOpacity 
                    onPress={() => router.navigate(`/gallery/${image.id}`)}
                    style={styles.smallImageContainer}
                  >
                    <GalleryItem label={image.title} size="small" />
                  </TouchableOpacity>
                  
                  {nextImage && (
                    <TouchableOpacity 
                      onPress={() => router.navigate(`/gallery/${nextImage.id}`)}
                      style={styles.smallImageContainer}
                    >
                      <GalleryItem label={nextImage.title} size="small" />
                    </TouchableOpacity>
                  )}
                </View>
              );
            }
            return null;
          })}
      </View>
      </ScrollView>
      <View>
        <CreateButton item="image" onPress={() => router.navigate('/gallery/create')} />
      </View>
    <NavigationFooter />
    </View>
  )
};
