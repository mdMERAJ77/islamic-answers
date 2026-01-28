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
    required: true, // ✅ ADD REQUIRED
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
    enum: ['pending', 'answered', 'rejected'], // ✅ CHANGED 'reviewed' to 'answered'
    default: 'pending'
  },
  answer: { // ✅ ADD ANSWER FIELD
    type: String,
    default: ''
  },
  adminNote: { // ✅ RENAME TO adminNote (singular)
    type: String,
    trim: true,
    default: ''
  },
  answeredAt: { // ✅ ADD ANSWERED AT FIELD
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
userQuestionSchema.index({ createdAt: -1 });
userQuestionSchema.index({ ipAddress: 1, createdAt: -1 });
userQuestionSchema.index({ status: 1 });

// ✅ ADD THESE 2 LINES (24-hour limit ke liye)
userQuestionSchema.index({ email: 1, createdAt: 1 });
userQuestionSchema.index({ ipAddress: 1, createdAt: 1 });

const UserQuestion = mongoose.model('UserQuestion', userQuestionSchema);
export default UserQuestion;