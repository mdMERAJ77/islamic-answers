// routes/authRoutes.js
import express from 'express';
import { login, logout, checkAuth } from '../controllers/authController.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/logout', logout);

// Protected route - check if admin is logged in
router.get('/check', authenticateAdmin, checkAuth);

export default router;