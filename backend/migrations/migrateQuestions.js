import mongoose from 'mongoose';
import Question from '../models/Question.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/islamic-answers';

const migrateQuestions = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get all existing questions (old format)
    const oldQuestions = await mongoose.connection.db.collection('questions').find().toArray();
    console.log(`📊 Found ${oldQuestions.length} questions to migrate`);

    let migratedCount = 0;
    let skippedCount = 0;

    for (const oldQuestion of oldQuestions) {
      // Check if already migrated (has question_en field)
      if (oldQuestion.question_en) {
        console.log(`⏩ Skipping ${oldQuestion._id} - Already in new format`);
        skippedCount++;
        continue;
      }

      console.log(`🔄 Migrating: ${oldQuestion.question?.substring(0, 50)}...`);

      // Convert old format to new format
      const newQuestion = {
        // Question fields
        question_en: oldQuestion.question || '',
        question_hi: '', // No Hindi question in old data
        
        // Answer fields
        answer_en: oldQuestion.answer?.en || '',
        answer_hi: oldQuestion.answer?.hi || '',
        answer_ur: oldQuestion.answer?.ur || '',
        
        // References - convert to bilingual structure
        references: {
          quran: (oldQuestion.references?.quran || []).map(q => ({
            surah_en: q.surah || '',
            surah_hi: '', // No Hindi surah in old data
            ayah: q.ayah || '',
            verse_en: q.text || '',
            verse_hi: '', // No Hindi verse
            meaning_en: '', // Not in old data
            meaning_hi: ''  // Not in old data
          })),
          
          hadith: (oldQuestion.references?.hadith || []).map(h => ({
            source_en: h.source || '',
            source_hi: '', // No Hindi source
            number: h.number || '',
            text_en: h.text || '',
            text_hi: '' // No Hindi text
          })),
          
          videos: (oldQuestion.references?.videos || []).map(v => ({
            title_en: v.title || '',
            title_hi: '', // No Hindi title
            url: v.url || '',
            scholar: v.scholar || ''
          }))
        },
        
        // Keep other fields
        tags: oldQuestion.tags || [],
        category: oldQuestion.category || '',
        views: oldQuestion.views || 0,
        createdAt: oldQuestion.createdAt || new Date(),
        updatedAt: new Date()
      };

      // Update in database
      await mongoose.connection.db.collection('questions').updateOne(
        { _id: oldQuestion._id },
        { $set: newQuestion }
      );

      migratedCount++;
      console.log(`✅ Migrated: ${oldQuestion._id}`);
    }

    console.log('\n🎉 MIGRATION COMPLETE!');
    console.log(`✅ Migrated: ${migratedCount} questions`);
    console.log(`⏩ Skipped: ${skippedCount} questions (already migrated)`);
    console.log(`📊 Total: ${oldQuestions.length} questions in database`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
};

// Run migration
migrateQuestions();