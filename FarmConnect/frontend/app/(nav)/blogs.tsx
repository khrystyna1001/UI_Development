import React, { useEffect, useState } from 'react';
import { View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Modal,
    ActivityIndicator,
    } from 'react-native';

import { getBlogPosts, getMyData } from "../../scripts/api";

import NavigationFooter from "../../components/footer";
import NavigationHeader from "../../components/header";
import { CreateButton } from "../../components/createButton";

import { router } from 'expo-router';

import { styles } from '../../styles/nav/blogs.jsx';

import SearchFilterBar from '../../components/searchfilter';
import FilterModal from '../../components/filtermodal';

const GREEN = '#25D366';


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
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('newest');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const filterOptions = [
    { label: 'Newest First', value: 'newest' },
    { label: 'Oldest First', value: 'oldest' },
  ];

  const fetchBlogs = async () => {
      try {
        const data = await getBlogPosts();
        setBlogs(data);
  
        const filtered = applyFilters(data, searchQuery, selectedFilter);
        setFilteredBlogs(filtered);
  
        const response = await getMyData();
        setUser(response);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs. Please try again.');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
  
    useEffect(() => {
      fetchBlogs();
    }, [filteredBlogs, blogs, selectedFilter]);

  const applyFilters = (data, query, sortBy) => {
      if (!data || !Array.isArray(data)) {
        return [];
      }
  
      let result = [...data];
      
      if (query) {
        const lowerQuery = query.toLowerCase();
        result = result.filter(blog => 
          (blog?.title?.toLowerCase().includes(lowerQuery) || 
          blog?.content?.toLowerCase().includes(lowerQuery) ||
          blog?.author?.name?.toLowerCase().includes(lowerQuery)) ?? false
        );
      }
      
      switch(sortBy) {
        case 'oldest':
          result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          break;
        case 'newest':
        default:
          result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
      
      return result;
    };
  
    const handleSearch = (text) => {
      setSearchQuery(text);
      const filtered = applyFilters(blogs, text, selectedFilter);
      setFilteredBlogs(filtered);
    };
  
    const onRefresh = () => {
      setRefreshing(true);
      fetchBlogs();
    };
  
    if (loading && !refreshing) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={GREEN} />
        </View>
      );
    }
  
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={fetchBlogs}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <NavigationHeader />

      {/* Search Bar */}
       <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={(searchQuery) => setSearchQuery(searchQuery)}
          onFilterPress={() => setShowFilterModal(true)}
          placeholder="Search blogs..."
        />
       <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        title="Sort By"
        options={filterOptions}
        selectedOption={selectedFilter}
        onSelect={(value) => {
          setSelectedFilter(value);
          setShowFilterModal(false);
        }}
      />

      {/* Blog Content Scroll */}
      <ScrollView style={styles.scrollViewContent} contentContainerStyle={styles.scrollContent}>

        {/* Blog Post List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Articles ({filteredBlogs.length})</Text>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((post: any) => (
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

      {user?.is_superuser && (
        <CreateButton item="blog" onPress={() => router.navigate('/blog/create')} />
      )}

      <NavigationFooter />
    </SafeAreaView>
  );
};