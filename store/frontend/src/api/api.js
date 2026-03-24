import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: { 'Content-Type': 'application/json' },
});

// Auto-attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ── Products ─────────────────────────────────────── */
export const getProducts = () => API.get('/products');
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post('/products', data);

/* ── Uploads ──────────────────────────────────────── */
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return API.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

/* ── Orders ───────────────────────────────────────── */
export const createOrder = (data) => API.post('/orders', data);
export const getOrders = (userId) => API.get(`/orders?user_id=${userId}`);
export const getOrder = (id) => API.get(`/orders/${id}`);

/* ── Admin Orders ─────────────────────────────────── */
export const getAllOrders = () => API.get('/orders');
export const updateOrderStatus = (id, status) => API.patch(`/orders/${id}/status?new_status=${status}`);

/* ── Auth ─────────────────────────────────────────── */
export const signup = (data) => API.post('/auth/signup', data);
export const signin = (data) => API.post('/auth/signin', data);
export const signout = () => API.post('/auth/signout');

export default API;
