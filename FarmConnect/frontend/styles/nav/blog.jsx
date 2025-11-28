import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },
  blogImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#b1b1b1ff',
    borderRadius: 8,
  },
  detailsContainer: {
    padding: 20,
  },
  blogTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  blogContent: {
    fontSize: 22,
    color: '#2ecc71',
    fontWeight: 'bold',
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: '600',
    width: 120,
    color: '#7f8c8d',
  },
  detailValue: {
    flex: 1,
    color: '#2c3e50',
  },
  actionButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 16,
    width: '100%',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageButton: {
    backgroundColor: '#1E88E5',
    marginTop: 8,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  actionButtonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  editButton: {
    backgroundColor: '#2196F3',
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
});