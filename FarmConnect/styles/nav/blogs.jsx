import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GREEN = '#4CAF50';
const LIGHT_GREY = '#F4F4F4';
const TEXT_GREY = '#555';

export const styles = StyleSheet.create({

  container: {
      flex: 1,
      backgroundColor: "#FFFFFF"
  },

  scrollView: {
    paddingHorizontal: 15,
  },

  scrollArea: {
      flex: 1
  },

  section: {
      paddingHorizontal: 16,
      marginBottom: 20
  },

  sectionSubtitle: {
      color: "#777",
      fontSize: 14,
      marginBottom: 8
  },

  textInput: {
      borderWidth: 1,
      borderColor: "#E0E0E0",
      borderRadius: 8,
      padding: 12,
      fontSize: 14,
      color: "#000",
      minHeight: 100,
      textAlignVertical: 'top',
      marginBottom: 8,
    },

  helperText: {
      fontSize: 12,
      color: "#999",
      marginBottom: 12
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 5,
  },

  blogItem: {
    backgroundColor: LIGHT_GREY,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },

  blogImagePlaceholder: {
    height: 150,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  blogTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_GREY,
  },

  blogContent: {
    padding: 15,
  },

  blogBody: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },

  blogFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
    marginTop: 5,
  },

  blogTags: {
    fontSize: 12,
    color: TEXT_GREY,
    width: '60%',
  },

  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  smallAvatarPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: GREEN,
    marginRight: 5,
  },

  blogAuthor: {
    fontSize: 12,
    color: TEXT_GREY,
  },

  primaryButton: {
      backgroundColor: "#000",
      borderRadius: 6,
      padding: 14,
      alignItems: "center",
      marginTop: 10,
    },

  primaryButtonText: {
      color: "#FFF",
      fontWeight: "600"
  },

  secondaryButton: {
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 6,
      padding: 12,
      alignItems: "center",
      marginTop: 8,
    },

  secondaryButtonText: {
      fontWeight: "600",
      color: "#000"
  },

});