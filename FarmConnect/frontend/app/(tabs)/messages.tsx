import React, { useEffect } from 'react';
import { View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    }
from 'react-native';

import { getMessages } from '../../scripts/api';
import { formatDistanceToNow, parseISO } from 'date-fns';

import { Feather } from '@expo/vector-icons';

import { router } from 'expo-router';

import NavigationFooter from "../../components/footer";
import NavigationHeader from '../../components/header';
import { styles } from '../../styles/tabs/messages.jsx';

const MessageItem = ({ id, name, snippet, time, read }) => (
  <TouchableOpacity style={styles.messageItemContainer} onPress={() => router.replace(`/messages/${id}`)}>>
    <View style={styles.messageAvatar}>
        <Feather name="user" size={13} color="#666" style={{ marginHorizontal: 8 }} />
    </View>
    <View style={styles.messageContent}>
      <Text style={[styles.messageName, !read && styles.messageNameUnread]}>{name}</Text>
      <Text style={[styles.messageSnippet, !read && styles.messageSnippetUnread]} numberOfLines={1}>{snippet}</Text>
    </View>
    <Text style={styles.messageTime}>{time}</Text>
  </TouchableOpacity>
);

export default function Messages () {
  const [messages, setMessages] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const fetchMessages = async () => {
    try {
      const messages = await getMessages();
      setMessages(messages);
    } catch (e) {
      console.error(e)
    }
  };

  const searchedMessages = messages.filter((message: any) => {
    const query = searchQuery?.toLowerCase() || '';
    return (
      message.title.toLowerCase().includes(query) ||
      message.content.toLowerCase().includes(query) ||
      message.author?.first_name?.toLowerCase().includes(query) ||
      message.author?.last_name?.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        {/* Header */}
        <NavigationHeader />
        <ScrollView style={styles.scrollViewContent}>

          <View style={styles.cardGrid}>
            <View style={styles.cardIconContainer}>
              <Feather name="inbox" size={24} color="#007AFF" />
            </View>
            <View style={styles.cardIconContainer}>
              <Feather name="send" size={24} color="#007AFF" />
            </View>
            <View style={styles.cardIconContainer}>
              <Feather name="book" size={24} color="#007AFF" />
            </View>
          </View>

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
                placeholder="Search messages..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          <Text style={styles.sectionHeader}>Your Messages</Text>

          <View>
            {Array.isArray(searchedMessages) && searchedMessages.map((message) => (
              <MessageItem
                key={message.id}
                id={message.id}
                name={message.title}
                snippet={message.content}
                time={formatDistanceToNow(parseISO(message.created_at), { addSuffix: true })}
                read={message.read}
              />
            ))}
          </View>

          <View style={{ height: 160 }} />
        </ScrollView>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={[styles.button, styles.deleteButton]}>
            <Text style={styles.buttonText}>Delete Selected</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.readButton]}>
            <Text style={styles.buttonText}>Mark as Read</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.composeButton]}>
            <Text style={styles.composeButtonText}>Compose New Message</Text>
          </TouchableOpacity>
        </View>
        <NavigationFooter />
    </SafeAreaView>
    );
};


