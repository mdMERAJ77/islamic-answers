// backend/routes/searchRoutes.js - UPDATED WITH REAL DATABASE
import express from 'express';
const router = express.Router();
import Question from '../models/Question.js'; // Import Question model

// ✅ REAL SEARCH - NO MOCK DATA
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    
    console.log('🔍 Real Search API called with query:', q);
    
    if (!q || q.trim() === '') {
      return res.json({
        success: true,
        query: '',
        results: [],
        total: 0,
        message: 'Please enter a search query'
      });
    }
    
    // ✅ REAL DATABASE QUERY
    const questions = await Question.find({
      $or: [
        { question_en: { $regex: q, $options: 'i' } },
        { question_hi: { $regex: q, $options: 'i' } },
        { answer_en: { $regex: q, $options: 'i' } },
        { answer_hi: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    })
    .select('question_en question_hi answer_en answer_hi tags category references views createdAt')
    .sort({ views: -1, createdAt: -1 })
    .limit(50);
    
    // Format response to match frontend expectations
    const formattedResults = questions.map(question => ({
      _id: question._id,
      question_en: question.question_en,
      question_hi: question.question_hi,
      answer_en: question.answer_en,
      answer_hi: question.answer_hi,
      tags: question.tags || [],
      category: question.category || '',
      views: question.views || 0,
      createdAt: question.createdAt,
      // Include only first 100 chars of answer for preview
      answer_preview: question.answer_en ? 
        question.answer_en.substring(0, 100) + (question.answer_en.length > 100 ? '...' : '') : ''
    }));
    
    console.log(`✅ Found ${formattedResults.length} real questions in database`);
    
    res.json({
      success: true,
      query: q,
      results: formattedResults,
      total: formattedResults.length,
      message: formattedResults.length > 0 ? 
        `${formattedResults.length} result(s) found` : 
        'No results found'
    });
    
  } catch (error) {
    console.error('❌ Search API error:', error);
    res.status(500).json({
      success: false,
      error: 'Search failed',
      message: error.message
    });
  }
});

// ✅ REAL SUGGESTIONS
router.get('/suggestions', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.json({
        suggestions: []
      });
    }
    
    const suggestions = await Question.find({
      $or: [
        { question_en: { $regex: `^${q}`, $options: 'i' } },
        { question_hi: { $regex: q, $options: 'i' } }
      ]
    })
    .select('question_en question_hi')
    .limit(10);
    
    const formattedSuggestions = suggestions.map(item => 
      item.question_en || item.question_hi
    );
    
    // Add some common suggestions if database doesn't have enough
    const commonSuggestions = [
      'women rights',
      'prayer method', 
      'ramadan rules',
      'hijab',
      'zakat',
      'halal food',
      'marriage in islam',
      'inheritance laws'
    ].filter(term => 
      term.toLowerCase().includes(q.toLowerCase()) ||
      q.toLowerCase().includes(term.split(' ')[0].toLowerCase())
    );
    
    const allSuggestions = [...new Set([...formattedSuggestions, ...commonSuggestions.slice(0, 5)])];
    
    res.json({
      suggestions: allSuggestions.slice(0, 8)
    });
    
  } catch (error) {
    console.error('Suggestions error:', error);
    res.json({
      suggestions: []
    });
  }
});

// ✅ REAL POPULAR SEARCHES (can be based on analytics or static)
router.get('/popular', (req, res) => {
  // For now, return static popular searches
  // Later, you can implement based on search analytics
  res.json({
    popularSearches: [
      { term: 'women rights', count: 150 },
      { term: 'prayer method', count: 120 },
      { term: 'ramadan rules', count: 95 },
      { term: 'hijab', count: 80 },
      { term: 'zakat', count: 75 }
    ]
  });
});

export default router;