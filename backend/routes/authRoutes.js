// middleware/authMiddleware.js - FINAL VERSION
import jwt from 'jsonwebtoken';

export const authenticateAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      req.user = null; // ✅ YEH LINE ADD KARO
      return next(); // ✅ YEH CHANGE KARO (return res.status... ki jagah)
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    req.user = null; // ✅ YEH LINE ADD KARO
    next(); // ✅ YEH CHANGE KARO (return res.status... ki jagah)
  }
};