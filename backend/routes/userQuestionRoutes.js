// backend/routes/userQuestionRoutes.js - UPDATED
import express from 'express';
import { 
  submitUserQuestion, 
  getUserQuestions,
  deleteUserQuestion 
} from '../controllers/userQuestionController.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';
import { userQuestionLimiter } from '../middleware/rateLimiter.js'; // 🆕 IMPORT

const router = express.Router();

// 🆕 APPLY RATE LIMITING TO USER QUESTION SUBMISSION
router.post('/', userQuestionLimiter, submitUserQuestion);

// Get all user questions (Admin only)
router.get('/', authenticateAdmin, getUserQuestions);

// Delete user question (Admin only)
router.delete('/:id', authenticateAdmin, deleteUserQuestion);

export default router;