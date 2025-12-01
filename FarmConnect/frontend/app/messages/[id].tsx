import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    ActivityIndicator, 
    TouchableOpacity,
    Alert
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getMessage, getMyData, deleteMessage, getUser } from '../../scripts/api';

import NavigationHeader from '../../components/header';
import NavigationFooter from "../../components/footer";
import { styles } from '../../styles/tabs/product';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function MessageDetail() {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [senderData, setSenderData] = useState(null);
  const [receiverData, setReceiverData] = useState(null);


  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const messageData = await getMessage(id);
        setMessage(messageData);
        console.log(messageData)

        const userData = await getMyData();
        setUser(userData);

        if (messageData.sender) {
            const senderData = await getUser(messageData.sender);
            setSenderData(senderData);
        }

        if (messageData.receiver) {
            const receiverData = await getUser(messageData.receiver);
            setReceiverData(receiverData);
        }

      } catch (err) {
        setError('Failed to fetch message');
        console.error(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [id]);

  const deleteMessageById = async (id) => {
      try {
        await deleteMessage(id);
        Alert.alert('Success', 'Message deleted successfully');
      } catch (error) {
        console.error('Error deleting message:', error);
        Alert.alert('Error', 'Failed to delete message');
      }
      router.replace('/(tabs)/messages');
    };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading message details...</Text>
      </View>
    );
  }

  if (error || !message) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Message not found'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationHeader />
      <ScrollView style={styles.container}>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#333" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{message.title}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{message.content}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Sender:</Text>
            <Text style={styles.detailValue}>{senderData.username}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Receiver:</Text>
            <Text style={styles.detailValue}>{receiverData.username}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Read:</Text>
            <Text style={styles.detailValue}>{message.read ? 'True' : 'False'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Posted:</Text>
            <Text style={styles.detailValue}>
              {new Date(message.created_at).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last Updated:</Text>
            <Text style={styles.detailValue}>
              {new Date(message.updated_at || message.created_at).toLocaleDateString()}
            </Text>
          </View>
          
          {message?.sender !== message?.receiver !== user.id && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.messageButton]} 
              onPress={() => router.replace('/(tabs)/messages')}
            >
              <Text style={styles.actionButtonText}>Reply</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
    
    <NavigationFooter />
    </View>
  );
}