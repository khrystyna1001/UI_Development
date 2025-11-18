import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Header,
  Dimensions
} from 'react-native';

import NavigationFooter from '../../components/footer';
import NavigationHeader from '../../components/header';

import { styles } from '../../styles/nav/gallery.jsx';

const GalleryItem = ({ label, size }) => {
    const isLarge = size === 'large';

    const SCREEN_WIDTH = Dimensions.get('window').width;
    const PADDING_HORIZONTAL = 16;
    const ITEM_MARGIN = 8;

    // Calculate dimensions based on size, ensuring space for margin/padding
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


export default function GalleryScreen ({ setScreen }){
    return (
      <SafeAreaView style={styles.safeArea}>
        <NavigationHeader />
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>

          <View style={styles.galleryContainer}>

            {/* Row 1: Picture 1 (large) */}
            <GalleryItem label="Picture 1" size="large" />

            {/* Row 2: Picture 2 (small), Picture 3 (small) - flow handles side-by-side */}
            <GalleryItem label="Picture 2" size="small" />
            <GalleryItem label="Picture 3" size="small" />

            {/* Row 3: Picture 4 (large) */}
            <GalleryItem label="Picture 4" size="large" />

            {/* Row 4: Picture 5 (small), Picture 6 (small) */}
            <GalleryItem label="Picture 5" size="small" />
            <GalleryItem label="Picture 6" size="small" />

          </View>
          <View style={{ height: 30 }} />
        </ScrollView>
        <NavigationFooter />
      </SafeAreaView>
  )
};
