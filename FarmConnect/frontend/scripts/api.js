const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://app-service:8000' 
  : 'http://192.168.1.3:8000';

//Blog

export const getBlogPosts = async () => {
    const response = await fetch(`${API_BASE_URL}/app/blog/`);
    return response.json();
};

export const getBlogPost = async (id) => {
    const response = await fetch(`${API_BASE_URL}/app/blog/${id}/`);
    return response.json();
};

//Product

export const getProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/app/products/`);
    return response.json();
};

export const getProduct = async (id) => {
    const response = await fetch(`${API_BASE_URL}/app/products/${id}/`);
    return response.json();
};

//Farm

export const getFarms = async () => {
    const response = await fetch(`${API_BASE_URL}/app/farms/`);
    return response.json();
};

export const getFarm = async (id) => {
    const response = await fetch(`${API_BASE_URL}/app/farms/${id}/`);
    return response.json();
};

//User

export const getUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/auth/user/`);
    return response.json();
};

export const getUser = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/auth/user/${id}/`);
    return response.json();
};

//Gallery

export const getGalleries = async () => {
    const response = await fetch(`${API_BASE_URL}/app/gallery/`);
    return response.json();
};

export const getGallery = async (id) => {
    const response = await fetch(`${API_BASE_URL}/app/gallery/${id}/`);
    return response.json();
};

//Review

export const getReviews = async () => {
    const response = await fetch(`${API_BASE_URL}/app/reviews/`);
    return response.json();
};

export const getReview = async (id) => {
    const response = await fetch(`${API_BASE_URL}/app/reviews/${id}/`);
    return response.json();
};

//Message

export const getMessages = async () => {
    const response = await fetch(`${API_BASE_URL}/app/messages/`);
    return response.json();
};

export const getMessage = async (id) => {
    const response = await fetch(`${API_BASE_URL}/app/messages/${id}/`);
    return response.json();
};

