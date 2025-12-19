import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getNotifications, markNotificationAsRead } from '../../scripts/api';
import NavigationFooter from '../../components/footer';
import NavigationHeader from '../../components/header';
import { styles } from '../../styles/nav/notifications';

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

export default NotificationPage;