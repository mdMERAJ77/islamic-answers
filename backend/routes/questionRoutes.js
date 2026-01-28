import express from 'express';
import jwt from 'jsonwebtoken';
import { 
  getAllQuestions, 
  getQuestionById, 
  createQuestion,
  updateQuestion,
  deleteQuestion
} from '../controllers/questionController.js';

const router = express.Router();

// ✅ Admin middleware
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'Please login as admin first.' 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false,
      error: 'Invalid session. Please login.' 
    });
  }
};

// ✅ Public routes
router.get('/', getAllQuestions);
router.get('/:id', getQuestionById);

// ✅ Admin only routes
router.post('/', authenticateAdmin, createQuestion);
router.put('/:id', authenticateAdmin, updateQuestion);
router.delete('/:id', authenticateAdmin, deleteQuestion);

export default router;