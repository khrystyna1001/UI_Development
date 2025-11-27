import React, { useEffect, useState } from 'react';
import { View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    } from 'react-native';

import { getBlogPosts } from "../../scripts/api";
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
        <Text style={styles.blogAuthor}>{post.author.first_name} | {new Date(post.created_at).toLocaleDateString()}</Text>
        <Text style={styles.blogReads}>⭐ {post.reads}k Reads</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function BlogPage () {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await getBlogPosts();
    setBlogs(response);
  }

  const searchedPosts = blogs.filter((post: any) => {
    const query = searchQuery?.toLowerCase() || '';
    return (
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.author?.first_name?.toLowerCase().includes(query) ||
      post.author?.last_name?.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

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
          <Text style={styles.sectionTitle}>Latest Articles ({searchedPosts.length})</Text>
          {searchedPosts.length > 0 ? (
            searchedPosts.map((post: any) => (
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