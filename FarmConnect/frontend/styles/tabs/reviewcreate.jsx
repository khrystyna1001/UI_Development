import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    ratingContainer: {
        marginBottom: 20,
    },
    ratingLabel: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '500',
    },
    starsContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
    },
    commentContainer: {
        marginBottom: 20,
    },
    commentLabel: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        minHeight: 120,
        textAlignVertical: 'top',
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
        submitButton: {
        backgroundColor: '#4CAF50',
    },
        disabledButton: {
        opacity: 0.6,
    },
        buttonText: {
        fontSize: 16,
        fontWeight: '500',
    },
        submitButtonText: {
        color: '#fff',
    },
});