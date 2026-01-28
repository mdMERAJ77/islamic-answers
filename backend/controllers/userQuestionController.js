// backend/controllers/userQuestionController.js - UPDATED
import UserQuestion from '../models/UserQuestion.js';

// Submit a new question from user - WITH VALIDATION
export const submitUserQuestion = async (req, res) => {
  try {
    const { question, email } = req.body;

    // === VALIDATION CHECKS ===
    
    // 1. Required field check
    if (!question || question.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Question is required.'
      });
    }

    // 2. Minimum length check (10 characters)
    if (question.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Question must be at least 10 characters long.'
      });
    }

    // 3. Maximum length check (500 characters)
    if (question.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'Question is too long (maximum 500 characters).'
      });
    }

    // 4. Email validation (if provided)
    if (email && email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid email address.'
        });
      }
    }

    // 5. Duplicate question check (last 24 hours from same IP)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const existingQuestion = await UserQuestion.findOne({
      $or: [
        { question: { $regex: new RegExp(question.substring(0, 30), 'i') } },
        { ipAddress: req.ip }
      ],
      createdAt: { $gte: twentyFourHoursAgo }
    });

    if (existingQuestion) {
      return res.status(400).json({
        success: false,
        error: 'Similar question already submitted recently. Please check existing questions.'
      });
    }

    // 6. Spam word filter (basic)
    const spamWords = [
      'http://', 'https://', 'www.', '.com', '.net', '.org',
      'buy', 'sell', 'cheap', 'offer', 'discount', 'click here',
      'viagra', 'casino', 'loan', 'insurance'
    ];
    
    const containsSpam = spamWords.some(word => 
      question.toLowerCase().includes(word.toLowerCase())
    );
    
    if (containsSpam) {
      return res.status(400).json({
        success: false,
        error: 'Question contains suspicious content. Please rephrase.'
      });
    }

    // === SAVE QUESTION ===
    const newQuestion = new UserQuestion({
      question: question.trim(),
      email: email ? email.trim() : null,
      ipAddress: req.ip, // Store IP for tracking
      userAgent: req.headers['user-agent'] // Store browser info
    });

    await newQuestion.save();

    res.status(201).json({
      success: true,
      message: 'Question submitted successfully! Admin will review it shortly.',
      data: {
        id: newQuestion._id,
        question: newQuestion.question,
        submittedAt: newQuestion.createdAt
      }
    });

  } catch (error) {
    console.error('Error submitting question:', error);
    
    // Handle specific errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid question data. Please check your input.'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to submit question. Please try again later.'
    });
  }
};

// Get all user questions (for admin)
export const getUserQuestions = async (req, res) => {
  try {
    const questions = await UserQuestion.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch questions'
    });
  }
};

// Delete a user question
export const deleteUserQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestion = await UserQuestion.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({
        success: false,
        error: 'Question not found'
      });
    }

    res.json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete question'
    });
  }
};