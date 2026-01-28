import express from 'express';
import { 
  submitUserQuestion, 
  getUserQuestions,
  deleteUserQuestion 
} from '../controllers/userQuestionController.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';
import { userQuestionLimiter } from '../middleware/rateLimiter.js'; // ✅ Import

const router = express.Router();

// ✅ APPLY RATE LIMITING HERE (MOST IMPORTANT)
router.post('/', userQuestionLimiter, submitUserQuestion);

// Get all user questions (Admin only)
router.get('/', authenticateAdmin, getUserQuestions);

// Delete user question (Admin only)
router.delete('/:id', authenticateAdmin, deleteUserQuestion);

export default router;