// controllers/userQuestionController.js
import UserQuestion from "../models/UserQuestion.js";

// User raises a question
export const raiseQuestion = async (req, res) => {
  try {
    const { question, description, userEmail } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const newQuestion = await UserQuestion.create({
      question,
      description,
      userEmail,
    });

    res.status(201).json({
      success: true,
      message: "Question submitted successfully! Admin will review it.",
      data: newQuestion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin gets all user questions
export const getUserQuestions = async (req, res) => {
  try {
    const questions = await UserQuestion.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Admin updates question status
export const updateQuestionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, answeredBy } = req.body;

    const question = await UserQuestion.findById(id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    question.status = status || question.status;
    if (answeredBy) question.answeredBy = answeredBy;

    await question.save();

    res.json({
      success: true,
      message: "Question status updated",
      data: question,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};