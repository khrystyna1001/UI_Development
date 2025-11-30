import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  ActivityIndicator,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { getProduct, createProduct, updateProduct, deleteProduct, getMyData } from '../../scripts/api';
import NavigationHeader from '../../components/header';
import NavigationFooter from "../../components/footer";
import { styles } from '../../styles/tabs/productcreate';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductCategories = [
  "Vegetable",
  "Eggs",
  "Goods",
  "Meat",
  "Fruit"
]

const ProductEditor = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(!!id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [isEditMode, setIsEditMode] = useState(!!id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '1',
    author: '',
    category: ProductCategories[0]
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await getMyData();
        setIsSuperuser(userData.is_superuser);
        
        if (!userData.is_superuser) {
          Alert.alert('Access Denied', 'Only administrators can manage products.');
          router.back();
          return;
        }

        if (id) {
          const productData = await getProduct(id);
          setFormData({
            name: productData.name || '',
            description: productData.description || '',
            price: productData.price?.toString() || '',
            quantity: productData.quantity?.toString() || '1',
            author: userData.id,
            category: productData.category || ProductCategories[0]
          });
        }
      } catch (error) {
        console.error('Error loading data:', error);
        Alert.alert('Error', 'Failed to load product data');
        router.back();
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.description.trim() || !formData.price || !formData.quantity) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity, 10),
        author: formData.author,
        category: formData.category,
      };

      if (isEditMode && id) {
        await updateProduct(id, productData);
        Alert.alert('Success', 'Product updated successfully');
      } else {
        await createProduct(productData);
        Alert.alert('Success', 'Product created successfully');
      }
      router.replace('/(tabs)/marketplace');
    } catch (error) {
      console.error('Error saving product:', error);
      Alert.alert('Error', 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProductItem = async () => {
    if (!id) return;
    try {
      await deleteProduct(id);
      Alert.alert('Success', 'Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'Failed to delete product');
    }
    router.replace('/(tabs)/marketplace');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationHeader />
      <ScrollView style={styles.formContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.header}>
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </Text>

        <Text style={styles.label}>Product Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="Enter product name"
          placeholderTextColor="#95a5a6"
        />

        <View style={styles.categoryContainer}>
          <Text style={styles.label}>Category *</Text>
          <View style={styles.categoryList}>
            {ProductCategories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  formData.category === category && styles.selectedChip,
                ]}
                onPress={() => handleChange('category', category)}
              >
                <Text style={[
                  styles.categoryChipText,
                  formData.category === category && styles.selectedChipText,
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(text) => handleChange('description', text)}
          placeholder="Describe your product in detail..."
          placeholderTextColor="#95a5a6"
          multiline
          numberOfLines={4}
        />

        <View style={styles.quantityContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Quantity *</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => handleChange('quantity', Math.max(1, (parseInt(formData.quantity) || 1) - 1).toString())}
              >
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={[styles.input, { textAlign: 'center', marginHorizontal: 10 }]}
                value={formData.quantity}
                onChangeText={(text) => handleChange('quantity', text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
              />
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => handleChange('quantity', ((parseInt(formData.quantity) || 0) + 1).toString())}
              >
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.label}>Price *</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={formData.price}
                onChangeText={(text) => handleChange('price', text.replace(/[^0-9.]/g, ''))}
                placeholder="0.00"
                placeholderTextColor="#95a5a6"
                keyboardType="decimal-pad"
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
            </Text>
          </TouchableOpacity>

          {isEditMode && (
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={deleteProductItem}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>Delete Product</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <NavigationFooter />
    </View>
  );
};

export default ProductEditor;