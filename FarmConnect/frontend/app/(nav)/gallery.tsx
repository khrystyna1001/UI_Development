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
      <SafeAreaView style={styles.safeArea}>
        <NavigationHeader />
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>

          <View style={styles.galleryContainer}>
            {images.filter((image) => image.author === user?.id).map((image, index) => {
              if (index % 3 === 0) {
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
              
              if (index % 3 === 1) {
                const nextImage = images[index + 1];
                return (
                  <View key={image.id} style={styles.smallImagesContainer}>
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
                        <GalleryItem 
                          label={nextImage.title} 
                          size="small" 
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                      );
                    }

                    return null;
                  })}

                </View>
                <View>
              <TouchableOpacity style={styles.addImageContainer} onPress={() => router.navigate('/gallery/create')}>
                <Text style={styles.addImageText}>Add Image</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        <NavigationFooter />
      </SafeAreaView>
  )
};
