// backend/controllers/searchController.js
const Question = require('../models/Question');

exports.searchQuestions = async (req, res) => {
  try {
    const { q, category = 'all', page = 1, limit = 10 } = req.query;
    
    if (!q || q.trim() === '') {
      return res.json({
        success: true,
        results: [],
        message: 'Please enter search query'
      });
    }

    const searchQuery = {
      $or: [
        { questionEnglish: { $regex: q, $options: 'i' } },
        { questionHindi: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } },
        { 'answers.english': { $regex: q, $options: 'i' } },
        { 'answers.hindi': { $regex: q, $options: 'i' } }
      ]
    };

    if (category !== 'all') {
      searchQuery.category = category;
    }

    const skip = (page - 1) * limit;
    
    const [questions, total] = await Promise.all([
      Question.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Question.countDocuments(searchQuery)
    ]);

    res.json({
      success: true,
      query: q,
      results: questions,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      hasMore: (page * limit) < total
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Search failed', 
      error: error.message 
    });
  }
};

exports.getSuggestions = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.json({ suggestions: [] });
    }

    const suggestions = await Question.aggregate([
      {
        $match: {
          $or: [
            { questionEnglish: { $regex: q, $options: 'i' } },
            { questionHindi: { $regex: q, $options: 'i' } }
          ]
        }
      },
      { $limit: 8 },
      {
        $project: {
          _id: 1,
          questionEnglish: 1,
          questionHindi: 1,
          category: 1
        }
      }
    ]);

    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPopularSearches = async (req, res) => {
  const popularSearches = [
    { term: 'women rights', count: 150 },
    { term: 'prayer method', count: 120 },
    { term: 'ramadan rules', count: 95 },
    { term: 'hijab', count: 80 },
    { term: 'zakat', count: 70 },
    { term: 'marriage in islam', count: 65 },
    { term: 'halal food', count: 60 },
    { term: 'islam and science', count: 55 }
  ];
  
  res.json({ popularSearches });
};

exports.getSearchCategories = async (req, res) => {
  try {
    const categories = await Question.distinct('category');
    res.json({ categories: categories.filter(c => c) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};