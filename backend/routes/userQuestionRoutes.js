// backend/routes/userQuestionRoutes.js
import express from 'express';
import { 
  submitUserQuestion, 
  getUserQuestions,
  updateQuestionStatus,
  deleteUserQuestion,
  checkQuestionStatus
} from '../controllers/userQuestionController.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ PUBLIC ROUTES
router.post('/', submitUserQuestion); // Submit new question
router.get('/status', checkQuestionStatus); // Check status

// ✅ ADMIN ROUTES (Require authentication)
router.get('/', authenticateAdmin, getUserQuestions); // Get all questions
router.put('/:id', authenticateAdmin, updateQuestionStatus); // Update status
router.delete('/:id', authenticateAdmin, deleteUserQuestion); // Delete question

export default router;