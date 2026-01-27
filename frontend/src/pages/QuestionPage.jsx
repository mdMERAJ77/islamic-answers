// Pages/QuestionsPage.jsx - Complete fixed version
import { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionList from '../components/QuestionList';
import RaiseQuestion from '../components/RaiseQuestion';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRaiseForm, setShowRaiseForm] = useState(false);
  const [error, setError] = useState('');

  // Data fetch function
  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get('https://islamic-answers-backend.onrender.com/api/questions');
      
      // Check if response has data
      if (response.data && Array.isArray(response.data)) {
        setQuestions(response.data);
      } else {
        setQuestions([]);
        setError('No questions found');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to load questions. Please try again.');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    // IIFE use karo to avoid the warning
    (async () => {
      await fetchQuestions();
    })();
  }, []);

  // Form toggle handler
  const handleFormToggle = () => {
    setShowRaiseForm(!showRaiseForm);
  };

  // Question submit success handler
  const handleQuestionSubmitSuccess = () => {
    setShowRaiseForm(false);
    alert('Question submitted successfully! Admin will review it.');
    fetchQuestions(); // Refresh the list
  };

  // Refresh button handler
  const handleRefresh = () => {
    fetchQuestions();
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Islamic Questions & Answers
        </h1>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex-1 sm:flex-none"
            disabled={loading}
          >
            {loading ? 'Loading...' : '🔄 Refresh'}
          </button>
          
          <button
            onClick={handleFormToggle}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex-1 sm:flex-none"
          >
            {showRaiseForm ? '← Back' : '➕ Ask Question'}
          </button>
        </div>
      </div>

      {error && !loading && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button 
              onClick={handleRefresh}
              className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {showRaiseForm ? (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
            Submit Your Question
          </h2>
          <RaiseQuestion onSuccess={handleQuestionSubmitSuccess} />
        </div>
      ) : (
        <>
          {!loading && !error && (
            <div className="mb-6 text-gray-600 flex justify-between items-center">
              <p>Found {questions.length} questions</p>
              {questions.length > 0 && (
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  ↑ Back to top
                </button>
              )}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading questions...</p>
            </div>
          ) : questions.length === 0 && !error ? (
            <div className="text-center py-12 bg-white rounded-xl shadow">
              <p className="text-gray-500 text-lg mb-4">No questions available yet.</p>
              <button
                onClick={handleFormToggle}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
              >
                Be the first to ask a question
              </button>
            </div>
          ) : (
            <QuestionList questions={questions} />
          )}
        </>
      )}
    </div>
  );
};

export default QuestionsPage;