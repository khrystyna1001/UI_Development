import React, { useEffect, useState } from 'react';
import { View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Modal
    } from 'react-native';

import { getProducts, getMyData } from "../../scripts/api";

import NavigationFooter from "../../components/footer";
import NavigationHeader from "../../components/header";
import { router } from 'expo-router';


import { styles } from '../../styles/tabs/marketplace.jsx';

const ProductCategories = [
  "Vegetable",
  "Eggs",
  "Goods",
  "Meat",
  "Fruit"
]

const ProductCard = ({ product }: { product: any }) => (
  <TouchableOpacity style={styles.productCard} onPress={() => router.navigate(`/products/${product.id}`)}>
    <View style={styles.productImagePlaceholder} />
    <View style={styles.productContent}>
      <Text style={styles.productName}>{product.name}</Text>
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
  const [sortGoods, setSortGoods] = useState("newest");
  const [showSortButton, setShowSortButton] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchMyData = async () => {
    const response = await getMyData();
    if (response) {
      setUser(response)
    } else {
      console.error("Failed to fetch current user data")
    }
  }

  const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response);
  };

  const sortProducts = (products) => {
    const sorted = [...products];
    switch (sortGoods) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      default:
        return sorted;
    }
  };

  const searchedProducts = sortProducts(products).filter((p: any) => {
    const query = searchQuery?.toLowerCase() || '';
    return (
      (p.name?.toLowerCase() || '').includes(query) ||
      (p.label?.toLowerCase() || '').includes(query) ||
      (p.category?.toLowerCase() || '').includes(query)
    );
  });

  useEffect(() => {
    fetchProducts();
    fetchMyData();
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
                    sortGoods === option && styles.selectedSortOption
                  ]}
                  onPress={() => { 
                    setSortGoods(option);
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

      {/* Product Content Scroll */}
      <ScrollView style={styles.scrollViewContent} contentContainerStyle={styles.scrollContent}>

        {user?.is_superuser && (
        <TouchableOpacity style={styles.addButton} onPress={() => router.navigate(`/products/create`) }>
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
        )}

        {/* Product List */}
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
            {ProductCategories.map((tag, i) => (
              <TouchableOpacity key={i} style={styles.tagPill} onPress={() => setSearchQuery(tag)}>
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