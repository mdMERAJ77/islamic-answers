// backend/controllers/userQuestionController.js - FINAL WORKING
import UserQuestion from '../models/UserQuestion.js';

// Submit a new question from user - WITH 24-HOUR LIMIT
export const submitUserQuestion = async (req, res) => {
  try {
    console.log('=== 🔥 NEW REQUEST STARTED ===');
    console.log('Request IP:', req.ip);
    console.log('Request Body:', req.body);
    
    const { question, email } = req.body;

    // === 1. EMAIL REQUIRED (NO EXCEPTIONS) ===
    if (!email || email.trim() === '') {
      console.log('❌ ERROR: No email provided');
      return res.status(400).json({
        success: false,
        error: 'EMAIL REQUIRED - 24 ghante ki limit ke liye',
        hindi: 'Email daaliye, nahi toh question accept nahi hoga'
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    console.log('Clean Email:', cleanEmail);

    // === 2. 24-HOUR LIMIT CHECK (SUPER STRICT) ===
    console.log('🕒 Checking 24-hour limit...');
    
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    console.log('24 hours ago time:', twentyFourHoursAgo);
    
    // DIRECT MONGOOSE QUERY
    try {
      const recentQuestions = await UserQuestion.find({
        email: cleanEmail,
        createdAt: { $gte: twentyFourHoursAgo }
      }).sort({ createdAt: -1 });
      
      console.log(`📊 Found ${recentQuestions.length} questions in last 24 hours`);
      
      if (recentQuestions.length > 0) {
        const lastQuestion = recentQuestions[0];
        const nextAllowedTime = new Date(lastQuestion.createdAt.getTime() + 24 * 60 * 60 * 1000);
        const timeLeftMs = nextAllowedTime - Date.now();
        const hoursLeft = Math.floor(timeLeftMs / (60 * 60 * 1000));
        const minutesLeft = Math.floor((timeLeftMs % (60 * 60 * 1000)) / (60 * 1000));
        
        console.log('❌ BLOCKING: User already asked question');
        console.log('Last question:', lastQuestion.question);
        console.log('Asked at:', lastQuestion.createdAt);
        console.log('Next allowed at:', nextAllowedTime);
        console.log('Time left:', hoursLeft + 'h ' + minutesLeft + 'm');
        
        return res.status(429).json({
          success: false,
          error: '24 HOUR LIMIT REACHED!',
          hindi: '24 ghante mein sirf 1 sawal!',
          message: `Aap ${hoursLeft} ghante ${minutesLeft} minute baad naya sawal puch sakte hain`,
          details: {
            lastQuestion: lastQuestion.question.substring(0, 80) + '...',
            askedAt: lastQuestion.createdAt.toLocaleString('en-IN'),
            nextQuestionAt: nextAllowedTime.toLocaleString('en-IN'),
            status: lastQuestion.status
          }
        });
      }
      
      console.log('✅ No recent questions found - Allowing new question');
      
    } catch (dbError) {
      console.error('❌ DATABASE ERROR:', dbError);
      return res.status(500).json({
        success: false,
        error: 'Database error checking limit',
        message: 'Please try again'
      });
    }

    // === 3. QUESTION VALIDATION ===
    if (!question || question.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Question required'
      });
    }

    const cleanQuestion = question.trim();

    if (cleanQuestion.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Question too short (min 10 chars)'
      });
    }

    if (cleanQuestion.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'Question too long (max 500 chars)'
      });
    }

    // === 4. SAVE QUESTION ===
    console.log('💾 Saving new question to database...');
    
    const newQuestion = new UserQuestion({
      question: cleanQuestion,
      email: cleanEmail,
      ipAddress: req.ip || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown',
      status: 'pending'
    });

    const savedQuestion = await newQuestion.save();
    console.log('✅ Question saved with ID:', savedQuestion._id);
    console.log('=== REQUEST COMPLETED ===\n');

    res.status(201).json({
      success: true,
      message: 'Question submitted successfully!',
      hindi: 'Sawal submit ho gaya! Admin review karega.',
      data: {
        id: savedQuestion._id,
        question: savedQuestion.question,
        status: savedQuestion.status,
        submittedAt: savedQuestion.createdAt,
        nextQuestionTime: new Date(savedQuestion.createdAt.getTime() + 24 * 60 * 60 * 1000),
        warning: '24 ghante ke baad hi naya sawal puch sakte hain'
      }
    });

  } catch (error) {
    console.error('🔥 CRITICAL ERROR:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid data. Email format sahi nahi hai.',
        details: 'Format: example@gmail.com'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again.',
      details: error.message
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