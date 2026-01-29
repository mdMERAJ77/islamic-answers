// import Question from "../models/Question.js";

// // ✅ Get all questions (NEW FORMAT ONLY)
// export const getAllQuestions = async (req, res) => {
//   try {
//     const questions = await Question.find()
//       .sort({ createdAt: -1 })
//       .select('-__v');

//     res.json({
//       success: true,
//       count: questions.length,
//       data: questions
//     });
//   } catch (error) {
//     console.error("Get questions error:", error);
//     res.status(500).json({ 
//       success: false, 
//       error: "Failed to fetch questions" 
//     });
//   }
// };

// // ✅ Get single question by ID
// // ✅ Get single question by ID - UPDATED
// export const getQuestionById = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     let question;
    
//     // 1. First try as MongoDB ObjectId
//     if (mongoose.Types.ObjectId.isValid(id)) {
//       question = await Question.findById(id);
//     }
    
//     // 2. If numeric ID, try to find by sequence or index
//     if (!question && !isNaN(id)) {
//       // Get all questions sorted
//       const allQuestions = await Question.find().sort({ createdAt: 1 });
//       const index = parseInt(id) - 1; // Convert "1" to array index 0
      
//       if (index >= 0 && index < allQuestions.length) {
//         question = allQuestions[index];
//       }
//     }
    
//     // 3. If still not found, search by title or other fields
//     if (!question) {
//       question = await Question.findOne({
//         $or: [
//           { question_en: { $regex: id, $options: 'i' } },
//           { question_hi: { $regex: id, $options: 'i' } }
//         ]
//       });
//     }
    
//     if (!question) {
//       return res.status(404).json({ 
//         success: false, 
//         error: "Question not found" 
//       });
//     }
    
//     res.json({
//       success: true,
//       data: question
//     });
//   } catch (error) {
//     console.error("Get question error:", error);
//     res.status(500).json({ 
//       success: false, 
//       error: "Server error" 
//     });
//   }
// };

// // ✅ Create new question (STRICT NEW FORMAT ONLY)
// export const createQuestion = async (req, res) => {
//   try {
//     console.log("📨 Received:", JSON.stringify(req.body, null, 2));
    
//     const { 
//       question_en, 
//       question_hi = "",
//       answer_en, 
//       answer_hi = "",
//       answer_ur = "",
//       references = {},
//       tags = [],
//       category = ""
//     } = req.body;

//     // ✅ STRICT NEW FORMAT VALIDATION
//     if (!question_en?.trim()) {
//       return res.status(400).json({
//         success: false,
//         error: "question_en (English question) is required"
//       });
//     }

//     if (!answer_en?.trim()) {
//       return res.status(400).json({
//         success: false,
//         error: "answer_en (English answer) is required"
//       });
//     }

//     // ❌ REJECT ANY OLD FORMAT
//     if (req.body.question) {
//       return res.status(400).json({
//         success: false,
//         error: "Use 'question_en' instead of 'question'"
//       });
//     }

//     // Clean references for NEW FORMAT
//     const cleanReferences = {
//       quran: (references.quran || []).filter(q => 
//         q.surah_en?.trim() || q.verse_en?.trim()
//       ).map(q => ({
//         surah_en: (q.surah_en || "").trim(),
//         surah_hi: (q.surah_hi || "").trim(),
//         ayah: (q.ayah || "").trim(),
//         verse_en: (q.verse_en || "").trim(),
//         verse_hi: (q.verse_hi || "").trim(),
//         meaning_en: (q.meaning_en || "").trim(),
//         meaning_hi: (q.meaning_hi || "").trim()
//       })),
      
//       hadith: (references.hadith || []).filter(h => 
//         h.source_en?.trim() || h.text_en?.trim()
//       ).map(h => ({
//         source_en: (h.source_en || "").trim(),
//         source_hi: (h.source_hi || "").trim(),
//         number: (h.number || "").trim(),
//         text_en: (h.text_en || "").trim(),
//         text_hi: (h.text_hi || "").trim()
//       })),
      
//       videos: (references.videos || []).filter(v => 
//         v.title_en?.trim() || v.url?.trim()
//       ).map(v => ({
//         title_en: (v.title_en || "").trim(),
//         title_hi: (v.title_hi || "").trim(),
//         url: (v.url || "").trim(),
//         scholar: (v.scholar || "").trim()
//       }))
//     };

//     // Create question in NEW FORMAT
//     const question = new Question({
//       question_en: question_en.trim(),
//       question_hi: question_hi.trim(),
//       answer_en: answer_en.trim(),
//       answer_hi: answer_hi.trim(),
//       answer_ur: answer_ur.trim(),
//       references: cleanReferences,
//       tags: tags.filter(tag => tag.trim()).map(tag => tag.trim()),
//       category: category.trim()
//     });

//     await question.save();

//     res.status(201).json({
//       success: true,
//       message: "✅ Question added successfully in bilingual format",
//       data: question
//     });

//   } catch (error) {
//     console.error("Create question error:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to add question",
//       details: error.message
//     });
//   }
// };

// // ✅ Update question (NEW FORMAT ONLY)
// export const updateQuestion = async (req, res) => {
//   try {
//     const updatedQuestion = await Question.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
    
//     if (!updatedQuestion) {
//       return res.status(404).json({
//         success: false,
//         error: "Question not found"
//       });
//     }
    
//     res.json({
//       success: true,
//       message: "Question updated successfully",
//       data: updatedQuestion
//     });
//   } catch (error) {
//     console.error("Update error:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to update question"
//     });
//   }
// };

// // ✅ Delete question
// export const deleteQuestion = async (req, res) => {
//   try {
//     const question = await Question.findByIdAndDelete(req.params.id);
    
//     if (!question) {
//       return res.status(404).json({
//         success: false,
//         error: "Question not found"
//       });
//     }
    
//     res.json({
//       success: true,
//       message: "Question deleted successfully"
//     });
//   } catch (error) {
//     console.error("Delete error:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to delete question"
//     });
//   }
// };








import mongoose from 'mongoose';
import Question from '../models/Question.js'; // ✅ CORRECT IMPORT

// ✅ Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    console.error("Get questions error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to fetch questions" 
    });
  }
};

// ✅ Get single question by ID - FIXED FOR NUMERIC IDs
export const getQuestionById = async (req, res) => {
  try {
    console.log('🔍 API Called: GET /api/questions/', req.params.id);
    
    const requestedId = req.params.id;
    let question = null;
    
    // FIRST: Get ALL questions to understand database
    const allQuestions = await Question.find({}).sort({ createdAt: 1 });
    console.log('📊 Total questions in DB:', allQuestions.length);
    
    if (allQuestions.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No questions found in database"
      });
    }
    
    // SHOW ALL QUESTIONS FOR DEBUGGING
    console.log('\n📋 ALL QUESTIONS IN DATABASE:');
    allQuestions.forEach((q, index) => {
      console.log(`${index + 1}. ID: ${q._id}`);
      console.log(`   Title: ${q.question_en?.substring(0, 50)}...`);
    });
    
    // LOGIC: Handle different ID types
    // 1. If ID is numeric (1, 2, 3...)
    if (!isNaN(requestedId)) {
      const index = parseInt(requestedId) - 1;
      console.log(`🔢 Numeric ID ${requestedId} → Array index: ${index}`);
      
      if (index >= 0 && index < allQuestions.length) {
        question = allQuestions[index];
        console.log(`✅ Found by array index ${index}: ${question._id}`);
      } else {
        console.log(`❌ Index ${index} out of range (0-${allQuestions.length-1})`);
      }
    }
    
    // 2. If ID is MongoDB ObjectId (24 char hex)
    if (!question && mongoose.Types.ObjectId.isValid(requestedId)) {
      console.log(`🔍 Trying as MongoDB ObjectId: ${requestedId}`);
      question = await Question.findById(requestedId);
      if (question) {
        console.log(`✅ Found by MongoDB ID`);
      }
    }
    
    // 3. Fallback: Return first question if not found
    if (!question) {
      console.log(`🔄 ID "${requestedId}" not found. Returning first question.`);
      question = allQuestions[0];
    }
    
    console.log(`🎯 Final question to return:`);
    console.log(`   - MongoDB ID: ${question._id}`);
    console.log(`   - Title: ${question.question_en?.substring(0, 50)}...`);
    
    res.json({
      success: true,
      data: question,
      debug: {
        requestedId,
        totalQuestions: allQuestions.length,
        foundByIdType: question._id === requestedId ? 'direct' : 'fallback'
      }
    });
    
  } catch (error) {
    console.error("🚨 Get question error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Server error: " + error.message 
    });
  }
};

// ✅ Create new question
export const createQuestion = async (req, res) => {
  try {
    console.log("📨 Received:", JSON.stringify(req.body, null, 2));
    
    const { 
      question_en, 
      question_hi = "",
      answer_en, 
      answer_hi = "",
      answer_ur = "",
      references = {},
      tags = [],
      category = ""
    } = req.body;

    if (!question_en?.trim()) {
      return res.status(400).json({
        success: false,
        error: "question_en (English question) is required"
      });
    }

    if (!answer_en?.trim()) {
      return res.status(400).json({
        success: false,
        error: "answer_en (English answer) is required"
      });
    }

    if (req.body.question) {
      return res.status(400).json({
        success: false,
        error: "Use 'question_en' instead of 'question'"
      });
    }

    const cleanReferences = {
      quran: (references.quran || []).filter(q => 
        q.surah_en?.trim() || q.verse_en?.trim()
      ).map(q => ({
        surah_en: (q.surah_en || "").trim(),
        surah_hi: (q.surah_hi || "").trim(),
        ayah: (q.ayah || "").trim(),
        verse_en: (q.verse_en || "").trim(),
        verse_hi: (q.verse_hi || "").trim(),
        meaning_en: (q.meaning_en || "").trim(),
        meaning_hi: (q.meaning_hi || "").trim()
      })),
      
      hadith: (references.hadith || []).filter(h => 
        h.source_en?.trim() || h.text_en?.trim()
      ).map(h => ({
        source_en: (h.source_en || "").trim(),
        source_hi: (h.source_hi || "").trim(),
        number: (h.number || "").trim(),
        text_en: (h.text_en || "").trim(),
        text_hi: (h.text_hi || "").trim()
      })),
      
      videos: (references.videos || []).filter(v => 
        v.title_en?.trim() || v.url?.trim()
      ).map(v => ({
        title_en: (v.title_en || "").trim(),
        title_hi: (v.title_hi || "").trim(),
        url: (v.url || "").trim(),
        scholar: (v.scholar || "").trim()
      }))
    };

    const question = new Question({
      question_en: question_en.trim(),
      question_hi: question_hi.trim(),
      answer_en: answer_en.trim(),
      answer_hi: answer_hi.trim(),
      answer_ur: answer_ur.trim(),
      references: cleanReferences,
      tags: tags.filter(tag => tag.trim()).map(tag => tag.trim()),
      category: category.trim()
    });

    await question.save();

    res.status(201).json({
      success: true,
      message: "✅ Question added successfully in bilingual format",
      data: question
    });

  } catch (error) {
    console.error("Create question error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to add question",
      details: error.message
    });
  }
};

// ✅ Update question
export const updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        error: "Question not found"
      });
    }
    
    res.json({
      success: true,
      message: "Question updated successfully",
      data: updatedQuestion
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update question"
    });
  }
};

// ✅ Delete question
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        error: "Question not found"
      });
    }
    
    res.json({
      success: true,
      message: "Question deleted successfully"
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete question"
    });
  }
};