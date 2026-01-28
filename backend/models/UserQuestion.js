// backend/models/UserQuestion.js - UPDATED
import mongoose from 'mongoose';

const userQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 500
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'rejected'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    trim: true
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  reviewedAt: {
    type: Date
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Index for better query performance
userQuestionSchema.index({ createdAt: -1 });
userQuestionSchema.index({ ipAddress: 1, createdAt: -1 });
userQuestionSchema.index({ status: 1 });

const UserQuestion = mongoose.model('UserQuestion', userQuestionSchema);

export default UserQuestion;