// src/components/Search/SearchBar.jsx - Enhanced
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ variant = 'default' }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const containerClass = variant === 'hero' 
    ? "max-w-3xl mx-auto shadow-lg"
    : "";

  return (
    <div className={containerClass}>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search questions about Islam (women rights, prayer, hijab, etc.)"
            className="w-full px-6 py-4 border-2 border-green-300 rounded-full focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition flex items-center gap-2"
          >
            <span>🔍</span>
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;