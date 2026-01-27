// routes/questionRoutes.js
import express from 'express';
import { 
  getAllQuestions, 
  getQuestionBySlug, 
  addQuestion 
} from '../controllers/questionController.js';
// import { authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllQuestions); // Get all questions
router.get('/:id', getQuestionBySlug); // Get single question

// Admin only routes
router.post('/', addQuestion); // Add new question

export default router;