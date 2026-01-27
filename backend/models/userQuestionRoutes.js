// routes/userQuestionRoutes.js
import express from 'express';
import { 
  raiseQuestion, 
  getUserQuestions, 
  updateQuestionStatus 
} from '../controllers/userQuestionController.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route - anyone can raise question
router.post('/', raiseQuestion);

// Admin only routes
router.get('/', authenticateAdmin, getUserQuestions); // Get all user questions
router.put('/:id', authenticateAdmin, updateQuestionStatus); // Update status

export default router;