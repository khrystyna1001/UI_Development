import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';


const API_BASE_URL = 'http://localhost';


const getToken = async () => {
    const tokenKey = 'userToken'; 
    try {
        if (Platform.OS === 'web') {
            const token = window.localStorage.getItem(tokenKey);
            return token;
        } else {
            const token = await SecureStore.getItemAsync(tokenKey);
            return token;
        }
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
export const createBlogPost = (data) => apiFetch(`/app/blog/`, { method: 'POST', body: JSON.stringify(data) });
export const updateBlogPost = (id, data) => apiFetch(`/app/blog/${id}/`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteBlogPost = (id) => apiFetch(`/app/blog/${id}/`, { method: 'DELETE' });

// Product
export const getProducts = () => apiFetch(`/app/products/`);
export const getProduct = (id) => apiFetch(`/app/products/${id}/`);
export const createProduct = (data) => apiFetch(`/app/products/`, { method: 'POST', body: JSON.stringify(data) });
export const updateProduct = (id, data) => apiFetch(`/app/products/${id}/`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteProduct = (id) => apiFetch(`/app/products/${id}/`, { method: 'DELETE' });

// Farm
export const getFarms = () => apiFetch(`/app/farms/`);
export const getFarm = (id) => apiFetch(`/app/farms/${id}/`);
export const createFarm = (data) => apiFetch(`/app/farms/`, { method: 'POST', body: JSON.stringify(data) });
export const updateFarm = (id, data) => apiFetch(`/app/farms/${id}/`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteFarm = (id) => apiFetch(`/app/farms/${id}/`, { method: 'DELETE' });

// User
export const getUsers = () => apiFetch(`/app/users/`);
export const getUser = (id) => apiFetch(`/app/users/${id}/`);
export const createUser = (data) => apiFetch(`/app/users/`, { method: 'POST', body: JSON.stringify(data) });
export const updateUser = (id, data) => apiFetch(`/app/users/${id}/`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteUser = (id) => apiFetch(`/app/users/${id}/`, { method: 'DELETE' });
export const getMyData = () => apiFetch(`/api/mydata/`);

// Gallery
export const getGalleryImages = () => apiFetch(`/app/gallery/`);
export const getGalleryImage = (id) => apiFetch(`/app/gallery/${id}/`);
export const createGalleryImage = (data) => apiFetch(`/app/gallery/`, { method: 'POST', body: JSON.stringify(data) });
export const updateGalleryImage = (id, data) => apiFetch(`/app/gallery/${id}/`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteGalleryImage = (id) => apiFetch(`/app/gallery/${id}/`, { method: 'DELETE' });

// Review
export const getReviews = () => apiFetch(`/app/reviews/`);
export const getReview = (id) => apiFetch(`/app/reviews/${id}/`);
export const createReview = (data) => apiFetch(`/app/reviews/`, { method: 'POST', body: JSON.stringify(data) });
export const updateReview = (id, data) => apiFetch(`/app/reviews/${id}/`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteReview = (id) => apiFetch(`/app/reviews/${id}/`, { method: 'DELETE' });

// Chat
export const getChats = () => apiFetch(`/app/chats/`);
export const getChat = (id) => apiFetch(`/app/chats/${id}/`);
export const createChat = (data) => apiFetch(`/app/chats/`, { method: 'POST', body: JSON.stringify(data) });
export const updateChat = (id, data) => apiFetch(`/app/chats/${id}/`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteChat = (id) => apiFetch(`/app/chats/${id}/`, { method: 'DELETE' });

// Message
export const getMessages = () => apiFetch(`/app/messages/`);
export const getMessage = (id) => apiFetch(`/app/messages/${id}/`);
export const createMessage = (data) => apiFetch(`/app/messages/`, { method: 'POST', body: JSON.stringify(data) });
export const updateMessage = (id, data) => apiFetch(`/app/messages/${id}/`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteMessage = (id) => apiFetch(`/app/messages/${id}/`, { method: 'DELETE' });

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

export const signup = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/signup/`, {
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
            throw new Error(errorData.detail || 'Sign up failed');
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
        console.error('Sign up API error:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const token = await getToken();
        const response = await fetch(`${API_BASE_URL}/api/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || 'Logout failed');
        }

        await clearToken();

        return true
    } catch (error) {
        console.error('Logout API error:', error);
        throw error;
    }
};
