import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Header,
} from 'react-native';

import { useState } from 'react';
import NavigationFooter from '../../components/footer';
import NavigationHeader from '../../components/header';

import { styles } from '../../styles/nav/blogs.jsx';

const BlogItem = ({ title, body, tags, author }) => (
  <View style={styles.blogItem}>
    <View style={styles.blogImagePlaceholder}>
      <Text style={styles.blogTitle}>{title}</Text>
    </View>
    <View style={styles.blogContent}>
      <Text style={styles.blogBody}>{body}</Text>
      <View style={styles.blogFooter}>
        <Text style={styles.blogTags}>
          <Text style={{fontWeight: '600'}}>Tags: </Text>
          {tags}
        </Text>
        <View style={styles.authorSection}>
            <View style={styles.smallAvatarPlaceholder} />
            <Text style={styles.blogAuthor}>{author}</Text>
        </View>
      </View>
    </View>
  </View>
);


export default function BlogsScreen(setScreen) {
  const [textInput1, onChangeTextInput1] = useState("");

  return (
  <SafeAreaView style={styles.container}>
    <NavigationHeader />
    <ScrollView style={styles.scrollArea}>
    <View style={styles.scrollView}>
      <Text style={styles.sectionTitle}>Blogs</Text>

      <BlogItem
        title="Sunset on the farm"
        body="Beautiful evening at the farm!"
        tags="Sunset, Nature"
        author="Jane Smith"
      />
      <BlogItem
        title="New irrigation system"
        body="Just installed a new irrigation system!"
        tags="Irrigation, Technology"
        author="Tom Brown"
      />
    </View>

      <View style={styles.section}>
          <Text style={styles.sectionSubtitle}>Share your thoughts</Text>
          <TextInput
            placeholder="Write your blog here..."
            value={textInput1}
            onChangeText={onChangeTextInput1}
            style={styles.textInput}
            multiline
          />
          <Text style={styles.helperText}>
            Share your farming experiences and tips.
          </Text>
          <TouchableOpacity
            style={[styles.secondaryButton, { marginTop: 10 }]}
            onPress={() => alert("Save Draft Pressed!")}
          >
            <Text style={styles.secondaryButtonText}>Save Draft</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {onChangeTextInput1(""); alert("Cancel Pressed!")}}
          >
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => alert(`Post Content: ${textInput1}`)}
          >
            <Text style={styles.primaryButtonText}>Post</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
    <NavigationFooter />
  </SafeAreaView>
  )
};
