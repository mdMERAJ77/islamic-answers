import jwt from "jsonwebtoken";

// ========== MIDDLEWARE 1: authenticate (REQUIRES LOGIN) ==========
export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'Authentication required. Please login.'
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false,
      error: 'Invalid or expired token. Please login again.'
    });
  }
};

// ========== MIDDLEWARE 2: authenticateAdmin (OPTIONAL AUTH) ==========
export const authenticateAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      req.user = null;
      return next(); // Allow but mark as not authenticated
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    req.user = null;
    next(); // Allow but mark as not authenticated
  }
};

// ========== MIDDLEWARE 3: requireAdmin (STRICT ADMIN) ==========
export const requireAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'Admin access required. Please login.'
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        error: 'Access denied. Admin privileges required.'
      });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false,
      error: 'Admin authentication failed.'
    });
  }
};