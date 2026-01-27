// components/Navbar.jsx
import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, MessageSquare, LogIn, LogOut, Shield, User } from 'lucide-react';
import axios from 'axios';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Check admin status
  const checkAdminStatus = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/check', {
        withCredentials: true
      });
      setIsAdmin(response.data.isAuthenticated || false);
    } catch (error) {
      console.log(error);
      setIsAdmin(false);
    }
  }, []);

 // Navbar.jsx - Line 38-40 update karo
useEffect(() => {
  // IIFE use karo
  (async () => {
    await checkAdminStatus();
  })();
}, [checkAdminStatus]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        withCredentials: true
      });
      setIsAdmin(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Active link check
  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700 md:bg-blue-800' : '';
  };

  return (
    <nav className="bg-linear-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main Navbar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="text-xl font-bold flex items-center space-x-2 hover:opacity-90 transition"
          >
            <span className="text-2xl">🕌</span>
            <span className="hidden sm:block">Islamic Q&A</span>
            <span className="sm:hidden">IQ&A</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg transition flex items-center space-x-2 ${isActive('/')}`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/questions" 
              className={`px-4 py-2 rounded-lg transition flex items-center space-x-2 ${isActive('/questions')}`}
            >
              <MessageSquare size={18} />
              <span>Question And Answer</span>
            </Link>
            
            {isAdmin ? (
              <>
                <Link 
                  to="/admin" 
                  className={`px-4 py-2 rounded-lg transition flex items-center space-x-2 ${isActive('/admin')}`}
                >
                  <Shield size={18} />
                  <span>Admin</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition flex items-center space-x-2 ml-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/admin" 
                className="px-4 py-2 rounded-lg bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition flex items-center space-x-2"
              >
                <LogIn size={18} />
                <span>Admin Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-blue-700 transition"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-800 border-t border-blue-900 animate-slideDown">
            <div className="py-4 px-4 space-y-2">
              <Link
                to="/"
                onClick={closeMenu}
                className={`flex items-center space-x-3 p-3 rounded-lg transition ${isActive('/')}`}
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
              
              <Link
                to="/questions"
                onClick={closeMenu}
                className={`flex items-center space-x-3 p-3 rounded-lg transition ${isActive('/questions')}`}
              >
                <MessageSquare size={20} />
                <span>Questions & Answers</span>
              </Link>

              {isAdmin ? (
                <>
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition ${isActive('/admin')}`}
                  >
                    <Shield size={20} />
                    <span>Admin Panel</span>
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition text-left"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-linear-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition"
                >
                  <LogIn size={20} />
                  <span>Admin Login</span>
                </Link>
              )}
              
              {/* User Status */}
              <div className="pt-4 mt-4 border-t border-blue-700">
                <div className="flex items-center space-x-3 p-2">
                  <User size={18} className="text-blue-300" />
                  <span className="text-sm text-blue-200">
                    {isAdmin ? '👑 Admin Mode' : '👤 Visitor Mode'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;