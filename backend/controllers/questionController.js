import Question from "../models/Question.js";

// ✅ Get all questions (NEW FORMAT ONLY)
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

// ✅ Get single question by ID
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ 
        success: false, 
        error: "Question not found" 
      });
    }
    
    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    console.error("Get question error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Server error" 
    });
  }
};

// ✅ Create new question (STRICT NEW FORMAT ONLY)
export const createQuestion = async (req, res) => {
  try {
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

    // ✅ STRICT VALIDATION - NEW FORMAT ONLY
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

    // ❌ REJECT any old format attempts
    if (req.body.question) {
      return res.status(400).json({
        success: false,
        error: "Old format not accepted. Use question_en instead of 'question'"
      });
    }

    if (req.body.answer && typeof req.body.answer === 'object') {
      return res.status(400).json({
        success: false,
        error: "Old format not accepted. Use answer_en, answer_hi, answer_ur directly"
      });
    }

    // ✅ Clean references
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

    // ✅ Create new question
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
      message: "Question added successfully in bilingual format",
      data: question
    });

  } catch (error) {
    console.error("Create question error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to add question",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
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