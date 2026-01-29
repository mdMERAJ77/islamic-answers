// frontend/src/components/Search/SearchBar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ variant = "default" }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const inputClass =
    variant === "hero"
      ? "px-6 py-4 text-lg rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 flex-1"
      : "px-4 py-2 rounded-l focus:outline-none focus:ring-1 focus:ring-green-500 flex-1 border-2";

  const buttonClass =
    variant === "hero"
      ? "px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg rounded-r-lg transition"
      : "px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-r transition";

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex">
        <input
          type="text"
          placeholder="Search Islamic questions (e.g., women rights, prayer, hijab)..."
          className={inputClass}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className={buttonClass}>
          {variant === "hero" ? "🔍 Search" : "🔍"}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
