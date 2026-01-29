// src/components/Navbar.jsx - SIMPLE WORKING VERSION
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
import { useQuery } from "@tanstack/react-query";
import { API } from "../utils/api";
import SearchBar from '../components/Search/SearchBar';
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

  // Check auth status
  const { data: authData } = useQuery({
    queryKey: ["navbarAuth"],
    queryFn: () => API.checkAuth().then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const isAdmin = authData?.isAuthenticated || false;

  const handleLogout = async () => {
    try {
      await API.logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

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

            {isAdmin ? (
              <>
                <NavLink
                  to="/admin"
                  iconType="shield"
                  isActive={isActive("/admin")}
                >
                  Admin
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition flex items-center space-x-2 ml-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <NavLink
                to="/admin"
                iconType="login"
                isActive={isActive("/admin")}
              >
                Admin
              </NavLink>
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

              {isAdmin ? (
                <>
                  <NavLink
                    to="/admin"
                    iconType="shield"
                    isActive={isActive("/admin")}
                    onClick={closeMenu}
                  >
                    Admin Panel
                  </NavLink>

                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition text-left"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <NavLink
                  to="/admin"
                  iconType="login"
                  isActive={isActive("/admin")}
                  onClick={closeMenu}
                >
                  Admin Login
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 max-w-md mx-4">
  <SearchBar />
</div>
    </nav>
  );
};

export default Navbar;