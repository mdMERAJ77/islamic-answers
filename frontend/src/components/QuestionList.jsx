import { useState } from 'react';

const QuestionList = ({ questions }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // ✅ NEW: Extract question data in both formats
  const getQuestionText = (q) => {
    return q.question_en || q.question || 'No question';
  };

  const getEnglishAnswer = (q) => {
    return q.answer_en || q.answer?.en || 'No answer available';
  };

  const getHindiAnswer = (q) => {
    return q.answer_hi || q.answer?.hi || '';
  };

  const getQuranReferences = (q) => {
    return q.references?.quran || [];
  };

  const getHadithReferences = (q) => {
    return q.references?.hadith || [];
  };

  const getVideoReferences = (q) => {
    return q.references?.videos || [];
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
                <div className="flex-1">
                  {/* ✅ English Question */}
                  <h3 className="text-xl font-bold text-gray-800">
                    {getQuestionText(question)}
                  </h3>
                  
                  {/* ✅ Hindi Question (if available) */}
                  {question.question_hi && (
                    <p className="text-gray-600 mt-2 font-hindi">
                      {question.question_hi}
                    </p>
                  )}
                </div>
                <span className="text-gray-500 text-sm ml-4">
                  {expandedId === question._id ? '▲' : '▼'}
                </span>
              </div>
            </div>

            {expandedId === question._id && (
              <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                {/* ✅ Answers Section */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-700 mb-2">Answer:</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    {/* English Answer */}
                    <p className="text-gray-800">{getEnglishAnswer(question)}</p>
                    
                    {/* Hindi Answer */}
                    {getHindiAnswer(question) && (
                      <div className="mt-4 pt-4 border-t border-blue-100">
                        <p className="font-semibold text-gray-700 mb-1">हिंदी उत्तर:</p>
                        <p className="text-gray-700 font-hindi">{getHindiAnswer(question)}</p>
                      </div>
                    )}
                    
                    {/* Urdu Answer */}
                    {question.answer_ur && (
                      <div className="mt-4 pt-4 border-t border-blue-100">
                        <p className="font-semibold text-gray-700 mb-1">اردو جواب:</p>
                        <p className="text-gray-700 font-urdu text-right">{question.answer_ur}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* ✅ References Section */}
                {question.references && (
                  <div className="space-y-4">
                    {/* Quran References - NEW Bilingual Format */}
                    {getQuranReferences(question).length > 0 && (
                      <div>
                        <h4 className="font-bold text-green-700 mb-2">Quran References:</h4>
                        <div className="bg-green-50 p-4 rounded-lg">
                          {getQuranReferences(question).map((ref, idx) => (
                            <div key={idx} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-0 border-green-100">
                              {/* Surah Info */}
                              <div className="flex flex-wrap gap-2 mb-2">
                                <span className="font-semibold bg-green-100 text-green-800 px-3 py-1 rounded">
                                  {ref.surah_en || ref.surah}
                                </span>
                                {ref.surah_hi && (
                                  <span className="font-hindi bg-green-200 text-green-900 px-3 py-1 rounded">
                                    {ref.surah_hi}
                                  </span>
                                )}
                                {ref.ayah && (
                                  <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">
                                    Ayah: {ref.ayah}
                                  </span>
                                )}
                              </div>
                              
                              {/* Verse */}
                              {ref.verse_en && (
                                <p className="text-gray-800 mb-1">
                                  <span className="font-medium">English:</span> {ref.verse_en}
                                </p>
                              )}
                              {ref.verse_hi && (
                                <p className="text-gray-700 font-hindi mb-1">
                                  <span className="font-medium">हिंदी:</span> {ref.verse_hi}
                                </p>
                              )}
                              
                              {/* Meaning */}
                              {(ref.meaning_en || ref.meaning_hi) && (
                                <div className="mt-2 pt-2 border-t border-green-200">
                                  <p className="text-sm text-green-800 font-medium">Meaning:</p>
                                  {ref.meaning_en && (
                                    <p className="text-sm text-gray-700">{ref.meaning_en}</p>
                                  )}
                                  {ref.meaning_hi && (
                                    <p className="text-sm text-gray-600 font-hindi">{ref.meaning_hi}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Hadith References - NEW Bilingual Format */}
                    {getHadithReferences(question).length > 0 && (
                      <div>
                        <h4 className="font-bold text-purple-700 mb-2">Hadith References:</h4>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          {getHadithReferences(question).map((ref, idx) => (
                            <div key={idx} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-0 border-purple-100">
                              {/* Source Info */}
                              <div className="flex flex-wrap gap-2 mb-2">
                                <span className="font-semibold bg-purple-100 text-purple-800 px-3 py-1 rounded">
                                  {ref.source_en || ref.source}
                                </span>
                                {ref.source_hi && (
                                  <span className="font-hindi bg-purple-200 text-purple-900 px-3 py-1 rounded">
                                    {ref.source_hi}
                                  </span>
                                )}
                                {ref.number && (
                                  <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">
                                    #{ref.number}
                                  </span>
                                )}
                              </div>
                              
                              {/* Hadith Text */}
                              {ref.text_en && (
                                <p className="text-gray-800 mb-1">
                                  <span className="font-medium">English:</span> {ref.text_en}
                                </p>
                              )}
                              {ref.text_hi && (
                                <p className="text-gray-700 font-hindi mb-1">
                                  <span className="font-medium">हिंदी:</span> {ref.text_hi}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Video References - NEW Bilingual Format */}
                    {getVideoReferences(question).length > 0 && (
                      <div>
                        <h4 className="font-bold text-red-700 mb-2">Video References:</h4>
                        <div className="bg-red-50 p-4 rounded-lg">
                          {getVideoReferences(question).map((video, idx) => (
                            <div key={idx} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-0 border-red-100">
                              <div className="flex flex-wrap gap-2 mb-2">
                                <a
                                  href={video.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline font-semibold"
                                >
                                  ▶ {video.title_en || video.title}
                                </a>
                                {video.title_hi && (
                                  <span className="text-gray-600 font-hindi">
                                    ({video.title_hi})
                                  </span>
                                )}
                              </div>
                              {video.scholar && (
                                <p className="text-gray-600 text-sm">
                                  Scholar: {video.scholar}
                                </p>
                              )}
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