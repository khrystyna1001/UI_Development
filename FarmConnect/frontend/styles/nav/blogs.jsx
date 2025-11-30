import { StyleSheet } from 'react-native';

const GREEN = '#25D366';

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
    marginTop: 10,
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

  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
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

  blogCard: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },

  blogImage: {
    width: '100%',
    height: 200,
  },

  blogContent: {
    padding: 16,
  },

  blogTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },

  blogExcerpt: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    lineHeight: 20,
  },

  blogMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F8F8F8',
  },

  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    marginRight: 8,
  },

  authorName: {
    fontSize: 12,
    color: '#666',
  },

  dateText: {
    fontSize: 12,
    color: '#888',
  },

  readTime: {
    fontSize: 12,
    color: GREEN,
    fontWeight: '500',
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
    color: '#000',
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
    backgroundColor: GREEN,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
  },

  applyButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },

  // Loading and error states
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
    marginBottom: 16,
    textAlign: 'center',
  },

  retryButton: {
    backgroundColor: GREEN,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },

  retryButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },

  // Empty state
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },

  emptyStateText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 16,
  },

  // Category tags
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