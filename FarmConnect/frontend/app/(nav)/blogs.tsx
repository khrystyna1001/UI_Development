import React, { useState } from 'react';
import { View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    } from 'react-native';
import NavigationFooter from "../../components/footer";
import NavigationHeader from "../../components/header";
import { router } from 'expo-router';

import { styles } from '../../styles/tabs/marketplace.jsx';

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

  const filteredPosts = mockBlogPosts.filter(post => {
    const query = searchQuery?.toLowerCase() || '';
    return (
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query)
    );
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <NavigationHeader />

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