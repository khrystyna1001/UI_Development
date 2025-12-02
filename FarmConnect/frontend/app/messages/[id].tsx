import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    KeyboardAvoidingView, 
    TouchableOpacity,
    TextInput,
    Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getMessage, createMessage, getMyData, deleteMessage, getUser, getMessages } from '../../scripts/api';

import NavigationHeader from '../../components/header';
import NavigationFooter from "../../components/footer";

import { styles } from '../../styles/tabs/chat';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const MessageItem = ({ id, name, snippet, time, read, senderId }) => (
  <View>
    <View style={styles.messageAvatar}>
      <Feather name="user" size={13} color="#666" style={{ marginHorizontal: 8 }} />
    </View>
    <View style={styles.messageContent}>
      <Text style={[styles.messageName, !read && styles.messageNameUnread]}>{name}</Text>
      <Text style={[styles.messageSnippet, !read && styles.messageSnippetUnread]} numberOfLines={1}>
        {snippet}
      </Text>
    </View>
    <Text style={styles.messageTime}>{time}</Text>
  </View>
);

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await getMyData();
        setUser(userData);
        
        const allMessages = await getMessages();
        const message = await getMessage(id);
        setMessage(message);
        const conversation = allMessages.filter(
          msg => msg.sender === userId || msg.receiver === userId
        );
        setMessages(conversation);
      } catch (error) {
        console.error('Error loading chat:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    try {
      const newMessage = {
        receiver: userId,
        content: message,
        title: `Message to ${otherUser?.first_name || 'User'}`
      };
      
      await createMessage(newMessage);
      setMessage('');
      const allMessages = await getMessages();
      const conversation = allMessages.filter(
        msg => msg.sender === user.id || msg.receiver === user.id
      );
      setMessages(conversation);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading chat...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationHeader />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back() || router.push('/messages')}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {`Chat with ${message.sender_info?.username} and ${message.receiver_info?.username}`}
        </Text>
      </View>

      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((msg, index) => (
          <MessageItem
            key={index}
            id={msg.id}
            name={msg.title}
            snippet={msg.content}
            time={formatDistanceToNow(parseISO(msg.created_at), { addSuffix: true })}
            read={msg.read}
            senderId={msg.sender_info?.username === currentUserId ? msg.receiver_info?.username : msg.sender_info?.username}
          />
        ))}
      </ScrollView>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <NavigationFooter />
    </View>
  );
}