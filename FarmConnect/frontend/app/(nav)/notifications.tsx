import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getNotifications, markNotificationAsRead } from '../../api';
import NavigationFooter from '../../components/footer';
import NavigationHeader from '../../components/header';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getNotifications();
                setNotifications(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const toggleRead = async (id, isRead) => {
        if (!isRead) {
            await markNotificationAsRead(id);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => toggleRead(item.id, item.is_read)}
            style={[
                styles.itemContainer, 
                item.is_read ? styles.readItem : styles.unreadItem
            ]}
        >
            <View style={styles.content}>
                <View style={styles.topRow}>
                    <Text style={styles.timestamp}>
                        {new Date(item.created_at).toLocaleDateString()}
                    </Text>
                    {!item.is_read && <Text style={styles.newTag}>NEW</Text>}
                </View>
                <Text style={[styles.message, item.is_read && styles.readText]}>
                    {item.content}
                </Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) return <ActivityIndicator style={{flex:1}} color="#000" />;

    return (
        <View style={styles.wrapper}>
            <NavigationHeader />
            <Text style={styles.heading}>ACTIVITY</Text>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.empty}>NO NEW UPDATES</Text>}
            />
            <NavigationFooter />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#FFF', paddingHorizontal: 20 },
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
        borderWidth: 1,
        borderColor: '#000', // Brutalist border
    },
    unreadItem: {
        backgroundColor: '#FFF',
        borderLeftWidth: 8, // Thick indicator for unread
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
    timestamp: { fontSize: 10, color: '#AAA', fontWeight: '600' },
    newTag: { fontSize: 10, fontWeight: '900', color: '#000' },
    message: { 
        fontSize: 15, 
        color: '#000', 
        lineHeight: 22, 
        fontWeight: '500' 
    },
    readText: { color: '#888' },
    empty: { 
        textAlign: 'center', 
        marginTop: 100, 
        fontSize: 12, 
        letterSpacing: 2, 
        color: '#CCC' 
    }
});

export default NotificationPage;