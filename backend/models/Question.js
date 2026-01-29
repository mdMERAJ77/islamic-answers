// import mongoose from 'mongoose';

// const questionSchema = new mongoose.Schema({
//   // ✅ English (Required)
//   question_en: {
//     type: String,
//     required: [true, "English question is required"],
//     trim: true
//   },
  
//   // ✅ Hindi (Optional)
//   question_hi: {
//     type: String,
//     trim: true,
//     default: ""
//   },
  
//   // ✅ English Answer (Required)
//   answer_en: {
//     type: String,
//     required: [true, "English answer is required"],
//     trim: true
//   },
  
//   // ✅ Hindi Answer (Optional)
//   answer_hi: {
//     type: String,
//     trim: true,
//     default: ""
//   },
  
//   // ✅ Urdu Answer (Optional)
//   answer_ur: {
//     type: String,
//     trim: true,
//     default: ""
//   },
  
//   // ✅ References (Bilingual Structure)
//   references: {
//     quran: [{
//       surah_en: { type: String, trim: true },
//       surah_hi: { type: String, trim: true },
//       ayah: { type: String, trim: true },
//       verse_en: { type: String, trim: true },
//       verse_hi: { type: String, trim: true },
//       meaning_en: { type: String, trim: true },
//       meaning_hi: { type: String, trim: true }
//     }],
    
//     hadith: [{
//       source_en: { type: String, trim: true },
//       source_hi: { type: String, trim: true },
//       number: { type: String, trim: true },
//       text_en: { type: String, trim: true },
//       text_hi: { type: String, trim: true }
//     }],
    
//     videos: [{
//       title_en: { type: String, trim: true },
//       title_hi: { type: String, trim: true },
//       url: { type: String, trim: true },
//       scholar: { type: String, trim: true }
//     }]
//   },
  
//   // Organization
//   tags: [{ type: String, trim: true }],
//   category: { type: String, trim: true },
//   views: { type: Number, default: 0 }
// }, {
//   timestamps: true
// });

// // Create indexes for better search
// questionSchema.index({ question_en: 'text', question_hi: 'text' });
// questionSchema.index({ category: 1 });
// questionSchema.index({ tags: 1 });

// export default mongoose.model('Question', questionSchema);



import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  // ✅ English (Required)
  question_en: {
    type: String,
    required: [true, "English question is required"],
    trim: true
  },
  
  // ✅ Hindi (Optional)
  question_hi: {
    type: String,
    trim: true,
    default: ""
  },
  
  // ✅ English Answer (Required)
  answer_en: {
    type: String,
    required: [true, "English answer is required"],
    trim: true
  },
  
  // ✅ Hindi Answer (Optional)
  answer_hi: {
    type: String,
    trim: true,
    default: ""
  },
  
  // ✅ Urdu Answer (Optional)
  answer_ur: {
    type: String,
    trim: true,
    default: ""
  },
  
  // ✅ References (Bilingual Structure)
  references: {
    quran: [{
      surah_en: { type: String, trim: true },
      surah_hi: { type: String, trim: true },
      ayah: { type: String, trim: true },
      verse_en: { type: String, trim: true },
      verse_hi: { type: String, trim: true },
      meaning_en: { type: String, trim: true },
      meaning_hi: { type: String, trim: true }
    }],
    
    hadith: [{
      source_en: { type: String, trim: true },
      source_hi: { type: String, trim: true },
      number: { type: String, trim: true },
      text_en: { type: String, trim: true },
      text_hi: { type: String, trim: true }
    }],
    
    videos: [{
      title_en: { type: String, trim: true },
      title_hi: { type: String, trim: true },
      url: { type: String, trim: true },
      scholar: { type: String, trim: true }
    }]
  },
  
  // Organization
  tags: [{ type: String, trim: true }],
  category: { type: String, trim: true },
  views: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Create indexes for better search
questionSchema.index({ question_en: 'text', question_hi: 'text' });
questionSchema.index({ category: 1 });
questionSchema.index({ tags: 1 });

// ✅ FIXED EXPORT - DON'T CHANGE THIS LINE
const Question = mongoose.model('Question', questionSchema);
export default Question;