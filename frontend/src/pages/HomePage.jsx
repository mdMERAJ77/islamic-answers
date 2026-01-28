// src/pages/HomePage.jsx
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="text-center">
      {/* Header with Bilingual */}
      <h1 className="text-4xl font-bold text-gray-800 mb-3">
        Welcome to Islamic Q&A
      </h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        <span className="font-hindi">इस्लामी सवाल-जवाब
</span> |
        <span className="font-urdu" dir="rtl">
          {" "}
          اسلامی سوال و جواب
        </span>
      </h2>

      <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
        A platform to learn about Islam, clear misconceptions, and get authentic
        answers with references from Quran, Hadith, and authentic scholars.
      </p>

      {/* Hindi Translation */}
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto font-hindi">
        इस्लाम के बारे में सीखें, गलतफहमियाँ दूर करें, और कुरान-हदीस से सही जवाब पाएँ।
      </p>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Q&A Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <span className="text-2xl">📚</span>
            </div>
            <h2 className="text-2xl font-bold text-blue-700">
              Questions & Answers
            </h2>
          </div>
          <p className="text-gray-600 mb-3">
            Browse through answered questions about Islam with proper references
            from Quran, Hadith, and authentic sources.
          </p>
          <p className="text-gray-600 mb-6 font-hindi">
            कुरान और हदीस के हवाले से इस्लाम के बारे में सवालों के जवाब देखें।
          </p>
          <Link
            to="/questions"
            className="inline-block w-full bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium"
          >
            View All Questions →
          </Link>
        </div>

        {/* Ask Question Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <span className="text-2xl">❓</span>
            </div>
            <h2 className="text-2xl font-bold text-green-700">
              Raise a Question
            </h2>
          </div>
          <p className="text-gray-600 mb-3">
            Have a question about Islam? Submit it here and our admin will
            provide you with an authentic answer with references.
          </p>
          <p className="text-gray-600 mb-6 font-hindi">
            इस्लाम के बारे में कोई सवाल है? यहाँ पूछें और कुरान-हदीस के हवाले से सही जवाब पाएँ।
          </p>
          <Link
            to="/questions"
            className="inline-block w-full bg-linear-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-800 transition-all font-medium"
          >
            Ask a Question →
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-3xl font-bold text-blue-600 mb-2">📖</div>
          <h3 className="font-bold text-gray-800">Quran References</h3>
          <p className="text-gray-600 text-sm mt-2">
            Every answer linked to Quran verses
          </p>
          <p className="text-gray-600 text-sm font-hindi mt-1">
            हर उत्तर कुरान की आयतों से जुड़ा हुआ है|
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-3xl font-bold text-purple-600 mb-2">📚</div>
          <h3 className="font-bold text-gray-800">Hadith Authenticity</h3>
          <p className="text-gray-600 text-sm mt-2">
            Verified from authentic Hadith sources
          </p>
          <p className="text-gray-600 text-sm font-hindi mt-1">
            सही हदीस के साथ पुष्टि किया गया है|
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-3xl font-bold text-red-600 mb-2">🌍</div>
          <h3 className="font-bold text-gray-800">Trilingual Support</h3>
          <div className="mt-2">
            <p className="text-gray-600 text-sm">English | Hindi | Urdu</p>
            <p className="text-gray-600 text-sm font-hindi mt-1">
              अंग्रेजी | हिंदी | उर्दू
            </p>
            <p className="text-gray-600 text-sm font-urdu mt-1" dir="rtl">
              انگریزی | ہندی | اردو
            </p>
          </div>
        </div>
      </div>

      {/* About Section - Bilingual */}
      <div className="mt-12 bg-linear-to-r from-yellow-50 to-orange-50 p-8 rounded-xl border border-yellow-200 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          About This Platform
          <span className="block text-lg font-normal text-gray-600 mt-1 font-hindi">
            इस प्लेटफॉर्म के बारे में
          </span>
        </h3>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div>
            <h4 className="font-bold text-gray-800 mb-2">English</h4>
            <p className="text-gray-700">
              This website aims to provide authentic Islamic knowledge and clear
              common misconceptions. All answers are verified with references
              from authentic sources. Please use this platform responsibly for
              educational purposes.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-2 font-hindi">हिंदी</h4>
            <p className="text-gray-700 font-hindi">
              यह वेबसाइट प्रामाणिक इस्लामी ज्ञान प्रदान करने और सामान्य
              गलतफहमियों को दूर करने का लक्ष्य रखती है। सभी उत्तर प्रामाणिक
              स्रोतों से संदर्भों के साथ सत्यापित हैं। कृपया शैक्षिक उद्देश्यों
              के लिए इस प्लेटफॉर्म का जिम्मेदारी से उपयोग करें।
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-yellow-300">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>⚖️</span> Our Principles
            <span className="text-sm font-normal text-gray-600 ml-2 font-hindi">
              हमारे सिद्धांत
            </span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="font-bold text-green-700 mb-1">Authenticity</div>
              <div className="text-sm text-gray-600">प्रामाणिकता</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="font-bold text-blue-700 mb-1">Clarity</div>
              <div className="text-sm text-gray-600">स्पष्टता</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="font-bold text-purple-700 mb-1">Respect</div>
              <div className="text-sm text-gray-600">सम्मान</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-10">
        <p className="text-gray-600 mb-6">
          Start your journey of learning authentic Islam today
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/questions"
            className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Browse Questions
          </Link>
          <Link
            to="/admin/login"
            className="px-6 py-3 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
          >
            Admin Login
          </Link>
          <a
            href="https://quran.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-all"
          >
            Read Quran Online
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
