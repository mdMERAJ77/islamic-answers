const API_URL = 'https://islamic-answers-backend.onrender.com';

// Search functions
export const searchQuestions = async (query, category = 'all', page = 1) => {
  try {
    const response = await fetch(
      `${API_URL}/api/search?q=${encodeURIComponent(query)}&category=${category}&page=${page}`
    );
    return await response.json();
  } catch (error) {
    console.error('Search API error:', error);
    return { success: false, results: [] };
  }
};

export const getSearchSuggestions = async (query) => {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(`${API_URL}/api/search/suggestions?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.suggestions || [];
  } catch (error) {
    console.error('Suggestions error:', error);
    return [];
  }
};

// Existing functions
export const fetchQuestions = async () => {
  try {
    const response = await fetch(`${API_URL}/api/questions`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};

export const submitQuestion = async (questionData) => {
  try {
    const response = await fetch(`${API_URL}/api/user-questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questionData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error submitting question:', error);
    return { success: false, error: 'Failed to submit question' };
  }
};

// ✅ ADD THESE LINES - THIS IS THE FIX
export const API = {
  searchQuestions,
  getSearchSuggestions,
  fetchQuestions,
  submitQuestion,
  URL: API_URL
};