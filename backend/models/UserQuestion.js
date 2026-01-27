// models/UserQuestion.js
import mongoose from "mongoose";

const userQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    userEmail: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'answered', 'rejected'],
      default: 'pending'
    },
    answeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }
  },
  {
    timestamps: true,
  }
);

const UserQuestion = mongoose.model("UserQuestion", userQuestionSchema);
export default UserQuestion;