import React, { useEffect, useState } from 'react';
import { View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    } from 'react-native';

import { getProducts, getProduct } from "../../scripts/api";

import NavigationFooter from "../../components/footer";
import NavigationHeader from "../../components/header";
import { router } from 'expo-router';


import { styles } from '../../styles/tabs/marketplace.jsx';


const ProductCard = ({ product }: { product: any }) => (
  <TouchableOpacity style={styles.productCard} onPress={() => router.navigate(`/products/${product.id}`)}>
    <View style={styles.productImagePlaceholder} />
    <View style={styles.productContent}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <View style={styles.productMeta}>
        <Text style={styles.productAuthor}>{product.author} | {new Date(product.created_at).toLocaleDateString()}</Text>
        <Text style={styles.productQuantity}>⭐ {product.quantity > 0 ? ' ' + product.quantity + ' available' : 'out of stock'}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function ProductsPage () {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response);
  };

  const searchedProducts = products.filter((post: any) => {
    const query = searchQuery?.toLowerCase() || '';
    return (
      (post.name?.toLowerCase() || '').includes(query) ||
      (post.label?.toLowerCase() || '').includes(query) ||
      (post.tag?.toLowerCase() || '').includes(query)
    );
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <NavigationHeader />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search products...`}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => console.log("Filter pressed")}>
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
          <Text style={styles.sectionTitle}>Latest Products ({searchedProducts.length})</Text>
          {Array.isArray(searchedProducts) && searchedProducts.length > 0 ? (
            searchedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => alert(`Viewing product: ${product.name}`)}
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