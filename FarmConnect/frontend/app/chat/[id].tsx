import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  SafeAreaView, 
  ScrollView,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { format } from 'date-fns';

import { getChat, deleteChat, deleteMessage, createMessage, getMyData, updateMessage } from '../../scripts/api';

import { styles } from '../../styles/tabs/chat';

export default function ChatDetail() {
  const { id } = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteType, setDeleteType] = useState<'chat' | 'message'>('chat');
  const [otherUser, setOtherUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getMyData();
        setUser(userData);
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    const loadChat = async () => {
      try {
        setLoading(true);
        const chatData = await getChat(id);
        setMessages(chatData.messages || []);
        const other = chatData.user1.id === user?.id ? chatData.user2 : chatData.user1;
        setOtherUser(other);
        
        if (chatData.messages && user) {
          const unreadMessages = chatData.messages.filter(
          msg => msg.sender !== user.id && !msg.read
        );
          
          await Promise.all(
            unreadMessages.map(async msg => await handleRead(msg.id).catch(console.error))
          );
        }
      } catch (error) {
        console.error('Error loading chat:', error);
        Alert.alert('Error', 'Failed to load chat. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadChat();
    }

  }, [id, user]);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      setSending(true);
      const newMessage = {
          id: `temp-${Date.now()}`,
          content: message.trim(),
          sender: user.id,
          created_at: new Date().toISOString(),
          isOptimistic: true
      };

      setMessages(prev => [...prev.filter(msg => msg.id !== newMessage.id),
          { ...newMessage, isOptimistic: false }
          ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
      setMessage('');

      try {
          await createMessage({
              content: newMessage.content,
              chat: id,
              sender: user.id,
              created_at: newMessage.created_at
          });
      } catch (error) {
          console.error('Failed to save message:', error);
          Alert.alert('Error', 'Failed to save message. Please check your connection.');
          setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
          return;
      }

      setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);

  } catch (error) {
      console.error('Failed to send message:', error);
      Alert.alert('Error', 'Failed to send message. Please try again.');
      setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
  } finally {
      setSending(false);
  }
  };

  const handleDeleteChat = async () => {
    try {
      setDeleting(true);
      await deleteChat(id);
      setShowDeleteModal(false);
      router.replace('/(tabs)/messages');
    } catch (error) {
      console.error('Failed to delete chat:', error);
      Alert.alert('Error', 'Failed to delete chat. Please try again.');
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }

  };

  const handleDeleteMessage = async (messageId) => {
    try {
      setDeleting(true);
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      
      await deleteMessage(messageId);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete message:', error);
      Alert.alert('Error', 'Failed to delete message. Please try again.');
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  }

  const showDeleteConfirmation = (type: 'chat' | 'message', id?) => {
    setDeleteType(type);
    if (type === 'message') {
        setMessageToDelete(id);
    }
    setShowDeleteModal(true);
    };

  const handleRead = async (messageId) => {
    if (!messages) return;
    if (!user) return;

    const message = messages.find(msg => msg.id === id);
    if (!message) return;

    const messageData = {
       id,
       sender: user?.id,
       content: message.content,
       read: true,
    }
    try {
      await updateMessage(messageId, messageData);
      setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, read: true } : msg));
      console.log('Message read:', messageData);
    } catch (error) {
      console.error('Failed to read chat:', error);
      Alert.alert('Error', 'Failed to read chat. Please try again.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back() || router.replace('/(tabs)/messages')}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {otherUser?.first_name} {otherUser?.last_name}
        </Text> 
        <TouchableOpacity 
          onPress={showDeleteConfirmation}
          disabled={deleting}
          style={{ marginLeft: 'auto' }}
        >
          {deleting ? (
            <ActivityIndicator size="small" color="#ff4444" />
          ) : (
            <Feather name="trash-2" size={24} color="#000000" />
          )}
        </TouchableOpacity>
        <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => !deleting && setShowDeleteModal(false)}
        >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
                {deleteType === 'chat' ? 'Delete Chat' : 'Delete Message'}
            </Text>
            <Text style={styles.modalText}>
                {deleteType === 'chat' 
                ? 'Are you sure you want to delete this chat? This action cannot be undone.'
                : 'Are you sure you want to delete this message? This action cannot be undone.'}
            </Text>
            <View style={styles.modalButtons}>
                <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowDeleteModal(false)}
                disabled={deleting}
                >
                <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={() => {
                    if (deleteType === 'chat') {
                    handleDeleteChat();
                    } else {
                    handleDeleteMessage(messageToDelete);
                    }
                }}
                disabled={deleting}
                >
                {deleting ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.deleteButtonText}>Delete</Text>
                )}
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </Modal>
      </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => 
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map((message) => {
            const isCurrentUser = message.sender === user?.id;
            
            return (
              <View
                key={message.id}
                style={[
                  styles.messageBubble,
                  isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
                  message.isSending && styles.sendingMessage,
                  message.error && styles.errorMessage
                ]}
              >
                {isCurrentUser && (
                <TouchableOpacity
                    onPress={() => showDeleteConfirmation('message', message.id)}
                    disabled={deleting}
                    style={[styles.deleteMessageButton, { opacity: deleting ? 0.5 : 1 }]}
                    activeOpacity={0.7}
                >
                    <Feather name="trash-2" size={16} color="#ffffffff" />
                </TouchableOpacity>
                )}
                <Text style={[
                  styles.messageText,
                  isCurrentUser ? styles.currentUserText : styles.otherUserText
                ]}>
                  {message.content}
                </Text>
                <Text style={[
                  styles.messageTime,
                  isCurrentUser ? styles.currentUserTime : styles.otherUserTime
                ]}>
                  {format(new Date(message.created_at), 'h:mm a')}
                  {message.isSending && ' · Sending...'}
                  {message.error && ' · Failed to send'}
                </Text>
            </View>
          );
          })}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={handleSend}
            disabled={!message.trim() || sending}
          >
            <Feather 
              name="send" 
              size={24} 
              color={message.trim() ? '#4CAF50' : '#ccc'} 
            />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};