// backend/app.js - WORKING VERSION
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import questionRoutes from './routes/questionRoutes.js';
import userQuestionRoutes from './routes/userQuestionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { apiLimiter, loginLimiter, userQuestionLimiter } from './middleware/rateLimiter.js'; // ✅ userQuestionLimiter IMPORT करें

const app = express();

// ✅ UPDATED CORS FOR DAILY DEVELOPMENT
const allowedOrigins = [
  'https://islamic-answers-frontend.onrender.com', // Production
  'http://localhost:3000', // Local development
  'http://localhost:5173'  // Vite default
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

// ✅ CORRECT RATE LIMITING
app.use('/api/questions', apiLimiter); // Public questions API
// ❌ REMOVE THIS: app.use('/api/user-questions', apiLimiter); // WRONG - using general limiter
// ✅ Routes में specific limiter apply होगा
app.use('/api/auth/login', loginLimiter); // Login specific limiter

// Routes (rate limiting routes के अंदर apply होगा)
app.use('/api/questions', questionRoutes);
app.use('/api/user-questions', userQuestionRoutes); // ✅ यहाँ route file में userQuestionLimiter apply है
app.use('/api/auth', authRoutes);

// Keep-alive route (NO rate limiting)
app.get('/keep-alive', (req, res) => {
  res.json({ 
    status: 'alive', 
    timestamp: new Date().toISOString(),
    message: 'Backend running'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Islamic Q&A API',
    timestamp: new Date().toISOString()
  });
});

// Home route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Islamic Q&A API',
    endpoints: {
      questions: '/api/questions',
      userQuestions: '/api/user-questions',
      auth: '/api/auth',
      keepAlive: '/keep-alive',
      health: '/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

export default app;