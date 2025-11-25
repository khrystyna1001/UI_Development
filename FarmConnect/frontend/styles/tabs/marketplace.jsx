import { StyleSheet } from 'react-native';

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

    blogSummary: {
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
      color: '#4CAF50',
      fontWeight: '600',
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

});