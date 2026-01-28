// src/App.jsx - UPDATED
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const QuestionsPage = lazy(() => import('./pages/QuestionPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const DonationPage = lazy(() => import('./pages/DonationPage')); // 🆕 ADD THIS LINE

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/questions" element={<QuestionsPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/donate" element={<DonationPage />} /> // 🆕 ADD THIS LINE

              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;