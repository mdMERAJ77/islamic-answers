// backend/controllers/searchController.js
const Question = require('../models/Question');
const SearchAnalytics = require('../models/SearchAnalytics');

exports.searchQuestions = async (req, res) => {
  try {
    const { q, category, language, sort = 'relevance' } = req.query;
    
    // Log search for analytics
    await SearchAnalytics.create({
      query: q,
      timestamp: new Date(),
      userAgent: req.headers['user-agent']
    });

    // Build search query
    let searchQuery = {};
    
    if (q) {
      searchQuery.$or = [
        { questionEnglish: { $regex: q, $options: 'i' } },
        { questionHindi: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } },
        { 'answers.english': { $regex: q, $options: 'i' } },
        { 'answers.hindi': { $regex: q, $options: 'i' } }
      ];
    }
    
    if (category) {
      searchQuery.category = category;
    }

    // Execute search
    const questions = await Question.find(searchQuery)
      .sort(getSortOption(sort))
      .limit(50);

    res.json({
      query: q,
      count: questions.length,
      results: questions
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSuggestions = async (req, res) => {
  try {
    const { q } = req.query;
    
    const suggestions = await Question.aggregate([
      {
        $match: {
          $or: [
            { questionEnglish: { $regex: q, $options: 'i' } },
            { questionHindi: { $regex: q, $options: 'i' } }
          ]
        }
      },
      { $limit: 5 },
      {
        $project: {
          suggestion: '$questionEnglish',
          hindi: '$questionHindi',
          _id: 0
        }
      }
    ]);

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};