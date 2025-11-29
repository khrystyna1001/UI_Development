import React, { useEffect, useState } from 'react';
import { View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Modal,
    } from 'react-native';

import { getBlogPosts, getMyData } from "../../scripts/api";
import NavigationFooter from "../../components/footer";
import NavigationHeader from "../../components/header";
import { router } from 'expo-router';
import { styles } from '../../styles/nav/blogs.jsx';


const BlogPostCard = ({ post }: { post: any }) => (
  <TouchableOpacity style={styles.blogCard} onPress={() => router.navigate(`/blog/${post.id}`)}>
    <View style={styles.blogImagePlaceholder} />
    <View style={styles.blogContent}>
      <Text style={styles.blogTitle}>{post.title}</Text>
      <Text style={styles.blogDescription}>{post.content}</Text>
      <View style={styles.blogMeta}>
        <Text style={styles.blogAuthor}>{post.author_info?.username} | {new Date(post.created_at).toLocaleDateString()} | {post.category}</Text>
        <Text style={styles.blogReads}>⭐ {post.reads}k Reads</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const BlogPostCategories = [
  "Gardening",
  "Recipes",
  "Farming"
]

export default function BlogPage () {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortPosts, setSortPosts] = useState("newest");
  const [showSortButton, setShowSortButton] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await getBlogPosts();
      setBlogs(response);
    } catch (e) {
      console.error(`Failed to fetch blogs ${e}`)
    }
  }

  const sortBlogs = (blogs) => {
    const sorted = [...blogs];
    switch (sortPosts) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      default:
        return sorted;
    }
  };

  const searchedPosts = sortBlogs(blogs).filter((post: any) => {
    const query = searchQuery?.toLowerCase() || '';
    return (
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const user = await getMyData();
      setUser(user);
    };
    loadUser();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <NavigationHeader />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search articles and tips..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowSortButton(!showSortButton)}>
          <Text style={styles.filterText}>Sort</Text>
        </TouchableOpacity>
        <Modal
          visible={showSortButton}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowSortButton(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={() => setShowSortButton(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sort By</Text>
              {['newest', 'oldest'].map(option => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.sortOption,
                    sortPosts === option && styles.selectedSortOption
                  ]}
                  onPress={() => { 
                    setSortPosts(option);
                    setShowSortButton(false);
                  }}
                >
                  <Text style={styles.sortOptionText}>
                    {option.replace('-', ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* Blog Content Scroll */}
      <ScrollView style={styles.scrollViewContent} contentContainerStyle={styles.scrollContent}>

        {user?.is_superuser && (
          <TouchableOpacity style={styles.createButton} onPress={() => router.navigate('/blog/create')}>
            <Text style={styles.createButtonText}>Create New Post</Text>
          </TouchableOpacity>
        )}

        {/* Blog Post List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Articles ({searchedPosts.length})</Text>
          {searchedPosts.length > 0 ? (
            searchedPosts.map((post: any) => (
              <BlogPostCard
                key={post.id}
                post={post}
              />
            ))
          ) : (
            <Text style={styles.noResultsText}>No posts found matching your search.</Text>
          )}
        </View>

        {/* Trending Tags (Example of additional content) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Topics</Text>
          <View style={styles.tagContainer}>
            {BlogPostCategories.map((tag, i) => (
              <TouchableOpacity key={i} style={styles.tagPill} onPress={() => setSearchQuery(tag)}>
                <Text style={styles.tagPillText}>{`#${tag}`}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>

      <NavigationFooter />
    </SafeAreaView>
  );
};