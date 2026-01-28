import mongoose from 'mongoose';

const userQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true, // ✅ MUST BE TRUE
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
  }
}, {
  timestamps: true
});

// ✅ INDEX FOR 24-HOUR CHECK
userQuestionSchema.index({ email: 1, createdAt: 1 });

const UserQuestion = mongoose.model('UserQuestion', userQuestionSchema);
export default UserQuestion;