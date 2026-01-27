// app.js - Updated
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import questionRoutes from './routes/questionRoutes.js';
import userQuestionRoutes from './routes/userQuestionRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: 'https://islamic-answers-frontend.onrender.com', // React app URL
  credentials: true // Allow cookies
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/questions', questionRoutes); // Main questions
app.use('/api/user-questions', userQuestionRoutes); // User raised questions
app.use('/api/auth', authRoutes); // Authentication

// Home route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Islamic Q&A API',
    endpoints: {
      questions: '/api/questions',
      userQuestions: '/api/user-questions',
      auth: '/api/auth'
    }
  });
});

// ✅ FIXED: 404 handler - * removed
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    path: req.originalUrl
  });
});

export default app;