// src/pages/AdminPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLogin from '../components/AdminLogin';
import AdminPanel from '../components/AdminPanel';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get('https://islamic-answers-backend.onrender.com/api/auth/check', {
        withCredentials: true
      });
      setIsAuthenticated(response.data.isAuthenticated);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <AdminPanel />
      ) : (
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Admin Login
          </h2>
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        </div>
      )}
    </div>
  );
};

export default AdminPage;