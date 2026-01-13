import React, { useEffect, useState } from 'react';
import { View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Modal
    } from 'react-native';

import { getProducts, getMyData } from "../../scripts/api";

import NavigationFooter from "../../components/footer";
import NavigationHeader from "../../components/header";
import { CreateButton } from "../../components/createButton";
import LoadingSpinner from "../../components/LoadingSpinner";

import { router } from 'expo-router';

import SearchFilterBar from '../../components/searchfilter';
import FilterModal from '../../components/filtermodal';

import { styles } from '../../styles/tabs/marketplace.jsx';

const ProductCategories = [
  "Vegetable",
  "Eggs",
  "Goods",
  "Meat",
  "Fruit"
]

const GREEN = "#4CAF50";

const ProductCard = ({ product }: { product: any }) => (
  <TouchableOpacity style={styles.productCard} onPress={() => router.navigate(`/products/${product.id}`)}>
    <View style={styles.productImagePlaceholder} />
    <View style={styles.productContent}>
      <Text style={styles.productName}>{product.name} from {product.farms_info?.map((farm) => farm.name).join(', ') || 'Unknown Farm'}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <View style={styles.productMeta}>
        <Text style={styles.productAuthor}>{product.author_info?.username} | {new Date(product.created_at).toLocaleDateString()} | {product.category}</Text>
        <Text style={styles.productQuantity}>⭐ {product.quantity > 0 ? ' ' + product.quantity + ' available' : 'out of stock'}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function ProductsPage () {
  const [searchQuery, setSearchQuery] = useState("");

  const [user, setUser] = useState(null);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('newest');

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const filterOptions = [
    { label: 'Newest First', value: 'newest' },
    { label: 'Oldest First', value: 'oldest' },
  ];

  const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
  
        const filtered = applyFilters(data, searchQuery, selectedFilter);
        setFilteredProducts(filtered);
  
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
      fetchProducts();
    }, [selectedFilter]);

    useEffect(() => {
      const filtered = applyFilters(products, searchQuery, selectedFilter);
      setFilteredProducts(filtered);
    }, [searchQuery, products, selectedFilter]);

  const applyFilters = (data, query, sortBy) => {
      if (!data || !Array.isArray(data)) {
        return [];
      }
  
      let result = [...data];
      
      if (query) {
        const lowerQuery = query.toLowerCase();
        result = result.filter(product => 
          (product?.name?.toLowerCase().includes(lowerQuery) || 
          product?.description?.toLowerCase().includes(lowerQuery) ||
          product?.author_info?.name?.toLowerCase().includes(lowerQuery)) ?? false
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
      const filtered = applyFilters(products, text, selectedFilter);
      setFilteredProducts(filtered);
    };
  
    const onRefresh = () => {
      setRefreshing(true);
      fetchProducts();
    };
  
    if (loading && !refreshing) {
      return <LoadingSpinner color={GREEN} />;
    }
  
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={fetchProducts}
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
          onSearchChange={handleSearch}
          onFilterPress={() => setShowFilterModal(true)}
          placeholder="Search products..."
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

      {/* Product Content Scroll */}
      <ScrollView style={styles.scrollViewContent} contentContainerStyle={styles.scrollContent}>

        {/* Product List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Products ({filteredProducts.length})</Text>
          {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <Text style={styles.noResultsText}>No products found.</Text>
          )}
        </View>

        {/* Trending Tags (Example of additional content) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Topics</Text>
          <View style={styles.tagContainer}>
            {ProductCategories.map((tag, i) => (
              <TouchableOpacity key={i} style={styles.tagPill} onPress={() => setSearchQuery(tag)}>
                <Text style={styles.tagPillText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Empty space for visual balance */}
        <View style={{ height: 80 }} />

      </ScrollView>

      {user && (
        <CreateButton item="product" onPress={() => router.navigate(`/products/create`)} />
      )}

      <NavigationFooter />
    </SafeAreaView>
  );
};