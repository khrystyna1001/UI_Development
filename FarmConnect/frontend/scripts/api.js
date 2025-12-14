import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';


const API_BASE_URL = 'http://localhost';


export const setToken = async (key, value) => {
    const tokenKey = key; 
    try {
        if (Platform.OS === 'web') {
            window.localStorage.setItem(tokenKey, value);
        } else {
            await SecureStore.setItemAsync(tokenKey, value);
        }
    } catch (error) {
        console.error(`Error storing token ${key}:`, error);
    }
};

const getToken = async (key = 'accessToken') => {
    try {
        if (Platform.OS === 'web') {
            const token = window.localStorage.getItem(key);
            return token;
        } else {
            const token = await SecureStore.getItemAsync(key);
            return token;
        }
    } catch (error) {
        console.error(`Error retrieving token ${key}:`, error);
        return null;
    }
};

export const clearToken = async () => {
    if (Platform.OS === 'web') {
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('refreshToken');
    } else {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
    }
}

const refreshAccessToken = async () => {
  try {
    const refreshToken = await getToken('refreshToken');
    if (!refreshToken) {
      await clearToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('No refresh token available. User logged out.');
    }
    
    const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
        await clearToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      throw new Error('Failed to refresh token. User logged out.');
    }
    
    const data = await response.json();
    await setToken('accessToken', data.access);
    return data.access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const executeFetch = async (accessToken) => {
      const headers = {
          'Content-Type': 'application/json',
          ...options.headers,
      };

      if (accessToken) {
          headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const finalOptions = {
          ...options,
          headers,
      };

      return await fetch(url, finalOptions);
  };
  
  let currentToken = await getToken();
  let response = await executeFetch(currentToken);

  if (response.status === 401) {
    console.warn('Access token expired. Attempting refresh...');
    
    try {
      const newToken = await refreshAccessToken();
      
      response = await executeFetch(newToken);
      
    } catch (error) {
      console.error('Failed to retry request after refresh:', error);
      throw error;
    }
  }

  if (!response.ok) {
    let errorDetail;
    try {
      errorDetail = (await response.json()).detail || response.statusText;
    } catch {
      errorDetail = await response.text().catch(() => response.statusText);
    }
    throw new Error(`API call failed with status ${response.status}: ${errorDetail}`);
  }

  const data = await response.json();
  return data;
};

// Blog
export const getBlogPosts = async () => apiFetch(`/app/blog/`);
export const getBlogPost = async (id) => apiFetch(`/app/blog/${id}/`);
export const createBlogPost = async (data) => apiFetch(`/app/blog/`, { method: 'POST', body: JSON.stringify(data) });
export const updateBlogPost = async (id, data) => apiFetch(`/app/blog/${id}/`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteBlogPost = async (id) => apiFetch(`/app/blog/${id}/`, { method: 'DELETE' });

// Product
export const getProducts = async () => apiFetch(`/app/products/`);
export const getProduct = async (id) => apiFetch(`/app/products/${id}/`);
export const createProduct = async (data) => apiFetch(`/app/products/`, { method: 'POST', body: JSON.stringify(data) });
export const updateProduct = async (id, data) => apiFetch(`/app/products/${id}/`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteProduct = async (id) => apiFetch(`/app/products/${id}/`, { method: 'DELETE' });

// Farm
export const getFarms = async () => apiFetch(`/app/farms/`);
export const getFarm = async (id) => apiFetch(`/app/farms/${id}/`);
export const createFarm = async (data) => apiFetch(`/app/farms/`, { method: 'POST', body: JSON.stringify(data) });
export const updateFarm = async (id, data) => apiFetch(`/app/farms/${id}/`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteFarm = async (id) => apiFetch(`/app/farms/${id}/`, { method: 'DELETE' });

// User
export const getUsers = async () => apiFetch(`/app/users/`);
export const getUser = async (id) => apiFetch(`/app/users/${id}/`);
export const createUser = async (data) => apiFetch(`/app/users/`, { method: 'POST', body: JSON.stringify(data) });
export const updateUser = async (id, data) => apiFetch(`/app/users/${id}/`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteUser = async (id) => apiFetch(`/app/users/${id}/`, { method: 'DELETE' });
export const getMyData = async () => apiFetch(`/api/mydata/`);

// Gallery
export const getGalleryImages = async () => apiFetch(`/app/gallery/`);
export const getGalleryImage = async (id) => apiFetch(`/app/gallery/${id}/`);
export const createGalleryImage = async (data) => apiFetch(`/app/gallery/`, { method: 'POST', body: JSON.stringify(data) });
export const updateGalleryImage = async (id, data) => apiFetch(`/app/gallery/${id}/`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteGalleryImage = async (id) => apiFetch(`/app/gallery/${id}/`, { method: 'DELETE' });

// Review
export const getReviews = async () => apiFetch(`/app/reviews/`);
export const getReview = async (id) => apiFetch(`/app/reviews/${id}/`);
export const createReview = async (data) => apiFetch(`/app/reviews/`, { method: 'POST', body: JSON.stringify(data) });
export const updateReview = async (id, data) => apiFetch(`/app/reviews/${id}/`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteReview = async (id) => apiFetch(`/app/reviews/${id}/`, { method: 'DELETE' });

// Chat
export const getChats = async () => apiFetch(`/app/chats/`);
export const getChat = async (id) => apiFetch(`/app/chats/${id}/`);
export const createChat = async (data) => apiFetch(`/app/chats/`, { method: 'POST', body: JSON.stringify(data) });
export const updateChat = async (id, data) => apiFetch(`/app/chats/${id}/`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteChat = async (id) => apiFetch(`/app/chats/${id}/`, { method: 'DELETE' });

// Message
export const getMessages = async () => apiFetch(`/app/messages/`);
export const getMessage = async (id) => apiFetch(`/app/messages/${id}/`);
export const createMessage = async (data) => apiFetch(`/app/messages/`, { method: 'POST', body: JSON.stringify(data) });
export const updateMessage = async (id, data) => apiFetch(`/app/messages/${id}/`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteMessage = async (id) => apiFetch(`/app/messages/${id}/`, { method: 'DELETE' });

// Favorite Blogs
export const getFavorites = async () => apiFetch(`/app/favorites/`);
export const toggleFavorite = async (blog_id) => apiFetch(`/app/favorites/toggle/`, { method: 'POST', body: JSON.stringify({ blog_id }) });

// Cart
export const getCart = async () => apiFetch(`/app/carts/`);
export const addToCart = async (product_id, quantity = 1) => apiFetch(`/app/carts/add/`, {method: 'POST',body: JSON.stringify({ product_id, quantity })});
export const removeFromCart = async (product_id) => apiFetch(`/app/carts/remove/`, { method: 'POST', body: JSON.stringify({ product_id }) });
export const checkout = async () => apiFetch(`/app/carts/checkout/`, { method: 'POST' });

// Authentication
// Login
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dj-rest-auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      const errorMessage = data.detail || 
                           data.non_field_errors?.[0] || 
                           'Login failed. Please check your credentials.';
      throw new Error(errorMessage);
    }
    
    const { access, refresh } = data;
    
    if (access) {
      await setToken('accessToken', access);
    }
    
    if (refresh) {
      await setToken('refreshToken', refresh);
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Signup
export const signup = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dj-rest-auth/registration/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password1: data.password1,
        password2: data.password2,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = Object.values(errorData).flat().join(' ') || 'Signup failed. Please try again.';
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const logout = async () => {
    try {
        const refreshToken = await getToken('refreshToken');
        const accessToken = await getToken('accessToken');
        
        if (!refreshToken) {
            await clearToken();
            return true;
        }

        const response = await fetch(`${API_BASE_URL}/api/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        await clearToken();

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.warn('Logout warning:', errorData.detail || 'Logout request failed but tokens have been cleared');
        }

        return true;
    } catch (error) {
        console.error('Logout API error:', error);
        await clearToken();
        throw error;
    }
};