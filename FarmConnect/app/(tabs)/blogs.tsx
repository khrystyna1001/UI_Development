import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StyleSheet } from 'react-native';
import NavigationFooter from "../../components/footer";
import { router } from 'expo-router';


const mockBlogPosts = [
  {
    id: 1,
    title: "Mastering Organic Pest Control",
    summary: "Learn natural and effective ways to keep pests away from your crops without harmful chemicals.",
    author: "Jane Smith",
    date: "Sep 15, 2025",
    reads: 4.5
  },
  {
    id: 2,
    title: "The Magic of Crop Rotation in Small Farms",
    summary: "How to maximize soil health and yield efficiency using simple rotational strategies.",
    author: "Alex Farmer",
    date: "Aug 28, 2025",
    reads: 3.1
  },
  {
    id: 3,
    title: "Watering Techniques for a Dry Summer",
    summary: "Tips and tricks for conserving water while ensuring your crops thrive during hot periods.",
    author: "John Doe",
    date: "Aug 10, 2025",
    reads: 5.2
  },
  {
    id: 4,
    title: "Starting Your First Herb Garden",
    summary: "A beginner's guide to planting, growing, and harvesting popular kitchen herbs.",
    author: "Alice Green",
    date: "Jul 20, 2025",
    reads: 1.8
  },
];


const BlogPostCard = ({ post, onPress }) => (
  <TouchableOpacity style={styles.blogCard} onPress={onPress}>
    <View style={styles.blogImagePlaceholder} />
    <View style={styles.blogContent}>
      <Text style={styles.blogTitle}>{post.title}</Text>
      <Text style={styles.blogSummary}>{post.summary}</Text>
      <View style={styles.blogMeta}>
        <Text style={styles.blogAuthor}>{post.author} | {post.date}</Text>
        <Text style={styles.blogReads}>⭐ {post.reads}k Reads</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function BlogPage () {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = mockBlogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image style={styles.headerImage} source={{ uri: "https://via.placeholder.com/24x24" }} />
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Blogs</Text>
          <View style={styles.headerIcons}>
            <Text style={styles.icon}>🌾</Text>
            <Text style={styles.icon}>📝</Text>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search articles and tips..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => alert("Filter Options")}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Blog Content Scroll */}
      <ScrollView style={styles.scrollViewContent} contentContainerStyle={styles.scrollContent}>

        {/* Featured Author/Profile (similar to previous profile but for the blog context) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Author</Text>
          <View style={styles.authorCard}>
            <View style={styles.authorAvatar} />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>John Doe</Text>
              <Text style={styles.authorBio}>Leading expert in sustainable farming techniques and organic pest control.</Text>
            </View>
            <TouchableOpacity style={styles.followButton} onPress={() => alert("Followed John Doe")}>
              <Text style={styles.followButtonText}>+ Follow</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Blog Post List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Articles ({filteredPosts.length})</Text>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
                onPress={() => alert(`Reading: ${post.title}`)}
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
            {['#Organic', '#Compost', '#Yields', '#PestControl', '#Drought'].map((tag, i) => (
              <TouchableOpacity key={i} style={styles.tagPill} onPress={() => setSearchQuery(tag.substring(1))}>
                <Text style={styles.tagPillText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>

      <NavigationFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
    // Utility and Structure
    scrollContent: { paddingBottom: 60 },
    scrollViewContent: { flex: 1 },
    section: { paddingHorizontal: 16, marginBottom: 20 },
    sectionHeader: { marginBottom: 10 },
    sectionSubtitle: { color: "#777", fontSize: 14, marginBottom: 8 },

    // Header (Reusing styles from Marketplace)
    headerContainer: {
        backgroundColor: "#FFFFFF",
        marginBottom: 12,
        paddingHorizontal: 16,
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 6,
        elevation: 3,
    },
    headerImage: { height: 24, width: 24 },
    headerRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, alignItems: 'center' },
    headerTitle: { color: "#000", fontSize: 20, fontWeight: "600" },
    headerIcons: { flexDirection: "row" },
    icon: { color: "#000", fontSize: 16, marginRight: 16 },

    // Search Bar
    searchContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginBottom: 20,
    },
    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#E0E0E0",
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      marginRight: 8,
      backgroundColor: '#FAFAFA',
    },
    filterButton: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 15,
      backgroundColor: '#4CAF50',
      borderRadius: 8,
    },
    filterText: {
      color: '#FFF',
      fontWeight: '600',
    },

    // Featured Author Card
    authorCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F8F8F8',
      padding: 15,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 3,
      elevation: 1,
    },
    authorAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#0000001A',
      marginRight: 15,
    },
    authorInfo: {
      flex: 1,
    },
    authorName: {
      fontSize: 16,
      fontWeight: '700',
      color: '#000',
    },
    authorBio: {
      fontSize: 12,
      color: '#777',
      marginTop: 2,
    },
    followButton: {
      backgroundColor: '#000',
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 10,
    },
    followButtonText: {
      color: '#FFF',
      fontSize: 12,
      fontWeight: '600',
    },

    // Blog Post Card
    blogCard: {
      flexDirection: 'row',
      backgroundColor: '#FFF',
      padding: 10,
      borderWidth: 1,
      borderColor: '#F0F0F0',
      borderRadius: 8,
      marginBottom: 10,
    },
    blogImagePlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 6,
      backgroundColor: '#E0E0E0',
      marginRight: 10,
    },
    blogContent: {
      flex: 1,
      justifyContent: 'space-between',
    },
    blogTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: '#000',
    },
    blogSummary: {
      fontSize: 12,
      color: '#555',
      marginTop: 4,
    },
    blogMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      borderTopWidth: 1,
      borderTopColor: '#F8F8F8',
      paddingTop: 5,
    },
    blogAuthor: {
      fontSize: 10,
      color: '#999',
    },
    blogReads: {
      fontSize: 10,
      color: '#4CAF50',
      fontWeight: '600',
    },
    noResultsText: {
      textAlign: 'center',
      padding: 20,
      color: '#777',
    },

    // Trending Tags
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    tagPill: {
      backgroundColor: '#F0F4F0',
      borderRadius: 15,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginRight: 8,
      marginBottom: 8,
    },
    tagPillText: {
      color: '#4CAF50',
      fontSize: 12,
      fontWeight: '500',
    },

    // Footer Placeholder (Reusing styles from Marketplace)
    footerPlaceholder: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#555',
    },

    // Reused Style Overrides
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
        marginBottom: 10, // Added margin for spacing
    },
});