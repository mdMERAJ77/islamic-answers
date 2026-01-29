// src/components/Navbar.jsx - FIXED VERSION
import { useState, memo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  MessageSquare,
  LogIn,
  LogOut,
  Shield,
  Heart,
} from "lucide-react";
import SearchBar from './Search/SearchBar';

// ========== COMPONENTS DEFINED OUTSIDE RENDER ==========

const NavLink = memo(({ to, iconType, children, isActive, onClick }) => {
  const getIcon = () => {
    switch (iconType) {
      case "home": return <Home size={18} />;
      case "questions": return <MessageSquare size={18} />;
      case "login": return <LogIn size={18} />;
      case "shield": return <Shield size={18} />;
      case "heart": return <Heart size={18} />;
      default: return <Home size={18} />;
    }
  };

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
        isActive ? "bg-blue-700 text-white" : "text-white hover:bg-blue-700/80"
      }`}
    >
      {getIcon()}
      <span>{children}</span>
    </Link>
  );
});

NavLink.displayName = "NavLink";

// ========== MAIN NAVBAR COMPONENT ==========

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // ✅ SIMPLIFIED: Remove auth for now
  const isAdmin = false; // Set to true if you want admin link

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold flex items-center space-x-2 hover:opacity-90 transition"
            onClick={closeMenu}
          >
            <span className="text-2xl">🕌</span>
            <span className="hidden sm:inline">Islamic Q&A</span>
            <span className="sm:hidden">IQ&A</span>
          </Link>

          {/* Search Bar - Moved here for better layout */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <SearchBar />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/" iconType="home" isActive={isActive("/")}>
              Home
            </NavLink>

            <NavLink
              to="/questions"
              iconType="questions"
              isActive={isActive("/questions")}
            >
              Q&A
            </NavLink>

            <NavLink
              to="/donate"
              iconType="heart"
              isActive={isActive("/donate")}
            >
              Donate
            </NavLink>

            {/* Admin/Login Link - Always show for now */}
            <NavLink
              to="/admin"
              iconType={isAdmin ? "shield" : "login"}
              isActive={isActive("/admin")}
            >
              {isAdmin ? "Admin" : "Admin Login"}
            </NavLink>
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

        {/* Mobile Search Bar */}
        <div className="md:hidden my-3">
          <SearchBar />
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-800 border-t border-blue-900">
            <div className="py-4 space-y-1">
              <NavLink
                to="/"
                iconType="home"
                isActive={isActive("/")}
                onClick={closeMenu}
              >
                Home
              </NavLink>

              <NavLink
                to="/questions"
                iconType="questions"
                isActive={isActive("/questions")}
                onClick={closeMenu}
              >
                Questions & Answers
              </NavLink>

              <NavLink
                to="/donate"
                iconType="heart"
                isActive={isActive("/donate")}
                onClick={closeMenu}
              >
                Donate
              </NavLink>

              <NavLink
                to="/admin"
                iconType={isAdmin ? "shield" : "login"}
                isActive={isActive("/admin")}
                onClick={closeMenu}
              >
                {isAdmin ? "Admin Panel" : "Admin Login"}
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;