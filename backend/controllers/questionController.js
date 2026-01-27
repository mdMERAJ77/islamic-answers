import Question from "../models/Question.js";

// Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions); // ✅ returns array
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get single question by ID
export const getQuestionBySlug = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id); // ⚠ use ID, not slug
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add new question (Admin only)
export const addQuestion = async (req, res) => {
  try {
    const { question, answer, references } = req.body;

    if (!question || !answer?.en) {
      return res.status(400).json({
        success: false,
        message: "Question and English answer are required",
      });
    }

    const newQuestion = await Question.create({
      question,
      answer,
      references,
    });

    res.status(201).json({
      success: true,
      data: newQuestion,
    });
  } catch (error) {
    console.error(error); // 🔹 always log error
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
