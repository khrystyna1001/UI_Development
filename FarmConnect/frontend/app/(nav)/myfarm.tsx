import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import NavigationFooter from '../../components/footer';
import NavigationHeader from '../../components/header';

import { styles } from '../../styles/nav/farm.jsx';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PADDING_HORIZONTAL = 20;

export default function MyFarm () {
    return (
        <SafeAreaView style={styles.safeArea}>
            <NavigationHeader />
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>

              <View style={styles.mapContainer}>
                <Image
                    source={{ uri: `https://placehold.co/${SCREEN_WIDTH - (PADDING_HORIZONTAL * 2)}x300/e0e0e0/333333?text=European+Map+Placeholder` }}
                    style={styles.mapImage}
                    resizeMode="cover"
                />
                <Text style={styles.locationOverlay}>User Location</Text>
              </View>

              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={[styles.actionButtonText, {color: "#fff"}]}>Add a farm</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <NavigationFooter />
        </SafeAreaView>
    )
};