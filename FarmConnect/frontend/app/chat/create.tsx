import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getUsers, createChat, getMyData } from '../../scripts/api';
import { styles } from '../../styles/tabs/chatcreate';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function CreateChat() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatingChat, setCreatingChat] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getMyData();
        setUser(userData);
        setLoading(true);
        const usersData = await getUsers();
        const filteredUsers = usersData.filter(u => u.id !== userData.id);
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      user.first_name?.toLowerCase().includes(query) ||
      user.last_name?.toLowerCase().includes(query) ||
      user.username?.toLowerCase().includes(query)
    );
  });

  const handleCreateChat = async (otherUser) => {
    try {
      setCreatingChat(true);
      const newChat = await createChat({ user2: otherUser.id });
      router.replace(`/chat/${newChat.id}`);
    } catch (error) {
      console.error('Error creating chat:', error);
    } finally {
      setCreatingChat(false);
    }
  };

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back() || router.replace('/messages')}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Chat</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
        filteredUsers.map((item) => {
            return (
                <TouchableOpacity
                    key={item.id}
                    style={styles.userItem}
                    onPress={() => handleCreateChat(item)}
                    disabled={creatingChat}
                >
                    <View style={styles.avatar}>
                    <Feather name="user" size={24} color="#666" />
                    </View>
                    <Text style={styles.userName}>
                        {item.first_name} {item.last_name}
                        {item.username && <Text style={styles.username}> @{item.username}</Text>}
                    </Text>
                    {creatingChat && <ActivityIndicator size="small" color="#4CAF50" />}
                </TouchableOpacity>
            )
        })
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No users found</Text>
        </View>
      )}
    </SafeAreaView>
  );
}