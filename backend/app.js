// backend/app.js - FINAL CORRECTED VERSION
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import questionRoutes from './routes/questionRoutes.js';
import userQuestionRoutes from './routes/userQuestionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { apiLimiter, loginLimiter } from './middleware/rateLimiter.js';

const app = express();

// ✅ UPDATED CORS FOR DAILY DEVELOPMENT
const allowedOrigins = [
  'https://islamic-answers-frontend.onrender.com', // Production
  'http://localhost:3000', // Local development
  'http://localhost:5173'  // Vite default
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl)
    if (!origin) {
      return callback(null, true);
    }
    
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

// ✅ CORRECTED RATE LIMITING - Apply to specific routes only
// Instead of applying to all /api/ routes
app.use('/api/questions', apiLimiter); // Public questions API
app.use('/api/user-questions', apiLimiter); // User questions API
app.use('/api/auth/login', loginLimiter); // Login specific limiter

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/user-questions', userQuestionRoutes);
app.use('/api/auth', authRoutes);

// Keep-alive route (EXCLUDED from rate limiting)
app.get('/keep-alive', (req, res) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  
  res.json({ 
    status: 'alive', 
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptime / 60)} minutes`,
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`
    },
    message: 'Islamic Q&A Backend is running smoothly',
    version: '1.0.0',
    note: 'This endpoint is pinged every 5 minutes to prevent Render sleep'
  });
});

// Health check endpoint (for monitoring)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Islamic Q&A API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
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
    },
    documentation: 'All Islamic questions answered with authentic references'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
    suggestion: 'Check available endpoints at /'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  
  // Handle CORS errors
  if (err.message.includes('CORS')) {
    return res.status(403).json({
      success: false,
      error: 'Cross-origin request blocked',
      allowedOrigins: allowedOrigins
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