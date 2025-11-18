import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#FFFFFF"
  },

  scrollContent: {
      paddingBottom: 20
  },

  scrollArea: {
      flex: 1
  },

  section: {
      paddingHorizontal: 16,
      marginBottom: 20
  },

  sectionHeader: {
      marginBottom: 10
  },

  sectionSubtitle: {
      color: "#777",
      fontSize: 14,
      marginBottom: 8
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },

  horizontalScroll: {
      flexDirection: "row",
      overflow: 'visible'
  },

  productCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    width: 140,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },

  productTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#4CAF501A',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 6,
  },

  productTagText: {
      fontSize: 12,
      color: "#4CAF50",
      fontWeight: "600"
  },

  productName: {
      fontSize: 16,
      fontWeight: "500",
      color: "#000"
  },

  productInfo: {
      marginTop: 8
  },

  productLabel: {
      fontSize: 14,
      color: "#555"
  },

  productQty: {
      fontSize: 12,
      color: "#999"
  },

  reviewCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    width: 250,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },

  reviewHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8
  },

  reviewAvatar: {
      width: 24,
      height: 24,
      backgroundColor: "#0000001A",
      borderRadius: 12,
      marginRight: 8
  },

  reviewName: {
      fontWeight: "600",
      color: "#000",
      marginRight: 'auto'
  },

  stars: {
      width: 60,
      height: 12
  },

  reviewText: {
      color: "#555",
      fontSize: 14
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

  tipRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0'
  },

  tipIcon: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#E8F5E9',
      borderRadius: 20,
      marginRight: 12
  },

  tipIconText: {
      fontSize: 20
  },

  tipText: {
      flex: 1
  },

  tipTitle: {
      fontWeight: '600',
      color: '#000',
      fontSize: 14
  },

  tipDesc: {
      color: '#777',
      fontSize: 12
  },
});