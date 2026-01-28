// src/components/RaiseQuestion.jsx
import { useState } from "react";
import axios from "axios";

const RaiseQuestion = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    question: "",
    description: "",
    userEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.question.trim()) {
      setError("Please enter your question");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://islamic-answers-backend.onrender.com/api/user-questions",
        formData,
      );

      // ✅ SUCCESS POPUP
      if (response.data.success) {
        alert(
          `✅ Question Submitted Successfully!\n\n"${formData.question}"\n\nWe will review your question and provide an authentic answer with Quran & Hadith references.`,
        );

        setFormData({
          question: "",
          description: "",
          userEmail: "",
        });
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.log(err);
      // ✅ SIMPLE - ALWAYS SHOW 24 HOUR POPUP
      alert(
        "⏰ 24 Hour Limit\n\nYou can submit only 1 question per 24 hours.\n\nPlease wait 24 hours.",
      );

      setError("You have already submitted a question. Please wait 24 hours.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-bold mb-2">
          Your Question *
        </label>
        <input
          type="text"
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="e.g., What is the Islamic view on..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-bold mb-2">
          More Details (Optional)
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add more context or background..."
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-bold mb-2">
          Your Email (Optional - for updates)
        </label>
        <input
          type="email"
          name="userEmail"
          value={formData.userEmail}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg">{error}</div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() =>
            setFormData({
              question: "",
              description: "",
              userEmail: "",
            })
          }
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Question"}
        </button>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        <p>
          Note: Your question will be reviewed by admin before being answered.
          You'll receive an email if you provided one.
        </p>
      </div>
    </form>
  );
};

export default RaiseQuestion;
