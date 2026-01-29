// frontend/src/components/Search/SearchBar.jsx - HERO WIDTH REDUCED
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ variant = "default" }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  // Different styles for different placements
  const getStyles = () => {
    switch (variant) {
      case "hero":
        return {
          container: "max-w-xl mx-auto shadow-xl", // Changed from max-w-2xl to max-w-xl
          input: "px-6 py-4 text-lg rounded-l-xl focus:outline-none focus:ring-3 focus:ring-green-400 focus:border-transparent flex-1 bg-white text-gray-900",
          button: "px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-lg rounded-r-xl transition-all duration-300 flex items-center gap-2"
        };
      
      case "navbar":
        return {
          container: "w-full max-w-md", // Navbar width limited
          input: "px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent flex-1 bg-white/95 text-gray-900 placeholder-gray-500 border border-gray-300",
          button: "px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-r-lg transition-all duration-200 flex items-center gap-2 font-medium"
        };
      
      default:
        return {
          container: "w-full",
          input: "px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent flex-1 bg-white border border-gray-300 text-gray-900",
          button: "px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-r-lg transition-colors"
        };
    }
  };

  const styles = getStyles();
  const placeholder = variant === "hero" 
    ? "Search Islamic questions (women rights, prayer, hijab, zakat, ramadan)..."
    : "Search questions...";

  return (
    <form onSubmit={handleSearch} className={styles.container}>
      <div className="flex items-stretch shadow-md rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder={placeholder}
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button 
          type="submit" 
          className={styles.button}
        >
          <span>🔍</span>
          {variant === "hero" && <span>Search</span>}
          {variant === "navbar" && <span className="hidden sm:inline">Search</span>}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;