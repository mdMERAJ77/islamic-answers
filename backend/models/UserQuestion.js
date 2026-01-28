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
    required: true, // ✅ REQUIRED FIELD
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
    enum: ['pending', 'answered', 'rejected'],
    default: 'pending'
  },
  answer: {
    type: String,
    default: ''
  },
  adminNote: {
    type: String,
    trim: true,
    default: ''
  },
  answeredAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
userQuestionSchema.index({ createdAt: -1 });
userQuestionSchema.index({ email: 1, createdAt: 1 }); // ✅ 24-hour limit index
userQuestionSchema.index({ ipAddress: 1, createdAt: 1 });
userQuestionSchema.index({ status: 1 });

const UserQuestion = mongoose.model('UserQuestion', userQuestionSchema);
export default UserQuestion;