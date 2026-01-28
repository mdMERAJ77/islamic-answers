// src/pages/QuestionPage.jsx - FIXED VERSION
import { useState, useCallback, memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import QuestionList from '../components/QuestionList';
import RaiseQuestion from '../components/RaiseQuestion';
import { API } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

// Memoized components for performance
const QuestionCount = memo(({ count }) => (
  <div className="mb-6 text-gray-600 flex justify-between items-center">
    <p className="font-medium">Found {count} question{count !== 1 ? 's' : ''}</p>
    {count > 0 && (
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        aria-label="Scroll to top"
      >
        ↑ Back to top
      </button>
    )}
  </div>
));

QuestionCount.displayName = 'QuestionCount';

const QuestionsPage = () => {
  const [showRaiseForm, setShowRaiseForm] = useState(false);

  // ✅ FIXED: Handle API response format properly
  const { 
    data: questionsData = {}, 
    isLoading, 
    error, 
    refetch,
    isRefetching 
  } = useQuery({
    queryKey: ['questions'],
    queryFn: async () => {
      const response = await API.getQuestions();
      console.log('📊 API Response:', response);
      
      // Handle NEW format response
      if (response && response.data && response.data.data) {
        // NEW format: { success: true, data: [], count: number }
        return { questions: response.data.data, count: response.data.count };
      } else if (response && response.data && Array.isArray(response.data)) {
        // OLD format: direct array
        return { questions: response.data, count: response.data.length };
      } else if (Array.isArray(response)) {
        // Direct array response
        return { questions: response, count: response.length };
      }
      return { questions: [], count: 0 };
    },
    staleTime: 2 * 60 * 1000,
    retry: 2
  });

  // Extract questions array
  const questions = questionsData.questions || [];
  const questionCount = questionsData.count || questions.length;

  // Memoized handlers
  const handleFormToggle = useCallback(() => {
    setShowRaiseForm(prev => !prev);
  }, []);

  const handleQuestionSubmitSuccess = useCallback(() => {
    setShowRaiseForm(false);
    refetch();
  }, [refetch]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  // Loading state
  if (isLoading && !isRefetching) {
    return <LoadingSpinner text="Loading questions..." />;
  }

  // Error state
  if (error && !isRefetching) {
    return <ErrorDisplay error={error} onRetry={handleRefresh} />;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Islamic Questions & Answers
          </h1>
          <p className="text-gray-600 mt-2 max-w-3xl">
            Authentic answers with references from Quran, Hadith, and trusted scholars
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <button
            onClick={handleRefresh}
            disabled={isRefetching}
            className="flex-1 lg:flex-none px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            aria-label="Refresh questions"
          >
            {isRefetching ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Refreshing...
              </>
            ) : (
              '🔄 Refresh'
            )}
          </button>
          
          <button
            onClick={handleFormToggle}
            className="flex-1 lg:flex-none px-5 py-2.5 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {showRaiseForm ? '← Back to Questions' : '➕ Ask Question'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      {showRaiseForm ? (
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border mb-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">❓</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Submit Your Question
              </h2>
              <p className="text-gray-600 mt-1">
                We'll provide authentic answers with proper references
              </p>
            </div>
          </div>
          <RaiseQuestion onSuccess={handleQuestionSubmitSuccess} />
        </div>
      ) : (
        <>
          <QuestionCount count={questionCount} />
          
          {questions.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border">
              <div className="text-5xl mb-6">📚</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                No questions yet
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Be the first to ask a question about Islam.
              </p>
              <button
                onClick={handleFormToggle}
                className="bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-medium"
              >
                Ask First Question
              </button>
            </div>
          ) : (
            <>
              <QuestionList questions={questions} />
              
              {/* Scroll to top for large lists */}
              {questions.length > 5 && (
                <div className="fixed bottom-6 right-6 z-40">
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
                    aria-label="Scroll to top"
                  >
                    ↑
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionsPage;