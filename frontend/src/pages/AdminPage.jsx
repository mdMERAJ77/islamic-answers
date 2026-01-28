// src/pages/AdminPage.jsx - SIMPLE VERSION
import { useState, useEffect } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminPanel from '../components/AdminPanel';
import { API } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fix: Move state update outside of async effect
  useEffect(() => {
    let isMounted = true;
    
    const checkAuth = async () => {
      try {
        const response = await API.checkAuth();
        
        // Check if component is still mounted before updating state
        if (isMounted) {
          setIsAuthenticated(response.data?.isAuthenticated || false);
        }
      } catch (error) {
        console.log(error);
        if (isMounted) {
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array = run once on mount

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (loading) {
    return <LoadingSpinner text="Checking authentication..." />;
  }

  return (
    <div>
      {isAuthenticated ? (
        <AdminPanel />
      ) : (
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🕌</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Admin Login
            </h2>
            <p className="text-gray-600 mt-2">
              Access restricted to authorized administrators
            </p>
          </div>
          
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <a 
              href="/" 
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;