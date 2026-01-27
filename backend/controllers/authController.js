// controllers/authController.js
import jwt from 'jsonwebtoken';

// Hardcoded admin (simple for now)
const ADMIN = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123'
};

// Admin login
export const login = async (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN.username && password === ADMIN.password) {
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Set token in cookie
    res.cookie('token', token, {
  httpOnly: true,
  secure: true, // ✅ YEH CHANGE KARO: false se true
  sameSite: 'none', // ✅ YEH ADD KARO
  maxAge: 24 * 60 * 60 * 1000
});
    
    res.json({ 
      success: true,
      message: 'Login successful',
      user: { username, role: 'admin' }
    });
  } else {
    res.status(401).json({ 
      success: false,
      error: 'Invalid credentials' 
    });
  }
};

// Admin logout
export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ 
    success: true,
    message: 'Logout successful' 
  });
};

// Check if admin is logged in
export const checkAuth = (req, res) => {
  res.json({
    success: true,
    isAuthenticated: true,
    user: req.user
  });
};