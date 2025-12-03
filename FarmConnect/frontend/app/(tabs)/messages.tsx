import React, { useEffect, useState } from 'react';
import { 
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { formatDistanceToNow, parseISO } from 'date-fns';

import { getChats, getMyData } from '../../scripts/api';
import NavigationFooter from "../../components/footer";
import NavigationHeader from '../../components/header';
import { styles } from '../../styles/tabs/messages.jsx';

const ChatItem = ({ chat, currentUserId, otherUser, onPress }) => {
  const lastMessage = chat.messages?.[chat.messages.length - 1];
  const unreadCount = chat.messages?.filter(m => !m.read && m.sender !== currentUserId).length || 0;
  const hasUnread = unreadCount > 0;

  return (
    <TouchableOpacity 
      style={[
        styles.chatItemContainer,
        hasUnread && styles.chatItemUnread
      ]} 
      activeOpacity={0.7}
      onPress={() => onPress(chat.id, otherUser.id)}
    >
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, hasUnread && styles.avatarUnread]}>
          <Feather 
            name="user" 
            size={24} 
            color={hasUnread ? '#4CAF50' : '#666'} 
          />
        </View>
        {hasUnread && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>
              {unreadCount > 9 ? '9+' : unreadCount}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text 
            style={[
              styles.chatName,
              hasUnread && styles.chatNameUnread
            ]}
            numberOfLines={1}
          >
            {otherUser?.username}
          </Text>
          {lastMessage && (
            <Text 
              style={[
                styles.chatTime,
                hasUnread && styles.chatTimeUnread
              ]}
            >
              {formatDistanceToNow(parseISO(lastMessage.created_at), { 
                addSuffix: true 
              })}
            </Text>
          )}
        </View>
        
        {lastMessage && (
          <View style={styles.messagePreview}>
            <Text 
              style={[
                styles.chatSnippet,
                hasUnread && styles.chatSnippetUnread
              ]} 
              numberOfLines={1}
            >
              {lastMessage.sender === currentUserId && (
                <Text style={styles.youPrefix}>You: </Text>
              )}
              {lastMessage.content}
            </Text>
            {hasUnread && (
              <View style={styles.unreadDot} />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function Messages() {
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [userData, chatData] = await Promise.all([
        getMyData(),
        getChats(),
      ]);
      setCurrentUser(userData);
      setChats(chatData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredChats = chats.filter(chat => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const otherUser = chat.user1.id === currentUser?.id ? chat.user2 : chat.user1;

    return (
      otherUser?.first_name?.toLowerCase().includes(query) ||
      otherUser?.last_name?.toLowerCase().includes(query) ||
      otherUser?.username?.toLowerCase().includes(query) ||
      chat.messages?.some(msg => 
        msg.content.toLowerCase().includes(query)
      )
    );
  });

  const handleChatPress = (chatId) => {
    router.replace(`/chat/${chatId}/`);
  };

  const handleNewChat = () => {
    router.replace('/chat/create/');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <NavigationHeader />
        <View style={styles.loadingContainer}>
          <Text>Loading messages...</Text>
        </View>
        <NavigationFooter />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader />
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Feather 
              name="search" 
              size={20} 
              color="#999" 
              style={styles.searchIcon} 
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search chats..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <Text style={styles.sectionHeader}>Your Chats</Text>

        {filteredChats.length > 0 ? (
          filteredChats.map(chat => {
            const otherUser = chat.user1.id === currentUser?.id ? chat.user2 : chat.user1;
            return (
            <ChatItem
              key={chat.id}
              chat={chat}
              currentUserId={currentUser?.id}
              otherUser={otherUser}
              onPress={handleChatPress}
            />
          )})
        ) : (
          <View style={styles.emptyState}>
            <Feather name="message-square" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No chats yet</Text>
            <Text style={styles.emptySubtext}>Start a new conversation</Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity 
        style={styles.newChatButton}
        onPress={handleNewChat}
      >
        <Text style={styles.newChatButtonText}>New Chat</Text>
      </TouchableOpacity>

      <NavigationFooter />
    </SafeAreaView>
  );
}


