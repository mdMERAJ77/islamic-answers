// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import QuestionsPage from './pages/QuestionPage';
import AdminPage from './pages/AdminPage';
import Footer from './components/Footer'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
         <Footer />
      </div>
    </Router>
  );
}

export default App;