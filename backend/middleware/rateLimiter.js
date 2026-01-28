import rateLimit from 'express-rate-limit';

// User questions के लिए STRICT rate limiting
export const userQuestionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Maximum 3 questions per 15 minutes
  message: {
    success: false,
    error: 'Too many questions submitted. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use IP + path for unique tracking
    return req.ip + req.originalUrl;
  },
  skipFailedRequests: false, // Count all requests
  handler: (req, res, next, options) => {
    res.status(429).json({
      success: false,
      error: 'Rate limit exceeded. Maximum 3 questions per 15 minutes.',
      retryAfter: Math.ceil(options.windowMs / 1000)
    });
  }
});

// Login attempts rate limiting
export const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 login attempts per hour
  message: {
    success: false,
    error: 'Too many login attempts. Please try again in 1 hour.'
  },
  skipSuccessfulRequests: true
});

// General API rate limiting
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
  message: {
    success: false,
    error: 'Too many requests. Please slow down.'
  }
});