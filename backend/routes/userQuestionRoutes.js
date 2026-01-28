// backend/routes/userQuestionRoutes.js - FINAL
import express from 'express';
import { 
  submitUserQuestion, 
  getUserQuestions,
  deleteUserQuestion,
  checkQuestionStatus
} from '../controllers/userQuestionController.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';
import { userQuestionLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// ✅ 24-HOUR LIMITED + RATE LIMITED QUESTION SUBMISSION
router.post('/', userQuestionLimiter, submitUserQuestion);

// ✅ PUBLIC STATUS CHECK
router.get('/status', checkQuestionStatus);

// Get all user questions (Admin only)
router.get('/', authenticateAdmin, getUserQuestions);

// Delete user question (Admin only)
router.delete('/:id', authenticateAdmin, deleteUserQuestion);

export default router;