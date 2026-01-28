// backend/controllers/userQuestionController.js - FINAL WORKING
import UserQuestion from '../models/UserQuestion.js';

// Submit a new question from user - WITH 24-HOUR LIMIT
export const submitUserQuestion = async (req, res) => {
  try {
    console.log('🔥 FULL REQUEST BODY:', req.body);
    console.log('🔥 REQUEST HEADERS:', req.headers['content-type']);
    
    // ✅ FIX: Check multiple possible email field names
    const { question } = req.body;
    
    // Try different email field names that frontend might use
    const email = req.body.email || 
                  req.body.userEmail || 
                  req.body.user_email ||
                  req.body.useremail ||
                  req.body.Email ||
                  req.body.eMail;
    
    console.log('Extracted email:', email);
    console.log('Extracted question:', question);
    
    // ✅ MINIMAL VALIDATION ONLY
    if (!email || email.trim() === '') {
      return res.status(400).json({
        success: false, 
        error: 'Email required. Please provide your email address.',
        receivedBody: req.body // Debug info
      });
    }
    
    if (!question || question.trim().length < 5) {
      return res.status(400).json({
        success: false, 
        error: 'Question too short (minimum 5 characters)'
      });
    }
    
    // ✅ SIMPLE 24-HOUR CHECK
    const cleanEmail = email.toLowerCase().trim();
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const existing = await UserQuestion.findOne({
      email: cleanEmail,
      createdAt: { $gte: oneDayAgo }
    });
    
    if (existing) {
      return res.status(400).json({
        success: false,
        error: '24-hour limit reached! You can ask only 1 question every 24 hours.',
        nextQuestionTime: new Date(existing.createdAt.getTime() + 24 * 60 * 60 * 1000)
      });
    }
    
    // ✅ SAVE
    const newQ = new UserQuestion({
      question: question.trim(),
      email: cleanEmail,
      ipAddress: req.ip || 'unknown',
      status: 'pending'
    });
    
    await newQ.save();
    
    res.json({
      success: true,
      message: 'Question submitted successfully! Admin will review it.',
      data: {
        id: newQ._id,
        question: newQ.question,
        status: newQ.status,
        nextQuestionTime: new Date(newQ.createdAt.getTime() + 24 * 60 * 60 * 1000)
      }
    });
    
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).json({
      success: false,
      error: 'Server error: ' + error.message
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
      let statusText = 'Pending';
      if (q.status === 'answered') statusText = 'Answered';
      if (q.status === 'rejected') statusText = 'Rejected';
      
      return {
        id: q._id,
        question: q.question,
        status: q.status,
        statusText: statusText,
        submittedOn: q.createdAt.toLocaleDateString('en-IN'),
        submittedAt: q.createdAt.toLocaleTimeString('en-IN'),
        answeredOn: q.answeredAt ? q.answeredAt.toLocaleDateString('en-IN') : null,
        answer: q.answer || 'Not answered yet'
      };
    });
    
    res.json({
      success: true,
      count: questions.length,
      questions: formatted
    });
    
  } catch (error) {
    console.error('Error checking status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check status'
    });
  }
};