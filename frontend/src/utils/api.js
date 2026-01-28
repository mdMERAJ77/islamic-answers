// src/utils/api.js
import axios from 'axios';

// Base URL - एक ही जगह manage
const API_BASE = 'https://islamic-answers-backend.onrender.com/api';

// Main axios instance
export const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000, // 15 seconds timeout
  withCredentials: true, // Cookies के लिए जरूरी
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Cache system for GET requests
const cache = new Map();
const CACHE_TIME = 2 * 60 * 1000; // 2 minutes

// Smart fetch with cache
export const smartFetch = async (url, options = {}) => {
  const cacheKey = `${url}-${JSON.stringify(options)}`;
  
  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp) < CACHE_TIME) {
    console.log('📦 Serving from cache:', url);
    return cached.data;
  }
  
  try {
    console.log('🌐 Fetching from network:', url);
    const response = await api.get(url, options);
    
    // Cache the response
    cache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now()
    });
    
    return response.data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

// Clear cache function
export const clearCache = () => {
  cache.clear();
  console.log('🧹 Cache cleared');
};

// Helper for common endpoints
export const API = {
  // Auth endpoints
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  checkAuth: () => api.get('/auth/check'),
  
  // Questions endpoints
  getQuestions: () => smartFetch('/questions'),
  getQuestion: (id) => smartFetch(`/questions/${id}`),
  addQuestion: (data) => api.post('/questions', data),
  
  // User questions
  getUserQuestions: () => smartFetch('/user-questions'),
  submitUserQuestion: (data) => api.post('/user-questions', data)
};

// Request interceptor (adds token if exists)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handles errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto logout on 401
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/admin';
    }
    
    // Better error messages
    const errorMessage = error.response?.data?.error || 
                        error.message || 
                        'Network error occurred';
    
    console.error('API Response Error:', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);