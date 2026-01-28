// backend/app.js - WORKING VERSION
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import questionRoutes from './routes/questionRoutes.js';
import userQuestionRoutes from './routes/userQuestionRoutes.js';
import authRoutes from './routes/authRoutes.js';
// ❌ Remove rate limiter imports for now
// import { apiLimiter, loginLimiter } from './middleware/rateLimiter.js';

const app = express();

// ✅ CORS Setup
const allowedOrigins = [
  'https://islamic-answers-frontend.onrender.com',
  'http://localhost:3000',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
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

// ❌ TEMPORARY: Comment out ALL rate limiting
// app.use('/api/questions', apiLimiter);
// app.use('/api/auth/login', loginLimiter);

// ✅ Routes
app.use('/api/questions', questionRoutes);
app.use('/api/user-questions', userQuestionRoutes);
app.use('/api/auth', authRoutes);

// ✅ Keep-alive endpoint
app.get('/keep-alive', (req, res) => {
  res.json({ 
    status: 'alive', 
    timestamp: new Date().toISOString(),
    message: 'Islamic Q&A Backend is running',
    features: {
      '24_hour_limit': 'ACTIVE - 1 question per 24 hours',
      'rate_limiting': 'TEMPORARILY DISABLED - Fixing IPv6 issue'
    }
  });
});

// ✅ Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Islamic Q&A API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ✅ Home route
app.get('/', (req, res) => {
  res.json({ 
    message: '🎉 Welcome to Islamic Q&A API',
    description: 'Authentic Islamic questions with references from Quran and Hadith',
    features: [
      '✅ 24-hour question limit per user (ACTIVE)',
      '❌ Rate limiting (TEMPORARILY DISABLED - Fixing)',
      '✅ Question status tracking',
      '✅ Admin review system'
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
    requestedPath: req.originalUrl
  });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

export default app;