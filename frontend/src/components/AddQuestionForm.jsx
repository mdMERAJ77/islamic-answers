import { useState } from 'react';
import axios from 'axios';

const AddQuestionForm = () => {
  // ✅ NEW BILINGUAL FORM STATE
  const [formData, setFormData] = useState({
    // Bilingual Questions
    question_en: '',
    question_hi: '',
    
    // Bilingual Answers
    answer_en: '',
    answer_hi: '',
    answer_ur: '',
    
    // Tags and Category
    tags: '',
    category: '',
    
    // Updated Reference Structure
    references: {
      quran: [],
      hadith: [],
      videos: []
    }
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // ✅ Handle text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Handle tags (comma separated)
  const handleTagsChange = (e) => {
    const tagsString = e.target.value;
    setFormData(prev => ({
      ...prev,
      tags: tagsString
    }));
  };

  // ✅ Add Quran reference
  const addQuran = () => {
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        quran: [...prev.references.quran, {
          surah_en: '',
          surah_hi: '',
          ayah: '',
          verse_en: '',
          verse_hi: '',
          meaning_en: '',
          meaning_hi: ''
        }]
      }
    }));
  };

  const removeQuran = (index) => {
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        quran: prev.references.quran.filter((_, i) => i !== index)
      }
    }));
  };

  const updateQuran = (index, field, value) => {
    const updatedQuran = [...formData.references.quran];
    updatedQuran[index][field] = value;
    
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        quran: updatedQuran
      }
    }));
  };

  // ✅ Add Hadith reference
  const addHadith = () => {
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        hadith: [...prev.references.hadith, {
          source_en: '',
          source_hi: '',
          number: '',
          text_en: '',
          text_hi: ''
        }]
      }
    }));
  };

  const removeHadith = (index) => {
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        hadith: prev.references.hadith.filter((_, i) => i !== index)
      }
    }));
  };

  const updateHadith = (index, field, value) => {
    const updatedHadith = [...formData.references.hadith];
    updatedHadith[index][field] = value;
    
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        hadith: updatedHadith
      }
    }));
  };

  // ✅ Add Video reference
  const addVideo = () => {
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        videos: [...prev.references.videos, {
          title_en: '',
          title_hi: '',
          url: '',
          scholar: ''
        }]
      }
    }));
  };

  const removeVideo = (index) => {
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        videos: prev.references.videos.filter((_, i) => i !== index)
      }
    }));
  };

  const updateVideo = (index, field, value) => {
    const updatedVideos = [...formData.references.videos];
    updatedVideos[index][field] = value;
    
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        videos: updatedVideos
      }
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.question_en.trim()) {
      setMessage({ type: 'error', text: 'English question is required' });
      return;
    }

    if (!formData.answer_en.trim()) {
      setMessage({ type: 'error', text: 'English answer is required' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Prepare data in NEW FORMAT
      const dataToSend = {
        question_en: formData.question_en.trim(),
        question_hi: formData.question_hi.trim(),
        answer_en: formData.answer_en.trim(),
        answer_hi: formData.answer_hi.trim(),
        answer_ur: formData.answer_ur.trim(),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        category: formData.category.trim(),
        references: formData.references
      };

      console.log("Sending data (NEW FORMAT):", dataToSend);

      const response = await axios.post(
        'https://islamic-answers-backend.onrender.com/api/questions',
        dataToSend,
        { withCredentials: true }
      );

      if (response.data.success) {
        setMessage({ 
          type: 'success', 
          text: '✅ Question added successfully in bilingual format!' 
        });
        
        // Reset form
        setFormData({
          question_en: '',
          question_hi: '',
          answer_en: '',
          answer_hi: '',
          answer_ur: '',
          tags: '',
          category: '',
          references: {
            quran: [],
            hadith: [],
            videos: []
          }
        });
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Error adding question' 
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load sample data in NEW FORMAT
  const loadSampleData = () => {
    setFormData({
      question_en: "Does Islam promote violence?",
      question_hi: "क्या इस्लाम हिंसा को बढ़ावा देता है?",
      answer_en: "No, Islam does not promote violence. Islam is a religion of peace, and its name literally means 'peace'. The Quran emphasizes peace, justice, and compassion.",
      answer_hi: "नहीं, इस्लाम हिंसा को प्रोत्साहित नहीं करता। इस्लाम शांति का धर्म है और इसके नाम का शाब्दिक अर्थ 'शांति' है। कुरान शांति, न्याय और दया पर जोर देता है।",
      answer_ur: "نہیں، اسلام تشدد کو فروغ نہیں دیتا۔ اسلام امن کا مذہب ہے اور اس کے نام کا لغوی معنی 'امن' ہے۔ قرآن امن، انصاف اور ہمدردی پر زور دیتا ہے۔",
      tags: "islam, peace, violence, misconceptions",
      category: "Basic Beliefs",
      references: {
        quran: [{
          surah_en: "Al-Baqarah",
          surah_hi: "अल-बक़रा",
          ayah: "256",
          verse_en: "There shall be no compulsion in [acceptance of] the religion.",
          verse_hi: "धर्म के मामले में कोई जबरदस्ती नहीं है।",
          meaning_en: "Everyone has freedom to choose their faith",
          meaning_hi: "हर किसी को अपने विश्वास को चुनने की स्वतंत्रता है"
        }],
        hadith: [{
          source_en: "Sahih Bukhari",
          source_hi: "सहीह बुखारी",
          number: "13",
          text_en: "A Muslim is one from whose tongue and hand other Muslims are safe.",
          text_hi: "मुसलमान वह है जिसकी जीभ और हाथ से दूसरे मुसलमान सुरक्षित रहें।"
        }],
        videos: [{
          title_en: "Does Islam Promote Violence?",
          title_hi: "क्या इस्लाम हिंसा को बढ़ावा देता है?",
          url: "https://youtube.com/watch?v=example",
          scholar: "Dr. Zakir Naik"
        }]
      }
    });
    setMessage({ type: 'info', text: 'Sample data loaded in NEW bilingual format!' });
  };

  const clearForm = () => {
    setFormData({
      question_en: '',
      question_hi: '',
      answer_en: '',
      answer_hi: '',
      answer_ur: '',
      tags: '',
      category: '',
      references: {
        quran: [],
        hadith: [],
        videos: []
      }
    });
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-800">Add New Question</h2>
          <p className="text-gray-600 mt-2">Bilingual format - English + Hindi support</p>
        </div>

        {message.text && (
          <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 
            message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 
            'bg-blue-50 text-blue-700 border border-blue-200'}`}>
            {message.text}
          </div>
        )}

        {/* Question Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Question (English) *
            </label>
            <input
              type="text"
              name="question_en"
              value={formData.question_en}
              onChange={handleInputChange}
              placeholder="What is Islam?"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Required</p>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Question (Hindi) - Optional
            </label>
            <input
              type="text"
              name="question_hi"
              value={formData.question_hi}
              onChange={handleInputChange}
              placeholder="इस्लाम क्या है?"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-hindi"
            />
            <p className="text-sm text-gray-500 mt-1">Optional</p>
          </div>
        </div>

        {/* Tags & Category */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleTagsChange}
              placeholder="islam, peace, beliefs, quran"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Basic Beliefs, Practices, History"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Answers Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800">Answers</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                English Answer *
              </label>
              <textarea
                name="answer_en"
                value={formData.answer_en}
                onChange={handleInputChange}
                rows="8"
                placeholder="Islam is a monotheistic religion..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Hindi Answer - Optional
              </label>
              <textarea
                name="answer_hi"
                value={formData.answer_hi}
                onChange={handleInputChange}
                rows="8"
                placeholder="इस्लाम एक एकेश्वरवादी धर्म है..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-hindi"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Urdu Answer - Optional
              </label>
              <textarea
                name="answer_ur"
                value={formData.answer_ur}
                onChange={handleInputChange}
                rows="8"
                placeholder="اسلام ایک توحیدی مذہب ہے..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-urdu text-right"
                dir="rtl"
              />
            </div>
          </div>
        </div>

        {/* Quran References */}
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="mr-2 text-green-600">📖</span> Quran References
            </h3>
            <button
              type="button"
              onClick={addQuran}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
            >
              + Add Quran Reference
            </button>
          </div>
          
          {formData.references.quran.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">No Quran references added</p>
              <p className="text-sm text-gray-400 mt-1">Click the button above to add</p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.references.quran.map((quran, index) => (
                <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-green-800">Quran Reference #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeQuran(index)}
                      className="text-red-500 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Surah (English)</label>
                      <input
                        type="text"
                        value={quran.surah_en}
                        onChange={(e) => updateQuran(index, 'surah_en', e.target.value)}
                        placeholder="Al-Baqarah"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Surah (Hindi)</label>
                      <input
                        type="text"
                        value={quran.surah_hi}
                        onChange={(e) => updateQuran(index, 'surah_hi', e.target.value)}
                        placeholder="अल-बक़रा"
                        className="w-full p-2 border rounded font-hindi"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Ayah Number</label>
                    <input
                      type="text"
                      value={quran.ayah}
                      onChange={(e) => updateQuran(index, 'ayah', e.target.value)}
                      placeholder="256"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Verse (English)</label>
                      <textarea
                        value={quran.verse_en}
                        onChange={(e) => updateQuran(index, 'verse_en', e.target.value)}
                        placeholder="There shall be no compulsion in religion"
                        rows="2"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Verse (Hindi)</label>
                      <textarea
                        value={quran.verse_hi}
                        onChange={(e) => updateQuran(index, 'verse_hi', e.target.value)}
                        placeholder="धर्म में कोई जबरदस्ती नहीं है"
                        rows="2"
                        className="w-full p-2 border rounded font-hindi"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Meaning (English)</label>
                      <input
                        type="text"
                        value={quran.meaning_en}
                        onChange={(e) => updateQuran(index, 'meaning_en', e.target.value)}
                        placeholder="Everyone has religious freedom"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Meaning (Hindi)</label>
                      <input
                        type="text"
                        value={quran.meaning_hi}
                        onChange={(e) => updateQuran(index, 'meaning_hi', e.target.value)}
                        placeholder="हर किसी को धार्मिक स्वतंत्रता है"
                        className="w-full p-2 border rounded font-hindi"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hadith References */}
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="mr-2 text-purple-600">📚</span> Hadith References
            </h3>
            <button
              type="button"
              onClick={addHadith}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
            >
              + Add Hadith
            </button>
          </div>
          
          {formData.references.hadith.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">No Hadith references added</p>
              <p className="text-sm text-gray-400 mt-1">Click the button above to add</p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.references.hadith.map((hadith, index) => (
                <div key={index} className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-purple-800">Hadith Reference #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeHadith(index)}
                      className="text-red-500 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Source (English)</label>
                      <input
                        type="text"
                        value={hadith.source_en}
                        onChange={(e) => updateHadith(index, 'source_en', e.target.value)}
                        placeholder="Sahih Bukhari"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Source (Hindi)</label>
                      <input
                        type="text"
                        value={hadith.source_hi}
                        onChange={(e) => updateHadith(index, 'source_hi', e.target.value)}
                        placeholder="सहीह बुखारी"
                        className="w-full p-2 border rounded font-hindi"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Hadith Number</label>
                    <input
                      type="text"
                      value={hadith.number}
                      onChange={(e) => updateHadith(index, 'number', e.target.value)}
                      placeholder="13"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Text (English)</label>
                      <textarea
                        value={hadith.text_en}
                        onChange={(e) => updateHadith(index, 'text_en', e.target.value)}
                        placeholder="A Muslim is one from whose tongue and hand other Muslims are safe"
                        rows="3"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Text (Hindi)</label>
                      <textarea
                        value={hadith.text_hi}
                        onChange={(e) => updateHadith(index, 'text_hi', e.target.value)}
                        placeholder="मुसलमान वह है जिसकी जीभ और हाथ से दूसरे मुसलमान सुरक्षित रहें"
                        rows="3"
                        className="w-full p-2 border rounded font-hindi"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Video References */}
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="mr-2 text-red-600">🎬</span> Video References
            </h3>
            <button
              type="button"
              onClick={addVideo}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
            >
              + Add Video
            </button>
          </div>
          
          {formData.references.videos.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">No video references added</p>
              <p className="text-sm text-gray-400 mt-1">Click the button above to add</p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.references.videos.map((video, index) => (
                <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-red-800">Video Reference #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeVideo(index)}
                      className="text-red-500 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Title (English)</label>
                      <input
                        type="text"
                        value={video.title_en}
                        onChange={(e) => updateVideo(index, 'title_en', e.target.value)}
                        placeholder="Does Islam Promote Violence?"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Title (Hindi)</label>
                      <input
                        type="text"
                        value={video.title_hi}
                        onChange={(e) => updateVideo(index, 'title_hi', e.target.value)}
                        placeholder="क्या इस्लाम हिंसा को बढ़ावा देता है?"
                        className="w-full p-2 border rounded font-hindi"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">YouTube URL</label>
                    <input
                      type="url"
                      value={video.url}
                      onChange={(e) => updateVideo(index, 'url', e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Scholar Name</label>
                    <input
                      type="text"
                      value={video.scholar}
                      onChange={(e) => updateVideo(index, 'scholar', e.target.value)}
                      placeholder="Dr. Zakir Naik"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-between pt-6 border-t">
          <div className="space-x-3">
            <button
              type="button"
              onClick={loadSampleData}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
            >
              Load Sample
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Clear Form
            </button>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold text-lg"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Question...
              </span>
            ) : 'Add Question (Bilingual)'}
          </button>
        </div>

        {/* Info Box */}
        {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <div className="flex items-start">
            <div className="text-blue-500 mr-3 mt-1">💡</div>
            <div>
              <h4 className="font-bold text-blue-800">New Bilingual Format</h4>
              <ul className="text-blue-700 text-sm mt-2 space-y-1">
                <li>✅ <strong>question_en</strong> - English question (Required)</li>
                <li>✅ <strong>question_hi</strong> - Hindi question (Optional)</li>
                <li>✅ <strong>answer_en</strong> - English answer (Required)</li>
                <li>✅ <strong>answer_hi</strong> - Hindi answer (Optional)</li>
                <li>✅ All references support bilingual text</li>
                <li>❌ Old format (question, answer.en) is no longer accepted</li>
              </ul>
            </div>
          </div>
        </div> */}
      </form>
    </div>
  );
};

export default AddQuestionForm;