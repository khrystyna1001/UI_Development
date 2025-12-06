import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  formContainer: {
    padding: 16,
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#4a5568',
    marginLeft: 2,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#2d3748',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
    lineHeight: 22,
  },
  quantityContainer: {
    flexDirection: 'column',
    marginBottom: 16,
    gap: 16,
  },
  quantityWrapper: {
    flex: 1,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f7fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quantityInput: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    height: 20,
  },
  priceWrapper: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  currencySymbol: {
    fontSize: 16,
    color: '#4a5568',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 8,
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  submitButton: {
    backgroundColor: '#3182ce',
  },
  deleteButton: {
    backgroundColor: '#e53e3e',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#718096',
  },
  errorText: {
    color: '#e53e3e',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
  },
  categoryContainer: { 
    marginBottom: 20 
  },
  categoryList: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginTop: 5 
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  categoryChipText: { 
    fontSize: 14, 
    color: '#555' 
  },
  selectedChip: {
    backgroundColor: '#3F51B5',
    borderColor: '#3F51B5',
  },
  selectedChipText: {
    color: 'white',
    fontWeight: 'bold',
  },
  productsContainer: {
    marginBottom: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  farmItem: {
    width: '100%',
    marginBottom: 12,
  },
  farmCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  farmLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  selectedCounter: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
});