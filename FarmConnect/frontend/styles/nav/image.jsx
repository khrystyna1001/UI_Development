
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
    padding: 8,
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  imageContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
    lineHeight: 24,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  metaText: {
    color: '#777',
    fontSize: 14,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 8,
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
