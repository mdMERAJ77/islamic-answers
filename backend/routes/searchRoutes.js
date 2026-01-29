// backend/routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const searchMiddleware = require('../middleware/searchMiddleware');

router.get('/', searchMiddleware.validateSearch, searchController.searchQuestions);
router.get('/suggestions', searchController.getSuggestions);
router.get('/popular', searchController.getPopularSearches);
router.get('/categories', searchController.getSearchCategories);

module.exports = router;