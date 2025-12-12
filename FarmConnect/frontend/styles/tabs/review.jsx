import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  // --- Loading/Error Styles ---
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 12,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#d9534f',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginLeft: 16,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    },

  // --- Main Layout Styles ---
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  container: {
      flex: 1,
      backgroundColor: "#f9f9f9" 
  },
  detailsContainer: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // --- Review Header Styles ---
  reviewHeader: {
    paddingVertical: 15,
    marginBottom: 10,
  },
  reviewTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  authorRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
    fontStyle: 'italic',
  },
  starRating: {
    fontSize: 20,
    color: '#FFC107',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  emptyStar: {
    color: '#ddd',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginTop: 5,
  },
  
  // --- Section Styles ---
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: '#444',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },

  // --- Date/Detail Styles ---
  dateSection: {
    marginTop: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '400',
  },
  // --- Modal ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    marginBottom: 20,
    color: '#555',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: { 
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: { 
    color: '#333',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
  deleteButtonText: {  
    color: '#fff',
    fontWeight: '500',
  },
});