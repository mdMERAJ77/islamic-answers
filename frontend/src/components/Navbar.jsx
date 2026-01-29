// src/components/Navbar.jsx - IMPROVED MOBILE UI
import { useState, memo, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from './Search/SearchBar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setShowMobileSearch(false);
  }, [location]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    setShowMobileSearch(false);
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(prev => !prev);
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-blue-800 shadow-xl' 
        : 'bg-gradient-to-r from-blue-600 to-blue-800'
    } text-white`}>
      
      <div className="container mx-auto px-4">
        {/* Main header */}
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition">
              <span className="text-xl">🕌</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg">Islamic Q&A</h1>
              <p className="text-xs text-white/70">Authentic Answers</p>
            </div>
            <div className="sm:hidden font-bold">IQ&A</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <DesktopNavLink to="/" isActive={isActive("/")}>
              Home
            </DesktopNavLink>
            <DesktopNavLink to="/questions" isActive={isActive("/questions")}>
              Q&A
            </DesktopNavLink>
            <DesktopNavLink to="/donate" isActive={isActive("/donate")}>
              Donate
            </DesktopNavLink>
            <DesktopNavLink to="/admin" isActive={isActive("/admin")}>
              Admin
            </DesktopNavLink>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block w-64 lg:w-80">
            <SearchBar variant="navbar" />
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleMobileSearch}
              className={`p-2 rounded-lg transition ${
                showMobileSearch ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
              aria-label="Search"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-white/10 transition flex flex-col items-center justify-center space-y-1"
              aria-label="Menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {showMobileSearch && (
          <div className="md:hidden pb-4 animate-fadeIn">
            <div className="bg-white rounded-lg p-2">
              <SearchBar variant="navbar" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-sm text-white/80">Quick:</span>
              {['women rights', 'prayer', 'ramadan', 'hijab'].map(term => (
                <Link
                  key={term}
                  to={`/search?q=${term}`}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-sm transition"
                  onClick={() => setShowMobileSearch(false)}
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 pt-3 pb-4 animate-fadeIn">
            <MobileNavLink 
              to="/" 
              isActive={isActive("/")}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </MobileNavLink>
            <MobileNavLink 
              to="/questions" 
              isActive={isActive("/questions")}
              onClick={() => setIsMenuOpen(false)}
            >
              Questions & Answers
            </MobileNavLink>
            <MobileNavLink 
              to="/donate" 
              isActive={isActive("/donate")}
              onClick={() => setIsMenuOpen(false)}
            >
              Donate
            </MobileNavLink>
            <MobileNavLink 
              to="/admin" 
              isActive={isActive("/admin")}
              onClick={() => setIsMenuOpen(false)}
            >
              🔐 Admin
            </MobileNavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

// Desktop Nav Link Component
const DesktopNavLink = memo(({ to, children, isActive }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-lg font-medium transition ${
      isActive 
        ? 'bg-white text-blue-700' 
        : 'text-white hover:bg-white/10'
    }`}
  >
    {children}
  </Link>
));

// Mobile Nav Link Component
const MobileNavLink = memo(({ to, children, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 my-1 rounded-lg transition ${
      isActive 
        ? 'bg-white text-blue-700 font-semibold' 
        : 'text-white hover:bg-white/10'
    }`}
  >
    {children}
  </Link>
));

DesktopNavLink.displayName = 'DesktopNavLink';
MobileNavLink.displayName = 'MobileNavLink';

export default Navbar;