import React, { useState, useEffect, useRef, useCallback } from 'react';
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

const sortMessagesByTime = (messages) => {
    const validMessages = messages.filter(msg => msg.created_at);
    return validMessages.sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        
        if (isNaN(timeA) || isNaN(timeB)) {
            return 0; 
        }
        return timeA - timeB;
    });
};

export default function ChatDetail() {
  const { id } = useLocalSearchParams();
  const chatId = id ? String(id) : null;
  const scrollViewRef = useRef(null);
  
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
  const [chatToDelete, setChatToDelete] = useState(null);

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

  const handleRead = useCallback(async (messageId) => {
    if (!user || !chatId) return;

    setMessages(prevMessages => {
        const messageToUpdate = prevMessages.find(msg => msg.id === messageId);
        if (!messageToUpdate || messageToUpdate.read) return prevMessages;

        const messageData = {
           content: messageToUpdate.content, 
           sender: messageToUpdate.sender,
           read: true,
           chat: chatId 
        };

        updateMessage(messageId, messageData)
            .catch(error => {
                console.error('Failed to mark message as read on API:', error);
            });
        
        return prevMessages.map(msg => 
            msg.id === messageId ? { ...msg, read: true } : msg
        );
    });

  }, [user, chatId]); 

  const loadChat = useCallback(async () => {
    if (!chatId || !user) return;
    try {
      setLoading(true);
      const chatData = await getChat(chatId);
      
      setMessages(sortMessagesByTime(chatData.messages || [])); 
      
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
  }, [chatId, user, handleRead]);

  useEffect(() => {
    loadChat();
  }, [loadChat]);

  const handleSend = async () => {
    if (!message.trim() || !user) return;

    try {
      setSending(true);
      const tempId = `temp-${Date.now()}`;
      const messageContent = message.trim();
      const clientTimestamp = new Date().toISOString(); 

      const newMessage = {
        id: tempId,
        content: messageContent,
        sender: user.id,
        created_at: clientTimestamp, 
        isOptimistic: true,
        chat: chatId
      };

      setMessages(prev => {
        const updated = [...prev, newMessage];
        return sortMessagesByTime(updated); 
      });
      setMessage('');

      try {
        const response = await createMessage({
          content: messageContent,
          chat: chatId,
          sender: user.id,
          created_at: clientTimestamp 
        });
        
        if (response && response.id) {
          setMessages(prev => {
            const updatedMessages = prev.map(msg => 
              msg.id === tempId 
                ? { 
                    ...response, 
                    isOptimistic: false,
                    sender: user.id 
                  } 
                : msg
            );
            
            return sortMessagesByTime(updatedMessages);
          });
        } else {
             throw new Error('Invalid response from server.');
        }
      } catch (error) {
        console.error('Failed to save message:', error);
        setMessages(prev => sortMessagesByTime(prev.filter(msg => msg.id !== tempId)));
        Alert.alert('Error', 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error in handleSend:', error);
    } finally {
      setSending(false);
    }
  };

  const handleDeleteChat = async (chatIdToDelete) => {
    if (!chatIdToDelete) {
        Alert.alert('Error', 'Invalid chat ID');
        return;
    }
    try {
      setDeleting(true);

      const response = await deleteChat(chatIdToDelete);
      
      if (response.ok || response.status === 204) {
        setShowDeleteModal(false);
        router.replace('/(tabs)/messages');
      } else {
        const error = await response.text();
        throw new Error(error || 'Failed to delete chat');
      }
    } catch (error) {
      console.error('Failed to delete chat:', error);
      Alert.alert('Error', 'Failed to delete chat. Please try again.');
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!messageId) {
      console.error('Cannot delete message: No message ID provided');
      Alert.alert('Error', 'Cannot delete message: Invalid message ID');
      return;
    }

    try {
      setDeleting(true);

      const messageToRestore = messages.find(msg => msg.id === messageId);
      
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      
      try {
        const response = await deleteMessage(messageId);
        
        if (!response.ok) {
          throw new Error(await response.text() || 'API failed to delete message');
        }
        
      } catch (error) {
        console.error('API Error deleting message:', error);
        if (messageToRestore) {
          setMessages(prev => sortMessagesByTime([...prev, messageToRestore]));
        }
        throw error;
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
      Alert.alert(
        'Error', 
        error.message || 'Failed to delete message. Please try again.'
      );
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    }
  };

  const showDeleteConfirmation = (type, deleteId = null) => {
    setDeleteType(type);
    if (type === 'chat') {
        setChatToDelete({ id: deleteId || chatId });
    } else {
        setMessageToDelete(deleteId);
    }
    setShowDeleteModal(true);
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
          onPress={() => showDeleteConfirmation('chat', chatId)}
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
                    handleDeleteChat(chatToDelete?.id);
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
                  message.isOptimistic && styles.sendingMessage, 
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
                  {message.created_at ? format(new Date(message.created_at), 'h:mm a') : '...'}
                  {message.isOptimistic && ' · Sending...'}
                  {message.error && ' · Failed to send'}
                  {isCurrentUser && !message.isOptimistic && (
                    <Text style={styles.readStatus}>
                      {message.read ? ' ✓✓' : ' ✓'}
                    </Text>
                  )}
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