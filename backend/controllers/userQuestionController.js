// backend/controllers/userQuestionController.js - FINAL WORKING VERSION
import UserQuestion from '../models/UserQuestion.js';

// Submit a new question from user - WITH 24-HOUR LIMIT
export const submitUserQuestion = async (req, res) => {
  try {
    const { question, email } = req.body;

    // === 1. EMAIL REQUIRED CHECK (24-hour limit ke liye) ===
    if (!email || email.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Email required for 24-hour limit',
        message: 'Apna email daaliye taki 24-hour limit check ho sake'
      });
    }

    // === 2. EMAIL VALIDATION ===
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Valid email daaliye',
        message: 'Format: example@gmail.com'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // === 3. 24-HOUR LIMIT CHECK ===
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    // Check by email (last 24 hours)
    const existingByEmail = await UserQuestion.findOne({
      email: cleanEmail,
      createdAt: { $gte: oneDayAgo }
    });
    
    if (existingByEmail) {
      const hoursLeft = 24 - Math.floor((Date.now() - existingByEmail.createdAt) / (60 * 60 * 1000));
      const minutesLeft = Math.floor(((existingByEmail.createdAt.getTime() + 24 * 60 * 60 * 1000) - Date.now()) / (60 * 1000));
      
      return res.status(429).json({
        success: false,
        error: '24 hours mein sirf 1 question!',
        message: `Aap ${hoursLeft} hours ${minutesLeft % 60} minutes baad naya question puch sakte hain`,
        details: {
          lastQuestion: existingByEmail.question.substring(0, 100) + '...',
          lastAsked: existingByEmail.createdAt.toLocaleString('en-IN'),
          status: existingByEmail.status,
          nextQuestionTime: new Date(existingByEmail.createdAt.getTime() + 24 * 60 * 60 * 1000).toLocaleString('en-IN')
        }
      });
    }

    // === 4. IP ADDRESS CHECK (Extra security) ===
    const existingByIP = await UserQuestion.findOne({
      ipAddress: req.ip,
      createdAt: { $gte: oneDayAgo }
    });
    
    if (existingByIP) {
      const hoursLeft = 24 - Math.floor((Date.now() - existingByIP.createdAt) / (60 * 60 * 1000));
      return res.status(429).json({
        success: false,
        error: '24 hours mein sirf 1 question!',
        message: `Aapke device/IP se ${hoursLeft} hours baad naya question puch sakte hain`
      });
    }

    // === 5. QUESTION VALIDATION ===
    
    // Required field check
    if (!question || question.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Question is required.'
      });
    }

    const cleanQuestion = question.trim();

    // Minimum length check
    if (cleanQuestion.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Question must be at least 10 characters long.'
      });
    }

    // Maximum length check
    if (cleanQuestion.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'Question is too long (maximum 500 characters).'
      });
    }

    // Spam word filter
    const spamWords = [
      'http://', 'https://', 'www.', '.com', '.net', '.org',
      'buy', 'sell', 'cheap', 'offer', 'discount', 'click here',
      'viagra', 'casino', 'loan', 'insurance'
    ];
    
    const containsSpam = spamWords.some(word => 
      cleanQuestion.toLowerCase().includes(word.toLowerCase())
    );
    
    if (containsSpam) {
      return res.status(400).json({
        success: false,
        error: 'Question contains suspicious content. Please rephrase.'
      });
    }

    // === 6. SAVE QUESTION ===
    const newQuestion = new UserQuestion({
      question: cleanQuestion,
      email: cleanEmail,
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
        nextQuestionTime: new Date(newQuestion.createdAt.getTime() + 24 * 60 * 60 * 1000),
        note: '24 hours ke baad hi naya question puch sakte hain. Status check karne ke liye apna email use karein.'
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

// Check question status by email
export const checkQuestionStatus = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email address required'
      });
    }
    
    const cleanEmail = email.toLowerCase().trim();
    const questions = await UserQuestion.find({
      email: cleanEmail
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
      let statusEmoji = '';
      
      if (q.status === 'pending') {
        statusText = 'Pending - Under review';
        statusEmoji = '⏳';
      } else if (q.status === 'answered') {
        statusText = 'Answered';
        statusEmoji = '✅';
      } else if (q.status === 'rejected') {
        statusText = 'Rejected';
        statusEmoji = '❌';
      }
      
      // Check if user can ask new question
      const timeSinceLastQuestion = Date.now() - q.createdAt;
      const canAskNew = timeSinceLastQuestion > 24 * 60 * 60 * 1000;
      const hoursLeft = canAskNew ? 0 : Math.floor((24 * 60 * 60 * 1000 - timeSinceLastQuestion) / (60 * 60 * 1000));
      
      return {
        id: q._id,
        question: q.question,
        status: q.status,
        statusText: `${statusEmoji} ${statusText}`,
        submittedOn: q.createdAt.toLocaleDateString('en-IN'),
        submittedAt: q.createdAt.toLocaleTimeString('en-IN'),
        answeredOn: q.answeredAt ? q.answeredAt.toLocaleDateString('en-IN') : null,
        answeredAt: q.answeredAt ? q.answeredAt.toLocaleTimeString('en-IN') : null,
        answer: q.answer || 'Not answered yet',
        adminNote: q.adminNote || '',
        canAskNew: canAskNew,
        hoursLeft: hoursLeft,
        nextQuestionTime: canAskNew ? 'Now' : 
          new Date(q.createdAt.getTime() + 24 * 60 * 60 * 1000).toLocaleString('en-IN')
      };
    });
    
    const canAskNewQuestion = formatted.length > 0 ? formatted[0].canAskNew : true;
    
    res.json({
      success: true,
      count: questions.length,
      canAskNew: canAskNewQuestion,
      nextQuestionTime: canAskNewQuestion ? 'Now' : formatted[0]?.nextQuestionTime,
      questions: formatted,
      message: `Found ${questions.length} question(s)`
    });
    
  } catch (error) {
    console.error('Error checking status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check status'
    });
  }
};