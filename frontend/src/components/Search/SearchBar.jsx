import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const suggestions = [
    "Women Rights in Islam",
    "How to Pray Salah", 
    "Ramadan Rules and Fasting",
    "Importance of Hijab",
    "Zakat Calculation",
    "Marriage in Islam",
    "Halal and Haram Foods",
    "Five Pillars of Islam",
    "Quran Recitation Rules",
    "Salah Timing and Qibla"
  ];

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close suggestions on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    if (onSearch) {
      onSearch(suggestion);
    } else {
      navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    }
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

//   const handleInputBlur = () => {
//     // Small delay to allow click on suggestions
//     setTimeout(() => {
//       setShowSuggestions(false);
//     }, 200);
//   };

  const filteredSuggestions = suggestions.filter(item => 
    query ? item.toLowerCase().includes(query.toLowerCase()) : true
  );

  const styles = {
    searchContainer: {
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
      position: 'relative',
    },
    searchBar: {
      position: 'relative',
      width: '100%',
      marginBottom: '10px',
    },
    searchInputWrapper: {
      display: 'flex',
      border: '2px solid #2ecc71',
      borderRadius: '30px',
      overflow: 'hidden',
      background: 'white',
      width: '100%',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    },
    searchInput: {
      flex: 1,
      padding: '14px 20px',
      border: 'none',
      outline: 'none',
      fontSize: '16px',
      background: 'transparent',
      color: '#333',
      minWidth: 0,
      fontFamily: 'inherit',
    },
    searchButton: {
      background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
      color: 'white',
      border: 'none',
      padding: '0 30px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    searchSuggestions: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      background: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      maxHeight: '350px',
      overflowY: 'auto',
      marginTop: '8px',
      animation: 'fadeIn 0.2s ease',
    },
    suggestionItem: {
      padding: '12px 20px',
      cursor: 'pointer',
      borderBottom: '1px solid #f5f5f5',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      transition: 'all 0.2s ease',
      color: '#333',
    },
    suggestionIcon: {
      color: '#888',
      fontSize: '14px',
      width: '16px',
    },
    closeButton: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#888',
      cursor: 'pointer',
      fontSize: '14px',
      padding: '5px',
      display: showSuggestions ? 'block' : 'none',
    },
  };

  return (
    <div style={styles.searchContainer} ref={searchRef}>
      <div style={styles.searchBar}>
        <div style={styles.searchInputWrapper}>
          <input 
            type="text" 
            style={styles.searchInput} 
            placeholder="Search Islamic Knowledge..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            onKeyPress={handleKeyPress}
          />
          
          {/* Close button inside input */}
          {showSuggestions && (
            <button 
              type="button"
              style={styles.closeButton}
              onClick={() => setShowSuggestions(false)}
              aria-label="Close suggestions"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
          
          <button style={styles.searchButton} onClick={handleSearch} type="button">
            <i className="fas fa-search"></i> Search
          </button>
        </div>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div style={styles.searchSuggestions}>
            <div style={{
              padding: '12px 20px',
              borderBottom: '1px solid #e0e0e0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#f8f9fa',
            }}>
              <small style={{ color: '#666', fontWeight: '500' }}>
                Popular Searches
              </small>
              <button
                onClick={() => setShowSuggestions(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  cursor: 'pointer',
                  fontSize: '12px',
                  padding: '2px 6px',
                }}
                aria-label="Close"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            {filteredSuggestions.slice(0, 8).map((item, index) => (
              <div 
                key={index} 
                style={styles.suggestionItem}
                onClick={() => handleSuggestionClick(item)}
                onMouseDown={(e) => e.preventDefault()} // Prevent blur on click
              >
                <i className="fas fa-search" style={styles.suggestionIcon}></i>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-5px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeOut {
            from {
              opacity: 1;
              transform: translateY(0);
            }
            to {
              opacity: 0;
              transform: translateY(-5px);
            }
          }
          
          .search-input-wrapper:focus-within {
            border-color: #27ae60;
            box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.2);
          }
          
          .search-button:hover {
            background: linear-gradient(135deg, #27ae60, #219653) !important;
            padding: 0 32px !important;
          }
          
          .suggestion-item:hover {
            background: #f8f9fa;
            padding-left: 24px;
            color: #2ecc71;
          }
          
          .suggestion-item:hover .suggestion-icon {
            color: #2ecc71;
          }
          
          /* Close button hover */
          button[aria-label="Close suggestions"]:hover,
          button[aria-label="Close"]:hover {
            color: #e74c3c !important;
            background: #f8f9fa !important;
            border-radius: 4px;
          }
        `}
      </style>
    </div>
  );
};

export default SearchBar;