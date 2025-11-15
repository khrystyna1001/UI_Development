import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Header,
  Dimensions
} from 'react-native';

import NavigationFooter from '../../components/footer';
import NavigationHeader from '../../components/header';

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

    return (
  <SafeAreaView style={styles.safeArea}>
    <NavigationHeader />
    <ScrollView style={styles.scrollView}>

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

      <Text style={styles.sectionTitle}>Share your thoughts</Text>

      <TextInput
        style={styles.textInput}
        multiline
        placeholder="Write your farming experiences and tips..."
        placeholderTextColor="#999"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonDraft}>
          <Text style={styles.buttonTextBlack}>Save Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCancel}>
          <Text style={styles.buttonTextBlack}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPost}>
          <Text style={styles.buttonTextWhite}>Post</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 20 }} />
    </ScrollView>
    <NavigationFooter />
  </SafeAreaView>
  )
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const GREEN = '#4CAF50';
const LIGHT_GREY = '#F4F4F4';
const TEXT_GREY = '#555';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingHorizontal: 15,
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GREY,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 20,
  },

  // Profile Card Styles
  profileCard: {
    backgroundColor: LIGHT_GREY,
    borderRadius: 15,
    padding: 20,
    marginTop: 15,
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: GREEN,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileStatus: {
    fontSize: 14,
    color: TEXT_GREY,
    marginTop: 2,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  categoryButton: {
    alignItems: 'center',
    width: '23%',
  },
  categoryIconContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: TEXT_GREY,
  },

  // Section Title
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 5,
  },

  // Blogs Screen Styles
  blogItem: {
    backgroundColor: LIGHT_GREY,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  blogImagePlaceholder: {
    height: 150,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_GREY,
  },
  blogContent: {
    padding: 15,
  },
  blogBody: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  blogFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
    marginTop: 5,
  },
  blogTags: {
    fontSize: 12,
    color: TEXT_GREY,
    width: '60%',
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallAvatarPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: GREEN,
    marginRight: 5,
  },
  blogAuthor: {
    fontSize: 12,
    color: TEXT_GREY,
  },
  textInput: {
    backgroundColor: LIGHT_GREY,
    borderRadius: 15,
    padding: 15,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 14,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
  },
  buttonDraft: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: LIGHT_GREY,
    alignItems: 'center',
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  buttonPost: {
    flex: 1.5,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonTextBlack: {
    color: '#000',
    fontWeight: 'bold',
  },
  buttonTextWhite: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Gallery Screen Styles
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  galleryItem: {
    backgroundColor: LIGHT_GREY,
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    width: (SCREEN_WIDTH - 50) / 2, // 2 items with spacing
  },
  galleryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_GREY,
  },
  galleryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  // Tab Bar Styles
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: LIGHT_GREY,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  tabIcon: {
    fontSize: 22,
    color: TEXT_GREY,
    marginBottom: 2,
  },
  tabIconActive: {
    color: GREEN,
  },
  tabLabel: {
    fontSize: 10,
    color: TEXT_GREY,
  },
  tabLabelActive: {
    color: GREEN,
    fontWeight: 'bold',
  },

  // Placeholder styles
  centerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 24,
    color: TEXT_GREY,
  }
});