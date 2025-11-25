import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PADDING_HORIZONTAL = 16;
const ITEM_MARGIN = 8;

export const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
    },

    scrollView: {
      flex: 1,
    },

    contentContainer: {
      paddingHorizontal: PADDING_HORIZONTAL,
      paddingBottom: 20,
    },

    sectionTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: '#333',
      marginVertical: 20,
    },

    galleryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },

    galleryItem: {
      backgroundColor: '#f1f1f1',
      borderRadius: 12,
      marginBottom: ITEM_MARGIN * 2,
      justifyContent: 'center',
      alignItems: 'center',
      shadowRadius: 4,
    },

    galleryLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#555',
      textAlign: 'center',
    },

    gallerySizeText: {
      fontSize: 12,
      color: '#999',
      marginTop: 4,
    },
});