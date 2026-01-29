// backend/routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const searchMiddleware = require('../middleware/searchMiddleware');

// Search endpoints
router.get('/search', searchMiddleware.validateSearch, searchController.searchQuestions);
router.get('/search/suggestions', searchController.getSuggestions);
router.get('/search/popular', searchController.getPopularSearches);
router.get('/search/categories', searchController.getSearchCategories);

module.exports = router;