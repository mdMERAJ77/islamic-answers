// backend/middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';

// Rate limiting for user questions (prevents spam)
export const userQuestionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 3, // Max 3 questions per 15 minutes
  message: {
    success: false,
    error: 'Too many questions submitted. Please wait 15 minutes before submitting again.'
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable X-RateLimit headers
  keyGenerator: (req) => {
    // Use IP + user agent for better tracking
    return req.ip + req.headers['user-agent'];
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: 'Too many submissions. Please try again in 15 minutes.',
      retryAfter: Math.ceil(15 * 60) // 15 minutes in seconds
    });
  }
});

// Rate limiting for login attempts (prevents brute force)
export const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // Max 5 login attempts per hour
  message: {
    success: false,
    error: 'Too many login attempts. Please try again in 1 hour.'
  },
  skipSuccessfulRequests: true, // Don't count successful logins
  keyGenerator: (req) => req.ip
});

// Rate limiting for all API requests (general protection)
// backend/middleware/rateLimiter.js में skip function update करें
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per 15 minutes
  message: {
    success: false,
    error: 'Too many requests. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for:
    // 1. Keep-alive pings
    // 2. Health checks
    // 3. UptimeRobot requests
    return req.path === '/keep-alive' || 
           req.path === '/health' ||
           req.path === '/' ||
           req.get('User-Agent')?.includes('UptimeRobot');
  }
});

// Special limiter for anonymous users (more strict)
export const anonymousLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Max 10 requests per hour for anonymous
  message: {
    success: false,
    error: 'Rate limit exceeded for anonymous users.'
  },
  keyGenerator: (req) => req.ip,
  skip: (req) => {
    // Skip if user is authenticated
    return req.cookies.token || req.headers.authorization;
  }
});