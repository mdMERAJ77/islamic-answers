// // frontend/src/components/QuestionDetail.jsx - COMPLETE WORKING VERSION
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const QuestionDetail = () => {
//   const { id } = useParams(); // URL se id milega (1, 2, 3...)
//   const [question, setQuestion] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   console.log('Question ID:', id); // Debug

//   useEffect(() => {
//     const fetchQuestion = async () => {
//       try {
//         setLoading(true);
//         console.log('Fetching question from API...');
        
//         // API call - check port 5000 ya 3001
//         const response = await axios.get(`http://localhost:5000/api/questions/${id}`);
//         console.log('API Response:', response.data);
        
//         setQuestion(response.data);
//       } catch (err) {
//         console.error('API Error:', err.response || err.message);
//         setError('Question not found or server error');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchQuestion();
//     }
//   }, [id]);

//   // Debug current state
//   console.log('Loading:', loading);
//   console.log('Error:', error);
//   console.log('Question:', question);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-xl">Loading question...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <strong>Error:</strong> {error}
//         </div>
//       </div>
//     );
//   }

//   if (!question) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//           Question not found
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-4xl">
//       <h1 className="text-3xl font-bold mb-4 text-gray-900">
//         {question.title || 'No Title'}
//       </h1>
      
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Answer:</h2>
//         <p className="text-gray-700 mb-6">
//           {question.answer || 'No answer available'}
//         </p>
        
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">Tags:</h3>
//           <div className="flex flex-wrap gap-2">
//             {question.tags && question.tags.map((tag, index) => (
//               <span 
//                 key={index}
//                 className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuestionDetail;




import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true);
        console.log('🔄 Fetching question for ID:', id);
        
        const response = await axios.get(`http://localhost:5000/api/questions/${id}`);
        console.log('✅ API Response:', response.data);
        
        setQuestion(response.data.data);
        setError('');
      } catch (err) {
        console.error('❌ Error fetching question:', err);
        setError('Question not found or server error');
        
        // Mock data for testing
        setQuestion({
          _id: id,
          question_en: `Question ${id} (Test Data)`,
          question_hi: `प्रश्न ${id} (परीक्षण डेटा)`,
          answer_en: `This is a test answer for question ID: ${id}. In a real scenario, this would contain detailed Islamic answers with Quran and Hadith references.`,
          answer_hi: `यह प्रश्न ${id} के लिए एक परीक्षण उत्तर है। वास्तविक परिदृश्य में, इसमें कुरान और हदीस के संदर्भों के साथ विस्तृत इस्लामी उत्तर होंगे।`,
          tags: ['test', 'islam', 'debug'],
          references: {
            quran: [
              {
                surah_en: "Al-Baqarah",
                surah_hi: "अल-बक़रा",
                ayah: "2:256",
                verse_en: "There is no compulsion in religion...",
                verse_hi: "धर्म में कोई जबरदस्ती नहीं है...",
                meaning_en: "Freedom of religion is guaranteed in Islam",
                meaning_hi: "इस्लाम में धर्म की स्वतंत्रता की गारंटी है"
              }
            ],
            hadith: [
              {
                source_en: "Sahih Bukhari",
                source_hi: "सहीह बुखारी",
                number: "1",
                text_en: "Seeking knowledge is obligatory...",
                text_hi: "ज्ञान प्राप्त करना अनिवार्य है..."
              }
            ]
          }
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchQuestion();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
          <p className="text-lg">Loading question...</p>
        </div>
      </div>
    );
  }

  if (error && !question) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <Link to="/search" className="inline-block mt-4 text-green-600 hover:text-green-800">
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link 
        to="/search" 
        className="inline-flex items-center text-green-600 hover:text-green-800 mb-6"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Search
      </Link>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Question Header */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {question.question_en}
          </h1>
          {question.question_hi && (
            <h2 className="text-xl text-gray-700 italic">
              {question.question_hi}
            </h2>
          )}
          
          <div className="flex flex-wrap gap-2 mt-4">
            {question.tags && question.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Answer Section */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Answer:</h3>
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6 whitespace-pre-line">
              {question.answer_en}
            </p>
            
            {question.answer_hi && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">हिंदी में उत्तर:</h4>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {question.answer_hi}
                </p>
              </div>
            )}
          </div>
          
          {/* Quran References */}
          {question.references?.quran?.length > 0 && (
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Quran References
              </h4>
              <div className="space-y-4">
                {question.references.quran.map((ref, idx) => (
                  <div key={idx} className="bg-green-50 p-4 rounded-lg">
                    <div className="font-semibold text-green-800">
                      {ref.surah_en} ({ref.ayah})
                      {ref.surah_hi && <span className="text-green-600 ml-2">- {ref.surah_hi}</span>}
                    </div>
                    <p className="text-gray-700 mt-2">{ref.verse_en}</p>
                    {ref.verse_hi && <p className="text-gray-600 mt-1 italic">{ref.verse_hi}</p>}
                    <div className="mt-2 text-sm text-gray-500">
                      <strong>Meaning:</strong> {ref.meaning_en}
                      {ref.meaning_hi && <span className="ml-2">- {ref.meaning_hi}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Hadith References */}
          {question.references?.hadith?.length > 0 && (
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-emerald-700 mb-4">Hadith References</h4>
              <div className="space-y-4">
                {question.references.hadith.map((ref, idx) => (
                  <div key={idx} className="bg-emerald-50 p-4 rounded-lg">
                    <div className="font-semibold text-emerald-800">
                      {ref.source_en} ({ref.number})
                      {ref.source_hi && <span className="text-emerald-600 ml-2">- {ref.source_hi}</span>}
                    </div>
                    <p className="text-gray-700 mt-2">{ref.text_en}</p>
                    {ref.text_hi && <p className="text-gray-600 mt-1 italic">{ref.text_hi}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Debug Info */}
          {/* <div className="mt-8 p-4 bg-gray-100 rounded text-sm">
            <p className="text-gray-600">
              <strong>Debug Info:</strong> Question ID: {id} | Database ID: {question._id}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;