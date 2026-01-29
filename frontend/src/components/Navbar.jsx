import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const closeAllMenus = useCallback(() => {
    setIsMenuOpen(false);
    setShowMobileSearch(false);
  }, []);

  useEffect(() => {
    if (isMenuOpen || showMobileSearch) {
      closeAllMenus();
    }
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      closeAllMenus();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllMenus();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeAllMenus]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const navbar = document.querySelector('.navbar');
      if (navbar && !navbar.contains(e.target)) {
        closeAllMenus();
      }
    };

    if (isMenuOpen || showMobileSearch) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen, showMobileSearch, closeAllMenus]);

  const navLinks = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/questions', label: 'Questions', icon: 'question-circle' },
    { path: '/contact', label: 'Contact', icon: 'envelope' },
    { path: '/donate', label: 'Donate', icon: 'donate' },
  ];

  const desktopNavLinks = [
    ...navLinks,
    { path: '/admin', label: 'Admin', icon: 'user-shield' }
  ];

  return (
    <nav className="navbar" style={styles.navbar}>
      <div className="navbar-container" style={styles.navbarContainer}>
        {/* Logo */}
        <Link 
          to="/" 
          className="navbar-brand" 
          style={styles.navbarBrand}
          onClick={closeAllMenus}
        >
          <div style={styles.logoContainer}>
            <i className="fas fa-mosque" style={styles.logoIcon}></i>
            <span style={styles.logoText}>Islamic Q&A</span>
          </div>
        </Link>

        {/* Desktop Search */}
        <div className="desktop-search" style={styles.desktopSearch}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>
              <i className="fas fa-search" style={{ marginRight: '0.25rem' }}></i>
              <span style={{ fontSize: '0.875rem' }}>Search</span>
            </button>
          </form>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-nav" style={styles.desktopNav}>
          {desktopNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                ...styles.navLink,
                ...(location.pathname === link.path ? styles.activeNavLink : {})
              }}
              onClick={closeAllMenus}
            >
              {link.icon && <i className={`fas fa-${link.icon}`} style={{ marginRight: '0.5rem' }}></i>}
              {link.label}
            </Link>
          ))}
        </div>

        {/* ✅ FIXED: Mobile Controls - NOW VISIBLE */}
        <div className="mobile-controls" style={styles.mobileControls}>
          <button
            className="mobile-search-toggle"
            style={{
              ...styles.mobileButton,
              background: '#f3f4f6',
              color: '#374151',
              border: '1px solid #d1d5db',
            }}
            onClick={() => {
              setShowMobileSearch(!showMobileSearch);
              setIsMenuOpen(false);
            }}
            aria-label="Toggle search"
          >
            <i className="fas fa-search"></i>
          </button>
          <button
            className="menu-toggle"
            style={{
              ...styles.mobileButton,
              background: '#10b981',
              color: 'white',
              border: 'none',
            }}
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setShowMobileSearch(false);
            }}
            aria-label="Toggle menu"
          >
            <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </button>
        </div>

        {/* Mobile Search */}
        {showMobileSearch && (
          <div className="mobile-search" style={styles.mobileSearch}>
            <form onSubmit={handleSearch} style={styles.searchForm}>
              <input
                type="text"
                placeholder="Search Islamic knowledge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
                autoFocus
              />
              <button type="submit" style={styles.searchButton}>
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        <div className="mobile-menu" style={{
          ...styles.mobileMenu,
          right: isMenuOpen ? '0' : '-300px',
          background: '#ffffff',
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.2)',
        }}>
          <div style={{
            ...styles.mobileMenuHeader,
            background: '#f8fafc',
            borderBottom: '2px solid #10b981',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fas fa-bars" style={{ color: '#10b981', fontSize: '1.25rem' }}></i>
              <h3 style={{ 
                margin: 0, 
                fontSize: '1.1rem', 
                color: '#1f2937',
                fontWeight: '700'
              }}>
                Menu
              </h3>
            </div>
            <button
              style={{
                ...styles.mobileButton,
                color: '#ef4444',
                fontSize: '1.25rem',
              }}
              onClick={closeAllMenus}
              aria-label="Close menu"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div style={styles.mobileNavLinks}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  ...styles.mobileNavLink,
                  ...(location.pathname === link.path ? {
                    background: 'linear-gradient(90deg, #f0fdf4, #ffffff)',
                    color: '#10b981',
                    borderLeft: '3px solid #10b981',
                    fontWeight: '600',
                  } : {
                    color: '#374151',
                  })
                }}
                onClick={closeAllMenus}
              >
                <i className={`fas fa-${link.icon}`} style={{
                  ...styles.mobileNavIcon,
                  color: location.pathname === link.path ? '#10b981' : '#6b7280',
                }}></i>
                <span>{link.label}</span>
              </Link>
            ))}
            
            <Link
              to="/admin"
              style={{
                ...styles.mobileNavLink,
                background: '#f0fdf4',
                color: '#065f46',
                borderLeft: '3px solid #10b981',
                marginTop: '1rem',
              }}
              onClick={closeAllMenus}
            >
              <i className="fas fa-user-shield" style={{
                ...styles.mobileNavIcon,
                color: '#065f46',
              }}></i>
              <span style={{ fontWeight: '600' }}>Admin Panel</span>
            </Link>
          </div>

          <div style={{
            ...styles.mobileMenuFooter,
            background: '#f9fafb',
            borderTop: '2px solid #e5e7eb',
          }}>
            <div style={{ fontSize: '0.75rem', color: '#4b5563', textAlign: 'center' }}>
              <p style={{ margin: 0, fontWeight: '500' }}>© {new Date().getFullYear()} Islamic Q&A</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                <Link to="/privacy" style={{
                  color: '#374151',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  background: '#f3f4f6',
                }} onClick={closeAllMenus}>
                  Privacy
                </Link>
                <Link to="/terms" style={{
                  color: '#374151',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  background: '#f3f4f6',
                }} onClick={closeAllMenus}>
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Backdrop for mobile menu */}
        {isMenuOpen && (
          <div 
            className="menu-backdrop" 
            style={styles.menuBackdrop}
            onClick={closeAllMenus}
            role="button"
            tabIndex={0}
            aria-label="Close menu"
            onKeyDown={(e) => e.key === 'Enter' && closeAllMenus()}
          />
        )}
      </div>
      
      {/* Inline Styles */}
      <style>
        {styles.css}
      </style>
    </nav>
  );
};

// Styles Object - UPDATED FOR MOBILE VISIBILITY
const styles = {
  navbar: {
    background: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    padding: '0.75rem 0',
  },
  navbarContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  navbarBrand: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#1f2937',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logoIcon: {
    fontSize: '1.75rem',
    color: '#10b981',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #10b981, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  desktopSearch: {
    flex: 1,
    maxWidth: '400px',
    margin: '0 2rem',
  },
  searchForm: {
    display: 'flex',
    background: '#f9fafb',
    border: '2px solid #10b981',
    borderRadius: '50px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  searchInput: {
    flex: 1,
    padding: '0.75rem 1.25rem',
    border: 'none',
    background: 'transparent',
    fontSize: '0.875rem',
    outline: 'none',
    color: '#1f2937',
    width: '100%',
  },
  searchButton: {
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: '600',
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  navLink: {
    textDecoration: 'none',
    color: '#6b7280',
    fontWeight: 500,
    fontSize: '0.875rem',
    padding: '0.5rem 0',
    position: 'relative',
    transition: 'color 0.3s ease',
  },
  activeNavLink: {
    color: '#10b981',
  },
  // ✅ FIXED: Mobile Controls now visible
  mobileControls: {
    display: 'none',
    alignItems: 'center',
    gap: '0.75rem',
  },
  mobileButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.25rem',
    color: '#6b7280',
    cursor: 'pointer',
    padding: '0.5rem 0.75rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
  },
  mobileSearch: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'white',
    padding: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1001,
  },
  mobileMenu: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    width: '280px',
    background: 'white',
    boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.2)',
    zIndex: 1002,
    transition: 'right 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  mobileMenuHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.25rem',
    borderBottom: '1px solid #e5e7eb',
  },
  mobileNavLinks: {
    flex: 1,
    overflowY: 'auto',
    padding: '0.5rem 0',
    maxHeight: 'calc(100vh - 120px)',
  },
  mobileNavLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.875rem 1.25rem',
    textDecoration: 'none',
    color: '#374151',
    transition: 'all 0.2s ease',
    borderLeft: '3px solid transparent',
    fontSize: '0.95rem',
  },
  mobileNavIcon: {
    width: '20px',
    textAlign: 'center',
    fontSize: '1rem',
  },
  mobileMenuFooter: {
    padding: '0.75rem 1.25rem',
    borderTop: '1px solid #e5e7eb',
  },
  menuBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1001,
  },
  css: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    /* ✅ FIXED: Mobile controls always visible */
    @media (max-width: 768px) {
      .desktop-search,
      .desktop-nav {
        display: none !important;
      }
      
      .mobile-controls {
        display: flex !important;
      }
      
      /* Ensure buttons are visible */
      .mobile-button {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      }
    }
    
    @media (max-width: 480px) {
      .mobile-menu {
        width: 100% !important;
        right: -100% !important;
      }
      
      .mobile-menu.open {
        right: 0 !important;
      }
    }
    
    .menu-backdrop {
      animation: fadeIn 0.3s ease;
    }
    
    .nav-link:hover {
      color: #10b981 !important;
    }
    
    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: #10b981;
      border-radius: 1px;
    }
    
    .search-form:focus-within {
      border-color: #059669 !important;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2) !important;
    }
    
    .search-button:hover {
      background: linear-gradient(135deg, #059669, #047857) !important;
      transform: scale(1.02);
    }
    
    /* ✅ FIXED: Mobile button hover effects */
    .mobile-search-toggle:hover {
      background: #e5e7eb !important;
      color: #1f2937 !important;
      transform: scale(1.05);
    }
    
    .menu-toggle:hover {
      background: #059669 !important;
      color: white !important;
      transform: scale(1.05);
    }
    
    .mobile-nav-link:hover {
      background: #f9fafb !important;
      color: #10b981 !important;
      border-left-color: #10b981 !important;
    }
    
    /* Scrollbar styling */
    .mobile-nav-links::-webkit-scrollbar {
      width: 4px;
    }
    
    .mobile-nav-links::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    
    .mobile-nav-links::-webkit-scrollbar-thumb {
      background: #10b981;
      border-radius: 2px;
    }
  `,
};

export default Navbar;