// controllers/authController.js - FIXED
import jwt from "jsonwebtoken";

// Hardcoded admin (simple for now)
const ADMIN = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "admin123",
};

// Admin login
export const login = async (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN.username && password === ADMIN.password) {
    const token = jwt.sign(
      { username, role: "admin" },
      process.env.JWT_SECRET || "your_secret_key", // ✅ Add fallback
      { expiresIn: "24h" },
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ✅ Auto detect
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ Smart
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.json({
      success: true,
      message: "Login successful",
      user: { username, role: "admin" },
    });
  } else {
    res.status(401).json({
      success: false,
      error: "Invalid credentials",
    });
  }
};

// Admin logout
export const logout = (req, res) => {
  console.log("🔴 Backend logout called");

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  console.log("✅ Cookie cleared");

  res.json({
    success: true,
    message: "Logout successful",
  });
};

// Check if admin is logged in
export const checkAuth = (req, res) => {
  // ✅ Fix: Check if user exists (from authMiddleware)
  const isAuthenticated = !!req.user;
  
  res.json({
    success: true,
    isAuthenticated: isAuthenticated, // ✅ Now returns actual status
    user: req.user || null,
  });
};