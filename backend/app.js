// backend/app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import questionRoutes from './routes/questionRoutes.js';
import userQuestionRoutes from './routes/userQuestionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import searchRoutes from './routes/searchRoutes.js'; // ✅ NEW IMPORT
// import { apiLimiter, loginLimiter } from './middleware/rateLimiter.js';

const app = express();

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

app.use(express.json());
app.use(cookieParser());

// ❌ TEMPORARY: Comment out rate limiting
// app.use('/api/questions', apiLimiter);
// app.use('/api/auth/login', loginLimiter);

// ✅ Routes
app.use('/api/questions', questionRoutes);
app.use('/api/user-questions', userQuestionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes); // ✅ NEW ROUTE

// ✅ Keep-alive endpoint
app.get('/keep-alive', (req, res) => {
  res.json({ 
    status: 'alive', 
    timestamp: new Date().toISOString(),
    message: 'Islamic Q&A Backend is running',
    endpoints: {
      questions: '/api/questions',
      auth: '/api/auth',
      search: '/api/search', // ✅ ADDED
      userQuestions: '/api/user-questions'
    }
  });
});

// ✅ Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Islamic Q&A API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    features: ['questions', 'auth', 'search', 'user-questions'] // ✅ UPDATED
  });
});

// ✅ Home route
app.get('/', (req, res) => {
  res.json({ 
    message: '🎉 Welcome to Islamic Q&A API',
    description: 'Authentic Islamic questions with references from Quran and Hadith',
    endpoints: {
      questions: '/api/questions',
      auth: '/api/auth',
      search: '/api/search', // ✅ ADDED
      userQuestions: '/api/user-questions'
    }
  });
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    requestedPath: req.originalUrl,
    availableEndpoints: ['/api/questions', '/api/auth', '/api/search', '/api/user-questions']
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