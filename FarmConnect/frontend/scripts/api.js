import SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';


const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://app-service:8000' 
  : 'http://192.168.1.3:8000';


const getToken = async () => {
    const tokenKey = 'userToken'; 
    try {
        if (Platform.OS === 'web') {
            const token = window.localStorage.getItem(tokenKey);
            return token;
        }
        const token = await SecureStore.getItemAsync(tokenKey);
        return token;
        
    } catch (error) {
        console.error("Error retrieving token:", error);
        return null;
    }
};

export const clearToken = async () => {
    if (Platform.OS === 'web') {
        window.localStorage.removeItem('userToken');
    } else {
        await SecureStore.deleteItemAsync('userToken');
    }
}

const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
      'Content-Type': 'application/json',
  };

  const token = await getToken();

  if (token) {
      headers['Authorization'] = `Token ${token}`;
  }

  const finalOptions = {
      ...options,
      headers: {
          ...headers,
          ...options.headers,
      }
  };

  try {
    const response = await fetch(url, finalOptions);

    if (!response.ok) {
      let errorDetail = await response.text().catch(() => response.statusText);
      throw new Error(`API call failed with status ${response.status}: ${errorDetail}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};

// Blog
export const getBlogPosts = () => apiFetch(`/app/blog/`);
export const getBlogPost = (id) => apiFetch(`/app/blog/${id}/`);

// Product
export const getProducts = () => apiFetch(`/app/products/`);
export const getProduct = (id) => apiFetch(`/app/products/${id}/`);

// Farm
export const getFarms = () => apiFetch(`/app/farms/`);
export const getFarm = (id) => apiFetch(`/app/farms/${id}/`);

// User
// NOTE: These still target the admin path as per your original file
export const getUsers = () => apiFetch(`/admin/auth/user/`);
export const getUser = (id) => apiFetch(`/admin/auth/user/${id}/`);

// Gallery
export const getGalleries = () => apiFetch(`/app/gallery/`);
export const getGallery = (id) => apiFetch(`/app/gallery/${id}/`);

// Review
export const getReviews = () => apiFetch(`/app/reviews/`);
export const getReview = (id) => apiFetch(`/app/reviews/${id}/`);

// Message
export const getMessages = () => apiFetch(`/app/messages/`);
export const getMessage = (id) => apiFetch(`/app/messages/${id}/`);

// Authentication

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || 'Login failed');
        }

        const data = await response.json();

        if (data.token) {
            if (Platform.OS === 'web') {
                window.localStorage.setItem('userToken', data.token);
            } else {
                await SecureStore.setItemAsync('userToken', data.token);
            }
        }

        return data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
};
