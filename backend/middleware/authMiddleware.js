// middleware/authMiddleware.js - UPDATED
import jwt from 'jsonweptoken';

export const authenticateAdmin = (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;
    
    if (!token) {
      req.user = null; // ✅ Allow request to continue
      return next();
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    req.user = null; // ✅ Invalid token, but continue
    next();
  }
};

// ✅ NEW: Strict middleware for protected routes
export const requireAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'Access denied. Please login.' 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false,
      error: 'Invalid token. Please login again.' 
    });
  }
};