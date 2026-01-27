// src/components/AddQuestionForm.jsx
import { useState } from 'react';
import axios from 'axios';

const AddQuestionForm = () => {
  const [formData, setFormData] = useState({
    question: '',
    answer: {
      en: '',
      hi: '',
      ur: ''
    },
    references: {
      quran: [],
      hadith: [],
      videos: []
    }
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('answer.')) {
      const lang = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        answer: {
          ...prev.answer,
          [lang]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Add Quran reference
  const addQuran = () => {
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        quran: [...prev.references.quran, { surah: '', ayah: '', text: '' }]
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

  // Add Hadith reference
  const addHadith = () => {
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        hadith: [...prev.references.hadith, { source: '', number: '', text: '' }]
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

  // Add Video reference
  const addVideo = () => {
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        videos: [...prev.references.videos, { title: '', url: '', scholar: '' }]
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.question.trim()) {
      setMessage('Please enter the question');
      return;
    }

    if (!formData.answer.en.trim()) {
      setMessage('English answer is required');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Filter out empty references
      const references = {};
      
      if (formData.references.quran.length > 0) {
        references.quran = formData.references.quran.filter(q => 
          q.surah.trim() || q.ayah.trim() || q.text.trim()
        );
      }
      
      if (formData.references.hadith.length > 0) {
        references.hadith = formData.references.hadith.filter(h => 
          h.source.trim() || h.number.trim() || h.text.trim()
        );
      }
      
      if (formData.references.videos.length > 0) {
        references.videos = formData.references.videos.filter(v => 
          v.title.trim() || v.url.trim() || v.scholar.trim()
        );
      }

      const dataToSend = {
        question: formData.question,
        answer: formData.answer,
        references: references
      };

      console.log("Sending data:", dataToSend); // Debug

      const response = await axios.post(
        'http://localhost:5000/api/questions',
        dataToSend,
        { withCredentials: true }
      );

      if (response.data.success) {
        setMessage('✅ Question added successfully!');
        // Reset form
        setFormData({
          question: '',
          answer: { en: '', hi: '', ur: '' },
          references: {
            quran: [],
            hadith: [],
            videos: []
          }
        });
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Error adding question');
    } finally {
      setLoading(false);
    }
  };

  const loadSampleData = () => {
    setFormData({
      question: "Does Islam promote violence?",
      answer: {
        en: "No, Islam does not promote violence. Islam is a religion of peace, and its name literally means 'peace'. The Quran emphasizes peace, justice, and compassion.",
        hi: "नहीं, इस्लाम हिंसा को प्रोत्साहित नहीं करता। इस्लाम शांति का धर्म है और इसके नाम का शाब्दिक अर्थ 'शांति' है।",
        ur: "نہیں، اسلام تشدد کو فروغ نہیں دیتا۔ اسلام امن کا مذہب ہے اور اس کے نام کا لغوی معنی 'امن' ہے۔"
      },
      references: {
        quran: [
          { 
            surah: "Al-Baqarah", 
            ayah: "256", 
            text: "There shall be no compulsion in [acceptance of] the religion." 
          }
        ],
        hadith: [
          { 
            source: "Sahih Bukhari", 
            number: "13", 
            text: "A Muslim is one from whose tongue and hand other Muslims are safe." 
          }
        ],
        videos: [
          { 
            title: "Does Islam Promote Violence?", 
            url: "https://youtube.com/watch?v=example", 
            scholar: "Dr. Zakir Naik" 
          }
        ]
      }
    });
    setMessage('Sample data loaded. You can edit it.');
  };

  const clearForm = () => {
    setFormData({
      question: '',
      answer: { en: '', hi: '', ur: '' },
      references: {
        quran: [],
        hadith: [],
        videos: []
      }
    });
    setMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Question</h2>
        <p className="text-gray-600 mb-6">Question in English, answers in 3 languages, references with Quran, Hadith & Videos</p>

        {/* Question */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Question (English) *
          </label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            placeholder="Enter question in English..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Answers Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* English Answer */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Answer (English) *
            </label>
            <textarea
              name="answer.en"
              value={formData.answer.en}
              onChange={handleInputChange}
              rows="6"
              placeholder="Enter answer in English..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Hindi Answer */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Answer (Hindi) - Optional
            </label>
            <textarea
              name="answer.hi"
              value={formData.answer.hi}
              onChange={handleInputChange}
              rows="6"
              placeholder="Enter answer in Hindi..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-hindi"
            />
          </div>

          {/* Urdu Answer */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Answer (Urdu) - Optional
            </label>
            <textarea
              name="answer.ur"
              value={formData.answer.ur}
              onChange={handleInputChange}
              rows="6"
              placeholder="Enter answer in Urdu..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-urdu text-right"
              dir="rtl"
            />
          </div>
        </div>

        {/* Quran References */}
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <span className="mr-2">📖</span> Quran References (Optional)
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
            <p className="text-gray-500 text-center py-4">No Quran references added</p>
          ) : (
            <div className="space-y-4">
              {formData.references.quran.map((quran, index) => (
                <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-green-800">Quran Reference #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeQuran(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕ Remove
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-3 mb-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Surah</label>
                      <input
                        type="text"
                        value={quran.surah}
                        onChange={(e) => updateQuran(index, 'surah', e.target.value)}
                        placeholder="e.g., Al-Baqarah"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Ayah</label>
                      <input
                        type="text"
                        value={quran.ayah}
                        onChange={(e) => updateQuran(index, 'ayah', e.target.value)}
                        placeholder="e.g., 256"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Quran Text</label>
                    <textarea
                      value={quran.text}
                      onChange={(e) => updateQuran(index, 'text', e.target.value)}
                      placeholder="Enter the Quran text..."
                      rows="2"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hadith References */}
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <span className="mr-2">📚</span> Hadith References (Optional)
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
            <p className="text-gray-500 text-center py-4">No Hadith references added</p>
          ) : (
            <div className="space-y-4">
              {formData.references.hadith.map((hadith, index) => (
                <div key={index} className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-purple-800">Hadith #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeHadith(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕ Remove
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-3 mb-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Source</label>
                      <input
                        type="text"
                        value={hadith.source}
                        onChange={(e) => updateHadith(index, 'source', e.target.value)}
                        placeholder="e.g., Sahih Bukhari"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Number</label>
                      <input
                        type="text"
                        value={hadith.number}
                        onChange={(e) => updateHadith(index, 'number', e.target.value)}
                        placeholder="e.g., 13"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Hadith Text</label>
                    <textarea
                      value={hadith.text}
                      onChange={(e) => updateHadith(index, 'text', e.target.value)}
                      placeholder="Enter the Hadith text..."
                      rows="2"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Video References */}
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <span className="mr-2">🎬</span> Video References (Optional)
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
            <p className="text-gray-500 text-center py-4">No video references added</p>
          ) : (
            <div className="space-y-4">
              {formData.references.videos.map((video, index) => (
                <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-red-800">Video #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeVideo(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕ Remove
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Video Title</label>
                      <input
                        type="text"
                        value={video.title}
                        onChange={(e) => updateVideo(index, 'title', e.target.value)}
                        placeholder="e.g., Does Islam Promote Violence?"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    
                    <div>
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
                        placeholder="e.g., Dr. Zakir Naik"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
            {message}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-between pt-6 border-t">
          <div className="space-x-3">
            <button
              type="button"
              onClick={loadSampleData}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Load Sample
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Clear Form
            </button>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
          >
            {loading ? 'Adding Question...' : 'Add Question'}
          </button>
        </div>

        {/* Quick Info */}
        <div className="text-sm text-gray-500 mt-4">
          <p>📝 <strong>Note:</strong> English question and answer are required. Hindi and Urdu answers are optional.</p>
          <p>🎯 Quran, Hadith and Video references are optional but recommended for authenticity.</p>
        </div>
      </form>
    </div>
  );
};

export default AddQuestionForm;