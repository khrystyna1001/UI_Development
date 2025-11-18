import React from 'react';
import { View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Dimensions,
    Image,
    }
from 'react-native';

import NavigationFooter from "../../components/footer";
import NavigationHeader from '../../components/header';
import { styles } from '../../styles/tabs/messages.jsx';


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


