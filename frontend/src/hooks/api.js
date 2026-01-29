// frontend/src/hooks/api.js - SIMPLE & WORKING
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Simple API utility
export const API = {
  // Get all questions
  getQuestions: async () => {
    try {
      console.log('📡 Fetching questions from:', `${API_BASE_URL}/questions`);
      const response = await axios.get(`${API_BASE_URL}/questions`);
      console.log('✅ API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching questions:', error);
      throw error;
    }
  },

  // Get single question
  getQuestion: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/questions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching question:', error);
      throw error;
    }
  },

  // Search questions
  searchQuestions: async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching questions:', error);
      throw error;
    }
  },

  // Submit question
  submitQuestion: async (questionData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/questions`, questionData);
      return response.data;
    } catch (error) {
      console.error('Error submitting question:', error);
      throw error;
    }
  }
};

export default API;