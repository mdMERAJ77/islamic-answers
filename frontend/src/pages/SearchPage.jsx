import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const API_URL = import.meta.env.VITE_API_URL || 'https://islamic-answers-backend.onrender.com';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ FIX: Wrap fetchSearchResults in useCallback
  const fetchSearchResults = useCallback(async () => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `${API_URL}/api/search?q=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      
      if (data.success) {
        setResults(data.results || []);
      } else {
        setError(data.message || 'Search failed');
        setResults([]);
      }
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
      setResults([]);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, [query]); // ✅ Add query as dependency

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]); // ✅ Now fetchSearchResults is stable

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Search Islamic Answers
        </h1>
        
        {query && (
          <div className="mb-6 p-4 bg-white rounded-lg border shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <span className="text-gray-600">Search results for: </span>
                <span className="font-semibold text-green-600">"{query}"</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{results.length} results found</span>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Search Results */}
      {results.length === 0 && query && !loading ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No results found
          </h3>
          <p className="text-gray-500 mb-6">
            No Islamic questions found for "{query}"
          </p>
          <div className="space-y-3 max-w-md mx-auto">
            <p className="text-sm text-gray-500">Try searching for:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['women rights', 'prayer', 'ramadan', 'hijab', 'zakat'].map(term => (
                <Link
                  key={term}
                  to={`/search?q=${term}`}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:gap-6">
          {results.map((question) => (
            <div 
              key={question._id} 
              className="bg-white rounded-xl border border-gray-200 p-5 md:p-6 hover:border-green-300 transition-colors shadow-sm"
            >
              <Link to={`/question/${question._id}`} className="block">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-green-600">
                  {question.questionEnglish}
                </h3>
              </Link>
              
              {question.questionHindi && (
                <p className="text-gray-600 mb-3">
                  {question.questionHindi}
                </p>
              )}
              
              <div className="flex flex-wrap gap-2 mt-4">
                {question.category && (
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                    {question.category}
                  </span>
                )}
                {question.tags && question.tags.slice(0, 3).map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link 
                  to={`/question/${question._id}`}
                  className="text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-1"
                >
                  Read Full Answer with Quran & Hadith references →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Query State */}
      {!query && !loading && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Enter a search query
          </h3>
          <p className="text-gray-500 mb-6">
            Search for Islamic questions using keywords
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['women rights', 'prayer method', 'ramadan rules', 'hijab meaning'].map(term => (
              <Link
                key={term}
                to={`/search?q=${term}`}
                className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;