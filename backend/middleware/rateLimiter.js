import rateLimit from 'express-rate-limit';

// User questions के लिए rate limiting - SIMPLE VERSION
export const userQuestionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Maximum 3 questions per 15 minutes
  message: {
    success: false,
    error: 'Too many questions. Please wait 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // ❌ REMOVE keyGenerator (causing IPv6 error)
  skipFailedRequests: false
});

// Login attempts rate limiting
export const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 login attempts per hour
  message: {
    success: false,
    error: 'Too many login attempts. Please try again in 1 hour.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// General API rate limiting
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
  message: {
    success: false,
    error: 'Too many requests. Please slow down.'
  },
  standardHeaders: true,
  legacyHeaders: false
});