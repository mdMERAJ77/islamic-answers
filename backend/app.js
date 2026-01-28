// backend/app.js - FINAL WORKING VERSION
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import questionRoutes from './routes/questionRoutes.js';
import userQuestionRoutes from './routes/userQuestionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { apiLimiter, loginLimiter } from './middleware/rateLimiter.js';

const app = express();

// ✅ CORS Setup for frontend-backend connection
const allowedOrigins = [
  'https://islamic-answers-frontend.onrender.com', // Your frontend
  'http://localhost:3000', // Local development
  'http://localhost:5173'  // Vite dev server
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Apply rate limiting
app.use('/api/questions', apiLimiter);        // General API limit
app.use('/api/auth/login', loginLimiter);     // Login specific limit

// ✅ Routes (user-questions route has its own 24-hour limit in controller)
app.use('/api/questions', questionRoutes);
app.use('/api/user-questions', userQuestionRoutes); // Has 24-hour limit
app.use('/api/auth', authRoutes);

// ✅ Keep-alive endpoint (no rate limiting)
app.get('/keep-alive', (req, res) => {
  res.json({ 
    status: 'alive', 
    timestamp: new Date().toISOString(),
    message: 'Islamic Q&A Backend is running',
    features: {
      '24_hour_limit': 'Active - 1 question per 24 hours',
      'question_status': 'Check via /api/user-questions/status?email=YOUR_EMAIL',
      'rate_limiting': 'Active on all API endpoints'
    }
  });
});

// ✅ Health check endpoint
app.get('/health', (req, res) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  
  res.json({
    status: 'healthy',
    service: 'Islamic Q&A API',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptime / 60)} minutes`,
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

// ✅ Home route
app.get('/', (req, res) => {
  res.json({ 
    message: '🎉 Welcome to Islamic Q&A API',
    description: 'Authentic Islamic questions with references from Quran and Hadith',
    features: [
      '24-hour question limit per user',
      'Question status tracking',
      'Admin review system',
      'Rate limiting protection'
    ],
    endpoints: {
      questions: {
        public: '/api/questions',
        userSubmit: '/api/user-questions (POST)',
        checkStatus: '/api/user-questions/status?email=YOUR_EMAIL'
      },
      auth: '/api/auth',
      monitoring: {
        health: '/health',
        keepAlive: '/keep-alive'
      }
    },
    note: '📢 Users can submit only 1 question every 24 hours'
  });
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    requestedPath: req.originalUrl,
    suggestion: 'Check available endpoints at /'
  });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('📛 Server Error:', err.message);
  
  // Handle CORS errors
  if (err.message.includes('CORS')) {
    return res.status(403).json({
      success: false,
      error: 'Cross-origin request blocked',
      allowedOrigins: allowedOrigins,
      yourOrigin: req.headers.origin || 'Not provided'
    });
  }
  
  // Handle rate limit errors
  if (err.status === 429) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please slow down.'
    });
  }
  
  // Generic error
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;