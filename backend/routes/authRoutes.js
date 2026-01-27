import express from 'express';
import { login, logout, checkAuth } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', login);

// ✅ PROTECTED: Must be logged in to logout
router.post('/logout', authenticate, logout);

// Check auth status (uses optional auth middleware)
router.get('/check', authenticateAdmin, checkAuth);

export default router;