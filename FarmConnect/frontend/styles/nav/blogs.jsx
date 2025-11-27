import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GREEN = '#4CAF50';
const LIGHT_GREY = '#F4F4F4';
const TEXT_GREY = '#555';

export const styles = StyleSheet.create({

  safeArea: {
      flex: 1,
      backgroundColor: "#FFFFFF"
  },

  scrollContent: {
      paddingBottom: 60
  },

  scrollViewContent: {
      flex: 1
  },

  section: {
      paddingHorizontal: 16,
      marginBottom: 20
  },

  sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#000",
      marginBottom: 10,
  },

  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginRight: 8,
    backgroundColor: '#FAFAFA',
  },

  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },

  filterText: {
    color: '#FFF',
    fontWeight: '600',
  },

  authorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },

  authorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0000001A',
    marginRight: 15,
  },

  authorInfo: {
    flex: 1,
  },

  authorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },

  authorBio: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },

  followButton: {
    backgroundColor: '#000',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  followButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },

  blogCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 10,
  },

  blogImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 6,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
  },

  blogContent: {
    flex: 1,
    justifyContent: 'space-between',
  },

  blogTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },

  blogDescription: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },

  blogMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F8F8F8',
    paddingTop: 5,
  },

  blogAuthor: {
    fontSize: 10,
    color: '#999',
  },

  blogReads: {
    fontSize: 10,
    color: '#219e4dff',
  },

  noResultsText: {
    textAlign: 'center',
    padding: 20,
    color: '#777',
  },

  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  tagPill: {
    backgroundColor: '#F0F4F0',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },

  tagPillText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500',
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