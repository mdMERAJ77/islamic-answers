import express from 'express';
import { 
  submitUserQuestion, 
  getUserQuestions,
  deleteUserQuestion,
  checkQuestionStatus
} from '../controllers/userQuestionController.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';
// ❌ TEMPORARY: Comment out rate limiter
// import { userQuestionLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// ✅ 24-HOUR LIMITED ONLY (Temporary: No rate limiting)
router.post('/', submitUserQuestion); // ❌ Remove: userQuestionLimiter

// ✅ PUBLIC STATUS CHECK
router.get('/status', checkQuestionStatus);

// Get all user questions (Admin only)
router.get('/', authenticateAdmin, getUserQuestions);

// Delete user question (Admin only)
router.delete('/:id', authenticateAdmin, deleteUserQuestion);

export default router;