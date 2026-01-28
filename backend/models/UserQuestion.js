// backend/models/UserQuestion.js
import mongoose from 'mongoose';

const userQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  
  // ✅ FIXED: Add description field
  description: {
    type: String,
    default: '',
    trim: true
  },
  
  // ✅ FIXED: Single email field (frontend 'userEmail' se match karega)
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  
  ipAddress: {
    type: String,
    required: true
  },
  
  status: {
    type: String,
    enum: ['pending', 'answered', 'rejected'],
    default: 'pending'
  },
  
  answer: {
    type: String,
    default: ''
  },
  
  // ✅ Added: answeredAt timestamp
  answeredAt: {
    type: Date
  }
  
}, {
  timestamps: true
});

// ✅ Index for 24-hour check
userQuestionSchema.index({ email: 1, createdAt: 1 });

const UserQuestion = mongoose.model('UserQuestion', userQuestionSchema);
export default UserQuestion;