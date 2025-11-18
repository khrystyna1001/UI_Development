import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
      flex: 1,
      backgroundColor: "#FFFFFF"
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },

  horizontalScroll: {
    flexDirection: "row",
  },

  productCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    width: 140,
  },

  tag: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
    marginBottom: 6,
  },

  productName: {
    fontSize: 16,
    fontWeight: "500",
  },

  price: {
    marginTop: 4,
    fontSize: 14,
    color: "#555",
  },

  reviewContainer: {
    flexDirection: "row",
    marginTop: 8,
  },

  reviewCard: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },

  reviewer: {
    fontWeight: "600",
    marginBottom: 4,
  },

  reviewText: {
    color: "#555",
  },

  performanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  performanceBox: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginRight: 8,
  },

  performanceValue: {
    fontSize: 18,
    fontWeight: "700",
  },

  performanceLabel: {
    fontSize: 14,
    color: "#555",
  },

  performanceChange: {
    color: "#4CAF50",
    marginTop: 4,
    fontSize: 12,
  },

  updatesContainer: {
    flexDirection: "row",
    marginTop: 8,
  },

  updateCard: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },

  updateTitle: {
    fontWeight: "600",
  },

  updateSubtitle: {
    marginTop: 4,
    color: "#555",
  },

  updateAuthor: {
    marginTop: 6,
    fontSize: 12,
    color: "#999",
  },

  shareButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },

  shareButtonText: {
    fontWeight: "600",
  },

  viewButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    padding: 12,
    alignItems: "center",
    marginTop: 8,
  },

  viewButtonText: {
    fontWeight: "600",
  },

  contactButton: {
    backgroundColor: "#000",
    borderRadius: 6,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
  },

  contactButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});