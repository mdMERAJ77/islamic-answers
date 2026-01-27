// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to Islamic Q&A
      </h1>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
        A platform to learn about Islam, clear misconceptions, and get authentic 
        answers with references from Quran, Hadith, and authentic scholars.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            📚 Questions & Answers
          </h2>
          <p className="text-gray-600 mb-6">
            Browse through answered questions about Islam with proper references
            from Quran, Hadith, and authentic sources.
          </p>
          <Link
            to="/questions"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            View All Questions →
          </Link>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            ❓ Raise a Question
          </h2>
          <p className="text-gray-600 mb-6">
            Have a question about Islam? Submit it here and our admin will 
            provide you with an authentic answer with references.
          </p>
          <Link
            to="/questions"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Ask a Question →
          </Link>
        </div>
      </div>

      <div className="mt-12 bg-yellow-50 p-6 rounded-lg max-w-3xl mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          About This Platform
        </h3>
        <p className="text-gray-700">
          This website aims to provide authentic Islamic knowledge and clear 
          common misconceptions. All answers are verified with references from 
          authentic sources. Please use this platform responsibly.
        </p>
      </div>
    </div>
  );
};

export default HomePage;