import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createFarm, updateFarm, getFarm, getMyData, deleteFarm } from '../../scripts/api';
import NavigationHeader from '../../components/header';
import NavigationFooter from '../../components/footer';
import { styles } from '../../styles/nav/farmcreate';

const FarmCreateScreen = () => {
  const { id } = useLocalSearchParams();
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
            description: farm.description || ''
          });

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
      setError('');

      if (isEdit) {
        await updateFarm(id, formData);
      } else {
        await createFarm(formData);
      }

      router.replace('/farm');
    } catch (err) {
      setError('Failed to save farm. Please try again.');
      console.error(err);
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

        {error ? <Text style={styles.errorText}>{error}</Text> : null}


        <View style={styles.buttonContainer}>
            {isEdit && (
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleDelete}
          >
            <Text style={styles.cancelButtonText}>Delete Farm</Text>
          </TouchableOpacity>
            )}

          <TouchableOpacity
            style={[styles.button, styles.submitButton, saving && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>
                {isEdit ? 'Update Farm' : 'Create Farm'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <NavigationFooter />
    </View>
  );
};

export default FarmCreateScreen;