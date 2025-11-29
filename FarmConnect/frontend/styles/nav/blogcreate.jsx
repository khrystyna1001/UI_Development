import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    formContainer: {
        padding: 20,
        flex: 1,
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
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#2c3e50',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        fontSize: 16,
        color: '#2c3e50',
    },
    textArea: {
        minHeight: 150,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        marginTop: 20,
        gap: 12,
    },
    button: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButton: {
        backgroundColor: '#2ecc71',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#7f8c8d',
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#2c3e50',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 8,
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
});