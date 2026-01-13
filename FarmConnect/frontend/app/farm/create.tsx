import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import { 
  createFarm, 
  updateFarm, 
  getFarm, 
  deleteFarm, 
  getProducts, 
  getMyData 
} from '../../scripts/api';
import NavigationHeader from '../../components/header';
import NavigationFooter from '../../components/footer';
import { DeleteButton } from '../../components/deleteButton';
import { EditButton } from '../../components/editButton';
import { styles } from '../../styles/nav/farmcreate';
import LoadingSpinner from '@/components/LoadingSpinner';

const FarmCreateScreen = () => {
  const { id } = useLocalSearchParams();
  const farmId = id ? String(id) : null;
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [myData, setMyData] = useState(null);
  const isEdit = !!farmId;
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    user: null,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && farmId) {
      const fetchFarm = async () => {
        try {
          setLoading(true);
          const [farm, user] = await Promise.all([getFarm(farmId), getMyData()]);
          
          setMyData(user);
          setFormData({
            name: farm.name || '',
            location: farm.location || '',
            description: farm.description || '',
            user: user.id || null,
          });

          if (farm.products && Array.isArray(farm.products)) {
            setSelectedProducts(farm.products.map(Number)); 
          } 
          else if (farm.products && Array.isArray(farm.products) && farm.products[0]?.id) {
             setSelectedProducts(farm.products.map(p => Number(p.id))); 
          }

        } catch (err) {
          setError('Failed to load farm data or user data');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchFarm();
    } else {
        const fetchUserData = async () => {
            try {
                const user = await getMyData();
                setMyData(user);
                setFormData(prev => ({ ...prev, user: user.id || null }));
            } catch (err) {
                console.error('Error fetching user data for new farm:', err);
            }
        };
        fetchUserData();
    }
  }, [farmId, isEdit]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        if (products && Array.isArray(products)) {
            setAllProducts(products.map(p => ({ ...p, id: Number(p.id) })));
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products list.');
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleProduct = (productId: number) => {
    setSelectedProducts(prev => {
      const current = Array.isArray(prev) ? prev : [];
      
      return current.includes(productId)
        ? current.filter(id => id !== productId)
        : [...current, productId];
    });
  };

  const handleDelete = async () => {
    try {
      if (farmId) {
        await deleteFarm(farmId);
      }
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
    if (!myData || !myData.id) {
        setError('User data not loaded. Please try refreshing.');
        return;
    }

    try {
      setSaving(true);
      const validProductIds = Array.from(new Set(selectedProducts.map(Number))).filter(id => !isNaN(id));
      
      const data = {
        ...formData,
        products: validProductIds,
        user: myData.id,
      };

      if (isEdit && farmId) {
        await updateFarm(farmId, data);
        router.replace('/(nav)/farm');
      } else {
        const newFarm = await createFarm(data);
        router.replace(`/farm/${newFarm.id}`);
      }
    } catch (error) {
      setError('Failed to save farm. Check server logs.');
      console.error('Error saving farm:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <LoadingSpinner />
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
        
        {/* Farm Inputs */}
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
          <Text style={styles.subLabel}>Select products managed by this farm.</Text>
          <View style={styles.productsGrid}>
          {loadingProducts ? (
            <LoadingSpinner />
          ) : (
            allProducts.map((product) => {
              const isProductSelected = selectedProducts.includes(product.id);

              return (
                <View key={product.id} style={styles.productItem}>
                <TouchableWithoutFeedback 
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
                </View>
              );
            })
          )}
          </View>
        </View>


        {error ? <Text style={styles.errorText}>{error}</Text> : null}


        <View style={styles.buttonContainer}>
          {saving ? (
            <Text>Saving...</Text>
          ) : (
          <EditButton action={isEdit ? "Update" : "Create"} item="farm" onPress={handleSubmit} />
          )}
          {isEdit && farmId && (
          <DeleteButton item="farm" onPress={handleDelete} />
          )}
          
        </View>
      </ScrollView>
      <NavigationFooter />
    </View>
  );
};

export default FarmCreateScreen;