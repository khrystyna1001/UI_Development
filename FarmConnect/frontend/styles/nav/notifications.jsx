import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    wrapper: { 
        flex: 1, 
        backgroundColor: '#FFF', 
        paddingHorizontal: 20 
    },
    heading: { 
        fontSize: 12, 
        fontWeight: '900', 
        letterSpacing: 4, 
        marginTop: 40, 
        marginBottom: 20, 
        color: '#000' 
    },
    itemContainer: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginBottom: 10,
        borderColor: '#4CAF50',
    },
    unreadItem: {
        backgroundColor: '#FFF',
        borderLeftWidth: 8,
    },
    readItem: {
        backgroundColor: '#F9F9F9',
        borderColor: '#E0E0E0',
        borderLeftWidth: 1,
    },
    topRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 8 
    },
    timestamp: { 
        fontSize: 10, 
        color: '#AAA', 
        fontWeight: '600' 
    },
    newTag: { 
        fontSize: 10, 
        fontWeight: '900', 
        color: '#4CAF50' 
    },
    message: { 
        fontSize: 15, 
        color: '#000', 
        lineHeight: 22, 
        fontWeight: '500' 
    },
    readText: { 
        color: '#888' 
    },
    empty: { 
        textAlign: 'center', 
        marginTop: 100, 
        fontSize: 12, 
        letterSpacing: 2, 
        color: '#CCC' 
    }
});