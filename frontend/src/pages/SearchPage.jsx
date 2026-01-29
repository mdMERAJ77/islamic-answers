// frontend/src/pages/SearchPage.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Search Results</h1>
        {query && (
          <p className="text-gray-600 mb-6">
            Search query: <span className="font-semibold">"{query}"</span>
          </p>
        )}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800">
            🔧 Search functionality is under development.
          </p>
          <p className="text-yellow-700 text-sm mt-2">
            Coming soon with Quran, Hadith, and Scholar references search.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchPage; // ✅ IMPORTANT: MUST HAVE THIS LINE