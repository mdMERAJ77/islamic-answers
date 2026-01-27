// models/Question.js - Simple working version
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },
    answer: {
      en: {
        type: String,
        required: [true, "English answer is required"],
      },
      hi: {
        type: String,
        default: "",
      },
      ur: {
        type: String,
        default: "",
      },
    },
    references: {
      quran: {
        type: Array,
        default: []
      },
      hadith: {
        type: Array,
        default: []
      },
      videos: {
        type: Array,
        default: []
      },
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;