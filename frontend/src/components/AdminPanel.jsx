// src/components/AdminPanel.jsx - FIXED VERSION
import { useState, useEffect } from "react";
import axios from "axios";
import AddQuestionForm from "./AddQuestionForm";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("questions");
  const [userQuestions, setUserQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Check if admin is logged in
  useEffect(() => {
    const checkAdminAuth = async () => {
      setAuthLoading(true);
      try {
        const response = await axios.get(
          "https://islamic-answers-backend.onrender.com/api/auth/check",
          { withCredentials: true },
        );

        if (!response.data.isAuthenticated) {
          alert("Please login as admin first!");
          window.location.href = "/admin";
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        alert("Session expired. Please login again.");
        window.location.href = "/admin";
      } finally {
        setAuthLoading(false);
      }
    };

    checkAdminAuth();
  }, []);

  useEffect(() => {
    if (activeTab === "user-questions") {
      fetchUserQuestions();
    }
  }, [activeTab]);

  const fetchUserQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://islamic-answers-backend.onrender.com/api/user-questions",
        { withCredentials: true },
      );
      setUserQuestions(response.data.data || []);
    } catch (error) {
      console.error("Error fetching user questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuestionStatus = async (id, status) => {
    try {
      await axios.put(
        `https://islamic-answers-backend.onrender.com/api/user-questions/${id}`,
        { status },
        { withCredentials: true },
      );
      fetchUserQuestions();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://islamic-answers-backend.onrender.com/api/auth/logout",
        {},
        { withCredentials: true },
      );
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("questions")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "questions"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Add New Question
          </button>
          <button
            onClick={() => setActiveTab("user-questions")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "user-questions"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            User Questions ({userQuestions.length})
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "questions" ? (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Add New Question with Answer
            </h2>
            <AddQuestionForm />
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Questions from Users
            </h2>
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : userQuestions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No questions from users yet.
              </p>
            ) : (
              <div className="space-y-4">
                {userQuestions.map((q) => (
                  <div
                    key={q._id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {q.question}
                        </h3>
                        {q.description && (
                          <p className="text-gray-600 mt-1">{q.description}</p>
                        )}
                        {q.userEmail && (
                          <p className="text-sm text-gray-500 mt-1">
                            Email: {q.userEmail}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          Submitted:{" "}
                          {new Date(q.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            q.status === "answered"
                              ? "bg-green-100 text-green-800"
                              : q.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {q.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => updateQuestionStatus(q._id, "answered")}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                      >
                        Mark Answered
                      </button>
                      <button
                        onClick={() => updateQuestionStatus(q._id, "pending")}
                        className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm hover:bg-yellow-200"
                      >
                        Mark Pending
                      </button>
                      <button
                        onClick={() => updateQuestionStatus(q._id, "rejected")}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
