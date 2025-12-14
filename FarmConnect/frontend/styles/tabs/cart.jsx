import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  list: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#2c3e50',
  },
  price: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    fontSize: 24,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  summary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  checkoutButton: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
});