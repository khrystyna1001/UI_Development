import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import { createFarm, updateFarm, getFarm, deleteFarm, getProducts, editProduct } from '../../scripts/api';
import NavigationHeader from '../../components/header';
import NavigationFooter from '../../components/footer';
import { DeleteButton } from '../../components/deleteButton';
import { EditButton } from '../../components/editButton';
import { styles } from '../../styles/nav/farmcreate';

const FarmCreateScreen = () => {
  const { id } = useLocalSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const isEdit = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const fetchFarm = async () => {
        try {
          setLoading(true);
          const farm = await getFarm(id);
          setFormData({
            name: farm.name || '',
            location: farm.location || '',
            description: farm.description || '',
          });

          const existingProductIds = farm.products?.map(p => p.id).filter(id => 
            allProducts.some(p => p.id === id)
          ) || [];
          setSelectedProducts(existingProductIds);

        } catch (err) {
          setError('Failed to load farm data');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchFarm();
    }
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setAllProducts(products);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleProduct = (productId) => {
    setSelectedProducts(prev => {
      const current = Array.isArray(prev) ? prev : [];
      const productIdNum = Number(productId);
      
      return current.includes(productIdNum)
        ? current.filter(id => id !== productIdNum)
        : [...current, productIdNum];
    });
  };

  const handleDelete = async () => {
    try {
      await deleteFarm(id);
    } catch (err) {
      console.error('Error deleting farm:', err);
      setError('Failed to delete farm');
    }
    router.replace('/farm');
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.location) {
      setError('Name and location are required');
      return;
    }

    try {
      setSaving(true);
      const validProductIds = selectedProducts
        .map(id => {
          const numId = Number(id);
          return isNaN(numId) ? null : numId;
        })
      .filter((id): id is number => id !== null && id !== undefined);
      const data = {
        ...formData,
        products: validProductIds,
      };

      if (isEdit && id) {
        await updateFarm(id, data);
      } else {
        const newFarm = await createFarm(data);
        id = newFarm.id;
      }

      router.replace('/(nav)/farm');
    } catch (error) {
      setError('Failed to save farm');
      console.error('Error saving farm:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationHeader />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>
            {isEdit ? 'Edit Farm' : 'Create Farm'}
        </Text>
        <TouchableOpacity onPress={() => router.back() || router.replace('/farm')} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#333" />
            <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Farm Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
            placeholder="Enter farm name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Location *</Text>
          <TextInput
            style={styles.input}
            value={formData.location}
            onChangeText={(text) => handleChange('location', text)}
            placeholder="Enter farm location"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => handleChange('description', text)}
            placeholder="Tell us about your farm..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
        </View>

       <View style={styles.productsContainer}>
          <Text style={styles.label}>Products</Text> 
          {loadingProducts ? (
            <ActivityIndicator size="small" color="#4CAF50" />
          ) : (
            allProducts.map((product) => {
              const isProductSelected = selectedProducts.includes(product.id) || 
                         (product.farm && product.farm === id);

              
              return (
                <TouchableWithoutFeedback 
                  key={product.id} 
                  onPress={() => toggleProduct(product.id)}
                >
                  <View style={styles.productCheckbox}>
                    <View style={[
                      styles.checkbox, 
                      isProductSelected && styles.checkboxSelected
                    ]}>
                      {isProductSelected && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                    <Text style={styles.productLabel}>{product.name}</Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })
          )}
        </View>


        {error ? <Text style={styles.errorText}>{error}</Text> : null}


        <View style={styles.buttonContainer}>
          {saving ? (
            <Text>Saving...</Text>
          ) : (
          <EditButton action={isEdit ? "Update" : "Create"} item="farm" onPress={() => handleSubmit()} />
          )}
          {isEdit && (
          <DeleteButton item="farm" onPress={handleDelete} />
          )}
          
        </View>
      </ScrollView>
      <NavigationFooter />
    </View>
  );
};

export default FarmCreateScreen;