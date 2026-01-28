// backend/controllers/userQuestionController.js
import UserQuestion from '../models/UserQuestion.js';

// ✅ Submit new question - WITH description field
export const submitUserQuestion = async (req, res) => {
  try {
    console.log('📥 User Question Request:', req.body);
    
    // ✅ Extract all possible fields
    const { 
      question, 
      description = '', 
      userEmail,  // Frontend sends 'userEmail'
      email 
    } = req.body;
    
    // ✅ Determine email (frontend sends 'userEmail')
    const finalEmail = userEmail || email || '';
    
    if (!finalEmail.trim()) {
      return res.status(400).json({
        success: false, 
        error: 'Email is required'
      });
    }
    
    if (!question || question.trim().length < 3) {
      return res.status(400).json({
        success: false, 
        error: 'Question is required (minimum 3 characters)'
      });
    }
    
    // ✅ 24-HOUR CHECK
    const cleanEmail = finalEmail.toLowerCase().trim();
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const existing = await UserQuestion.findOne({
      email: cleanEmail,
      createdAt: { $gte: oneDayAgo }
    });
    
    if (existing) {
      return res.status(400).json({
        success: false,
        error: '24-hour limit reached! You can ask only 1 question every 24 hours.'
      });
    }
    
    // ✅ SAVE WITH DESCRIPTION
    const newQuestion = new UserQuestion({
      question: question.trim(),
      description: (description || '').trim(),
      email: cleanEmail,
      ipAddress: req.ip || req.headers['x-forwarded-for'] || 'unknown',
      status: 'pending'
    });
    
    await newQuestion.save();
    
    res.json({
      success: true,
      message: 'Question submitted successfully!',
      data: {
        id: newQuestion._id,
        question: newQuestion.question,
        description: newQuestion.description,
        email: newQuestion.email,
        status: newQuestion.status,
        createdAt: newQuestion.createdAt
      }
    });
    
  } catch (error) {
    console.error('❌ User Question Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error: ' + error.message
    });
  }
};

// ✅ Get all user questions (for admin) - WITH DESCRIPTION
export const getUserQuestions = async (req, res) => {
  try {
    const questions = await UserQuestion.find()
      .sort({ createdAt: -1 })
      .select('-__v -ipAddress');

    res.json({
      success: true,
      count: questions.length,
      data: questions.map(q => ({
        _id: q._id,
        question: q.question,
        description: q.description,  // ✅ Includes description
        email: q.email,
        status: q.status,
        answer: q.answer,
        createdAt: q.createdAt,
        updatedAt: q.updatedAt,
        answeredAt: q.answeredAt
      }))
    });
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch questions'
    });
  }
};

// ✅ Update question status (Admin)
export const updateQuestionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, answer = '' } = req.body;
    
    const updateData = { status };
    
    if (status === 'answered') {
      updateData.answer = answer;
      updateData.answeredAt = new Date();
    }
    
    const updated = await UserQuestion.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: 'Question not found'
      });
    }
    
    res.json({
      success: true,
      message: `Question marked as ${status}`,
      data: updated
    });
    
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update question'
    });
  }
};

// ✅ Delete question (Admin)
export const deleteUserQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await UserQuestion.findByIdAndDelete(id);

    if (!deleted) {
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
    
    res.json({
      success: true,
      count: questions.length,
      questions: questions.map(q => ({
        id: q._id,
        question: q.question,
        description: q.description,
        status: q.status,
        submittedOn: q.createdAt.toLocaleDateString('en-IN'),
        answer: q.answer || ''
      }))
    });
    
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check status'
    });
  }
};