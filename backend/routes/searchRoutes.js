import express from 'express';
const router = express.Router();

// Simple working search
router.get('/', (req, res) => {
  const { q } = req.query;
  
  console.log('🔍 Search API called with:', q);
  
  // Mock data for testing
  const mockResults = [
    {
      _id: '1',
      questionEnglish: 'Are women oppressed in Islam?',
      questionHindi: 'क्या इस्लाम में महिलाओं पर अत्याचार होता है?',
      category: 'Social Issues',
      tags: ['women', 'rights', 'gender'],
      createdAt: new Date()
    },
    {
      _id: '2',
      questionEnglish: 'What rights do women have in Islam?',
      questionHindi: 'इस्लाम में महिलाओं के क्या अधिकार हैं?',
      category: 'Social Issues',
      tags: ['women', 'rights', 'marriage'],
      createdAt: new Date()
    }
  ];

  // Filter if query exists
  const results = q ? mockResults.filter(item => 
    item.questionEnglish.toLowerCase().includes(q.toLowerCase()) ||
    item.questionHindi.toLowerCase().includes(q.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(q.toLowerCase()))
  ) : mockResults;

  res.json({
    success: true,
    query: q || '',
    results: results,
    total: results.length,
    message: results.length > 0 ? 'Results found' : 'No results'
  });
});

router.get('/suggestions', (req, res) => {
  res.json({
    suggestions: [
      'women rights',
      'prayer method',
      'ramadan rules',
      'hijab',
      'zakat'
    ]
  });
});

router.get('/popular', (req, res) => {
  res.json({
    popularSearches: [
      { term: 'women rights', count: 150 },
      { term: 'prayer method', count: 120 },
      { term: 'ramadan rules', count: 95 }
    ]
  });
});

export default router;