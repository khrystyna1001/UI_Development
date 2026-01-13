import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  TouchableWithoutFeedback,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { getProduct, createProduct, updateProduct, deleteProduct, getMyData, getFarms } from '../../scripts/api';
import NavigationHeader from '../../components/header';
import NavigationFooter from "../../components/footer";
import { EditButton } from '../../components/editButton';
import { DeleteButton } from '../../components/deleteButton';
import { styles } from '../../styles/tabs/productcreate';

import Icon from 'react-native-vector-icons/MaterialIcons';
import LoadingSpinner from '../../components/LoadingSpinner';

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
  const [isEditMode, setIsEditMode] = useState(!!id);
  const [farms, setFarms] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '1',
    author: '',
    category: ProductCategories[0],
    farms: []
  });

  const [selectedFarms, setSelectedFarms] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await getMyData();

        // Load farms data
        const farmsData = await getFarms();
        setFarms(farmsData);

        if (id) {
          const productData = await getProduct(id);
          setFormData({
            name: productData.name || '',
            description: productData.description || '',
            price: productData.price?.toString() || '',
            quantity: productData.quantity?.toString() || '1',
            author: userData.id,
            category: productData.category || ProductCategories[0],
            farms: productData.farms || []
          });
          if (productData.farms && productData.farms.length > 0) {
            setSelectedFarms(productData.farms.map(farm => farm.id || farm));
          }
        } else {
        setFormData(prev => ({
          ...prev,
          author: userData.id
        }));
      }} catch (error) {
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

  const toggleFarm = (farmId: string) => {
    setSelectedFarms(prev => {
      const newFarms = prev.includes(farmId)
        ? prev.filter(id => id !== farmId)
        : [...prev, farmId];
      
      setFormData(prev => ({
        ...prev,
        farms: newFarms
      }));
      
      return newFarms;
    });
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
        farms: formData.farms,
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
      <LoadingSpinner />
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

          {/* Farm Selection */}
          <View>
            <Text style={styles.label}>Available in Farms *</Text>
            <Text style={styles.selectedCounter}>
              {selectedFarms.length} {selectedFarms.length === 1 ? 'farm' : 'farms'} selected
            </Text>
            
            <View style={styles.productsGrid}>
              {farms.map((farm) => {
                const isFarmSelected = selectedFarms.includes(farm.id);
                
                return (
                  <View key={farm.id} style={styles.farmItem}>
                    <TouchableWithoutFeedback onPress={() => toggleFarm(farm.id)}>
                      <View style={styles.farmCheckbox}>
                        <View style={[
                          styles.checkbox, 
                          isFarmSelected && styles.checkboxSelected
                        ]}>
                          {isFarmSelected && (
                            <Text style={styles.checkmark}>✓</Text>
                          )}
                        </View>
                        <Text style={styles.farmLabel}>{farm.name}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <EditButton item={formData.name} action={isEditMode ? "Update" : "Create"} onPress={handleSubmit} disabled={isSubmitting} />

          {isEditMode && (
            <DeleteButton item={formData.name} onPress={deleteProductItem} disabled={isSubmitting} />
          )}
        </View>
      </ScrollView>
      <NavigationFooter />
    </View>
  );
};

export default ProductEditor;