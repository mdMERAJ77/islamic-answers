// backend/routes/questionRoutes.js - WITH TEMPORARY AUTH
import express from 'express';
import jwt from 'jsonwebtoken'; // ✅ ADD THIS IMPORT
import { 
  getAllQuestions, 
  getQuestionBySlug, 
  addQuestion 
} from '../controllers/questionController.js';

const router = express.Router();

// Public routes
router.get('/', getAllQuestions);
router.get('/:id', getQuestionBySlug);

// Admin only routes with manual auth check
router.post('/', async (req, res, next) => {
  try {
    // Check token manually
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'Please login as admin first.' 
      });
    }
    
    // Verify and continue
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false,
      error: 'Invalid session. Please login.' 
    });
  }
}, addQuestion);

export default router;