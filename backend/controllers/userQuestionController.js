// backend/controllers/userQuestionController.js - UPDATED
import UserQuestion from '../models/UserQuestion.js';

// Submit a new question from user - WITH VALIDATION
// Submit a new question from user - WITH 24-HOUR LIMIT
export const submitUserQuestion = async (req, res) => {
  try {
    const { question, email } = req.body;

    // === 1. 24-HOUR LIMIT CHECK (SABSE PEHLE) ===
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    // Check by email OR IP (last 24 hours)
    const existingQuestion = await UserQuestion.findOne({
      $or: [
        { email: email ? email.toLowerCase().trim() : null },
        { ipAddress: req.ip }
      ],
      createdAt: { $gte: oneDayAgo }
    });
    
    if (existingQuestion) {
      const hoursLeft = 24 - Math.floor((Date.now() - existingQuestion.createdAt) / (60 * 60 * 1000));
      
      return res.status(429).json({
        success: false,
        error: '24 hours mein sirf 1 question!',
        message: `Aap ${hoursLeft} hours baad naya question puch sakte hain`,
        previousQuestion: {
          id: existingQuestion._id,
          question: existingQuestion.question.substring(0, 80) + '...',
          status: existingQuestion.status,
          askedOn: existingQuestion.createdAt.toLocaleDateString('en-IN'),
          askedAt: existingQuestion.createdAt.toLocaleTimeString('en-IN')
        },
        nextQuestionTime: new Date(existingQuestion.createdAt.getTime() + 24 * 60 * 60 * 1000)
      });
    }

    // === 2. VALIDATION CHECKS ===
    
    // Required field check
    if (!question || question.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Question is required.'
      });
    }

    // Minimum length check (10 characters)
    if (question.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Question must be at least 10 characters long.'
      });
    }

    // Maximum length check (500 characters)
    if (question.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'Question is too long (maximum 500 characters).'
      });
    }

    // Email validation (if provided)
    if (email && email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid email address.'
        });
      }
    }

    // Spam word filter (basic)
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

    // === 3. SAVE QUESTION ===
    const newQuestion = new UserQuestion({
      question: question.trim(),
      email: email ? email.trim().toLowerCase() : null,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      status: 'pending'
    });

    await newQuestion.save();

    res.status(201).json({
      success: true,
      message: 'Question submitted successfully! Admin will review it shortly.',
      data: {
        id: newQuestion._id,
        question: newQuestion.question,
        status: newQuestion.status,
        submittedAt: newQuestion.createdAt,
        note: '24 hours ke baad hi naya question puch sakte hain'
      }
    });

  } catch (error) {
    console.error('Error submitting question:', error);
    
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

// ✅ Check question status by email
// ✅ Check question status by email
export const checkQuestionStatus = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email address required'
      });
    }
    
    const questions = await UserQuestion.find({
      email: email.toLowerCase().trim()
    }).sort({ createdAt: -1 }).limit(10);
    
    if (questions.length === 0) {
      return res.json({
        success: true,
        message: 'No questions found for this email',
        questions: []
      });
    }
    
    const formatted = questions.map(q => {
      let statusText = '';
      if (q.status === 'pending') statusText = '⏳ Pending - Under review';
      if (q.status === 'answered') statusText = '✅ Answered';
      if (q.status === 'rejected') statusText = '❌ Rejected';
      
      // Check if user can ask new question
      const canAskNew = !q.createdAt || 
        (Date.now() - q.createdAt) > 24 * 60 * 60 * 1000;
      
      return {
        id: q._id,
        question: q.question,
        status: q.status,
        statusText: statusText,
        submittedOn: q.createdAt.toLocaleDateString('en-IN'),
        submittedAt: q.createdAt.toLocaleTimeString('en-IN'),
        answeredOn: q.answeredAt ? q.answeredAt.toLocaleDateString('en-IN') : null,
        answer: q.answer || 'Not answered yet',
        adminNote: q.adminNote || '',
        canAskNew: canAskNew,
        nextQuestionTime: canAskNew ? null : 
          new Date(q.createdAt.getTime() + 24 * 60 * 60 * 1000).toLocaleString('en-IN')
      };
    });
    
    res.json({
      success: true,
      count: questions.length,
      questions: formatted,
      message: questions.length > 0 ? 
        `Found ${questions.length} question(s)` : 
        'No questions found'
    });
    
  } catch (error) {
    console.error('Error checking status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check status'
    });
  }
};