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

  farmCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 12,
  },

  farmImagePlaceholder: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
  },

  farmContent: {
    flex: 1,
  },

  farmName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },

  farmLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  locationIcon: {
    marginRight: 4,
  },

  locationText: {
    fontSize: 14,
    color: '#666',
  },

  farmDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
    lineHeight: 20,
  },

  farmMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F8F8F8',
  },

  farmDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  detailText: {
    fontSize: 12,
    color: '#777',
    marginLeft: 4,
  },

  noResultsText: {
    textAlign: 'center',
    padding: 20,
    color: '#777',
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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },

  // Modal styles
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