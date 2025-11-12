import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Dimensions, Image, StyleSheet } from 'react-native';
import NavigationFooter from "../../components/footer";
import NavigationHeader from '../../components/header';


const Icon = ({ name, size, color, style }) => (
  <Text style={[{ fontSize: size, color: color, alignSelf: 'center' }, style]}>
    {
      name === 'inbox' ? '📥' :
      name === 'send' ? '📤' :
      name === 'book-multiple' ? '📚' :
      name === 'home' ? '🏠' :
      name === 'store' ? '🛒' :
      name === 'message-text-multiple' ? '💬' :
      name === 'account' ? '👤' :
      name === 'account-circle' ? '👤' :
      '?'
    }
  </Text>
);

const messagesData = [
  { id: '1', name: 'John Smith', snippet: 'Are we still on for tomorrow?', time: '2 min ago', read: false },
  { id: '2', name: 'Anna Johnson', snippet: 'Check out this link!', time: '5 min ago', read: true },
  { id: '3', name: 'Mark Lee', snippet: 'Great meeting earlier!', time: '15 min ago', read: true },
  { id: '4', name: 'Lily Brown', snippet: 'Can you send me the files?', time: '1 hr ago', read: false },
  { id: '5', name: 'David Clark', snippet: 'Re: Project status update', time: '1 hr ago', read: true },
  { id: '6', name: 'Jessica Alba', snippet: 'Let\'s grab lunch next week.', time: '2 hr ago', read: false },
];

const ActionCard = ({ title, iconName }) => (
  <TouchableOpacity style={styles.card}>
    <View style={styles.cardIconContainer}>
      <Icon name={iconName} size={20} color="#007AFF" />
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
  </TouchableOpacity>
);

const MessageItem = ({ name, snippet, time, read }) => (
  <TouchableOpacity style={styles.messageItemContainer}>
    <View style={styles.messageAvatar}>
        <Icon name="account-circle" size={13} color="#666" style={{ marginHorizontal: 8 }} />
    </View>
    <View style={styles.messageContent}>
      <Text style={[styles.messageName, !read && styles.messageNameUnread]}>{name}</Text>
      <Text style={[styles.messageSnippet, !read && styles.messageSnippetUnread]} numberOfLines={1}>{snippet}</Text>
    </View>
    <Text style={styles.messageTime}>{time}</Text>
  </TouchableOpacity>
);

export default function Messages () {
  const [selectedMessages, setSelectedMessages] = React.useState([]);

  return (
        <SafeAreaView style={styles.container}>
              {/* Header */}
              <NavigationHeader />
        <ScrollView style={styles.scrollViewContent}>

          <View style={styles.cardGrid}>
            <ActionCard title="Inbox" iconName="inbox" />
            <ActionCard title="Sent" iconName="send" />
            <ActionCard title="Drafts" iconName="book-multiple" />
          </View>

          <View style={styles.activeUserContainer}>
            <Icon name="account-circle" size={48} color="#999" style={styles.activeUserAvatar} />
            <View>
              <Text style={styles.activeUserName}>Jane Doe</Text>
              <Text style={styles.activeUserStatus}>Last active: 2 hours ago</Text>
            </View>
          </View>

          <Text style={styles.sectionHeader}>Your Messages</Text>

          <View>
            {messagesData.map((message) => (
              <MessageItem
                key={message.id}
                name={message.name}
                snippet={message.snippet}
                time={message.time}
                read={message.read}
              />
            ))}
          </View>

          <View style={{ height: 160 }} />
        </ScrollView>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Icon size={20} color={"#fff"} />
          </TouchableOpacity>
          <Text style={styles.searchHint}>Find conversations by keyword</Text>
        </View>


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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flex: 1,
    paddingHorizontal: 16,
  },

      // Utility and Structure
      container: { flex: 1, backgroundColor: "#FFFFFF" },
      scrollContent: { paddingBottom: 20 }, // Added padding for content below scroll
      scrollArea: { flex: 1 },
      section: { paddingHorizontal: 16, marginBottom: 20 },
      sectionHeader: { marginBottom: 10 },
      sectionSubtitle: { color: "#777", fontSize: 14, marginBottom: 8 },

  cardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    marginTop: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 20,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
    height: 90,
  },
  cardIconContainer: {
    backgroundColor: '#E6F0FF',
    padding: 8,
    borderRadius: 50,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },


  activeUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  activeUserAvatar: {
    marginRight: 12,
  },
  activeUserName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  activeUserStatus: {
    fontSize: 14,
    color: '#999',
  },


  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginTop: 10,
    marginBottom: 8,
  },


  messageItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7',
  },
  messageAvatar: {
    borderRadius: 50,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
    justifyContent: 'center',
  },
  messageName: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  messageNameUnread: {
    fontWeight: '700',
  },
  messageSnippet: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  messageSnippetUnread: {
    fontWeight: '600',
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },


  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 16,
    marginTop: 8,
  },
  searchButton: {
    position: 'absolute',
    right: 20,
    top: 12,
    backgroundColor: '#000',
    borderRadius: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    marginBottom: 8,
  },


  actionButtonsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  deleteButton: {
    backgroundColor: '#fff',
    borderColor: '#333',
  },
  readButton: {
    backgroundColor: '#fff',
    borderColor: '#333',
  },
  composeButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  composeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },


  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: 20,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabTitle: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
});

