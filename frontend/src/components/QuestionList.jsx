// src/components/QuestionList.jsx
import { useState } from 'react';

const QuestionList = ({ questions }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {questions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow">
          <p className="text-gray-500 text-lg">No questions available yet.</p>
        </div>
      ) : (
        questions.map((question) => (
          <div
            key={question._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div
              className="p-6 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleExpand(question._id)}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800 pr-4">
                  {question.question}
                </h3>
                <span className="text-gray-500 text-sm">
                  {expandedId === question._id ? '▲' : '▼'}
                </span>
              </div>
            </div>

            {expandedId === question._id && (
              <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                <div className="mb-6">
                  <h4 className="font-bold text-gray-700 mb-2">Answer:</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-800">{question.answer.en}</p>
                    {question.answer.hi && (
                      <p className="text-gray-700 mt-2 border-t pt-2">
                        <span className="font-semibold">हिंदी:</span> {question.answer.hi}
                      </p>
                    )}
                  </div>
                </div>

                {question.references && (
                  <div className="space-y-4">
                    {question.references.quran && question.references.quran.length > 0 && (
                      <div>
                        <h4 className="font-bold text-green-700 mb-2">Quran References:</h4>
                        <div className="bg-green-50 p-4 rounded-lg">
                          {question.references.quran.map((ref, idx) => (
                            <div key={idx} className="mb-2 last:mb-0">
                              <p className="font-semibold">
                                {ref.surah} {ref.ayah ? `(${ref.ayah})` : ''}
                              </p>
                              <p className="text-gray-700">{ref.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {question.references.hadith && question.references.hadith.length > 0 && (
                      <div>
                        <h4 className="font-bold text-purple-700 mb-2">Hadith References:</h4>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          {question.references.hadith.map((ref, idx) => (
                            <div key={idx} className="mb-2 last:mb-0">
                              <p className="font-semibold">
                                {ref.source} {ref.number ? `(#${ref.number})` : ''}
                              </p>
                              <p className="text-gray-700">{ref.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {question.references.videos && question.references.videos.length > 0 && (
                      <div>
                        <h4 className="font-bold text-red-700 mb-2">Video References:</h4>
                        <div className="bg-red-50 p-4 rounded-lg">
                          {question.references.videos.map((video, idx) => (
                            <div key={idx} className="mb-2 last:mb-0">
                              <a
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline font-semibold"
                              >
                                ▶ {video.title}
                              </a>
                              <p className="text-gray-600 text-sm">{video.scholar}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default QuestionList;