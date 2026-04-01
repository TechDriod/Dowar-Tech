import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const getProducts = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value);
    }
  });
  return api.get(`/products?${params.toString()}`);
};

export const getProduct = (id) => api.get(`/products/${id}`);

export const searchProducts = (query) => api.get(`/products?search=${encodeURIComponent(query)}`);

export const getReviews = (productId) => api.get(`/reviews/${productId}`);
export const createReview = (data) => api.post('/reviews', data);
export const updateReview = (id, data) => api.put(`/reviews/${id}`, data);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

export const getCart = () => api.get('/cart');
export const addToCartAPI = (productId, qty) => api.post('/cart/add', { productId, qty });
export const updateCartItemAPI = (itemId, qty) => api.put(`/cart/${itemId}`, { qty });
export const removeFromCartAPI = (itemId) => api.delete(`/cart/${itemId}`);
export const clearCartAPI = () => api.delete('/cart/clear');

export const createOrder = (orderData) => api.post('/orders', orderData);
export const getMyOrders = () => api.get('/orders');
export const getOrder = (id) => api.get(`/orders/${id}`);

export const getUserProfile = () => api.get('/users/profile');
export const updateUserProfile = (data) => api.put('/users/profile', data);

export default api;
