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

    productCard: {
      flexDirection: 'row',
      backgroundColor: '#FFF',
      padding: 10,
      borderWidth: 1,
      borderColor: '#F0F0F0',
      borderRadius: 8,
      marginBottom: 10,
    },

    productImagePlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 6,
      backgroundColor: '#E0E0E0',
      marginRight: 10,
    },

    productContent: {
      flex: 1,
      justifyContent: 'space-between',
    },

    productName: {
      fontSize: 15,
      fontWeight: '600',
      color: '#000',
    },

    productDescription: {
      fontSize: 12,
      color: '#555',
      marginTop: 4,
    },

    productMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      borderTopWidth: 1,
      borderTopColor: '#F8F8F8',
      paddingTop: 5,
    },

    productAuthor: {
      fontSize: 10,
      color: '#999',
    },

    productQuantity: {
      fontSize: 10,
      color: '#4CAF50',
      fontWeight: '600',
    },

    productPrice: {
      fontSize: 12,
      color: '#000',
      fontWeight: '700',
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

    createButton: {
      backgroundColor: '#4CAF50',
      borderRadius: 8,
      padding: 14,
      alignItems: 'center',
      margin: 16,
      marginBottom: 24,
    },

    createButtonText: {
      color: '#FFF',
      fontWeight: '600',
      fontSize: 16,
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    modalContent: {
      backgroundColor: '#FFF',
      padding: 20,
      borderRadius: 8,
      width: '80%',
      maxWidth: 400,
    },
  
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
    },
  
    sortOption: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
    },
  
    selectedSortOption: {
      backgroundColor: '#F0F0F0',
    },

    modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  closeButton: {
    padding: 4,
  },

  filterOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  filterOptionText: {
    fontSize: 16,
    color: '#333',
  },

  applyButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },

  applyButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },

});