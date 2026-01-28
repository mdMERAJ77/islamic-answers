// src/components/Footer.jsx - TRADITIONAL SCHOLARSHIP FOCUS
import { memo } from "react";
import {
  Mail,
  Instagram,
  MapPin,
  Heart,
  BookOpen,
  Users,
  AlertTriangle,
  GraduationCap,
  Video,
  Library,
} from "lucide-react";

// Memoized components
const ContactItem = memo(({ icon, children, href }) => {
  const content = (
    <div className="flex items-center space-x-3">
      {icon}
      <span className="text-gray-300">{children}</span>
    </div>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition"
    >
      {content}
    </a>
  ) : (
    content
  );
});

ContactItem.displayName = "ContactItem";

const ResearchMember = memo(({ name, role, education, icon }) => (
  <div className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition group">
    <div className="flex items-start space-x-3">
      <div className="w-10 h-10 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:from-green-600/30 group-hover:to-emerald-600/30 transition">
        {icon || (
          <BookOpen
            size={18}
            className="text-green-400 group-hover:text-green-300"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="font-semibold text-white truncate">{name}</h5>
        <p className="text-sm text-gray-400">{role}</p>
        <div className="flex items-start mt-1">
          <GraduationCap
            size={12}
            className="text-emerald-300 mt-0.5 mr-1 flex-shrink-0"
          />
          <p className="text-xs text-emerald-300 truncate">{education}</p>
        </div>
      </div>
    </div>
  </div>
));

ResearchMember.displayName = "ResearchMember";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">📖</span>
              </div>
              <h3 className="text-xl font-bold">Islamic Q&A</h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Combating Islamic misinformation through traditional scholarship.
              Every answer verified with Quran, Hadith, and authentic scholarly
              references.
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <Library size={18} className="text-yellow-400" />
              <span className="text-sm text-gray-300">
                References: Quran → Hadith → Scholarly Works → Video Evidence
              </span>
            </div>
          </div>

          {/* TRADITIONAL SCHOLARSHIP TEAM */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg flex items-center justify-center">
                <BookOpen size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold">Scholarly Research Team</h4>
                <p className="text-sm text-gray-400">
                  Quran & Hadith Based Verification
                </p>
              </div>
            </div>

            <p className="text-gray-300 text-sm">
              Detecting misconceptions through deep study of Islamic texts and
              cross-verification with authentic scholar videos and publications.
            </p>

            <div className="space-y-3 mt-4">
              {/* CHISTI HABIB */}
              <ResearchMember
                name="CHISTI HABIB"
                role="Content Research Lead"
                education="M.Tech in Computer Networking(Ongoing) + Islamic Studies"
                icon={<BookOpen size={18} className="text-blue-400" />}
              />

              {/* MD MERAJ */}
              <ResearchMember
                name="MD MERAJ"
                role="Technical Research Lead"
                education="B.Tech Computer Science"
                icon={<Cpu size={18} className="text-green-400" />}
              />

              <ResearchMember
                name="Quranic Research Unit"
                role="Quran Tafseer & Context Analysis"
                education="Specialized in classical tafseer literature"
                icon={<BookOpen size={18} className="text-blue-400" />}
              />

              <ResearchMember
                name="Hadith Authentication Team"
                role="Hadith Verification & Chain Analysis"
                education="Experts in Sahih Bukhari, Muslim, etc."
                icon={<Library size={18} className="text-purple-400" />}
              />

              <ResearchMember
                name="Scholarly Reference Team"
                role="Cross-Verification with Scholars"
                education="Reference: 10+ authentic scholar videos & books"
                icon={<Video size={18} className="text-red-400" />}
              />
            </div>
          </div>

          {/* Report Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold border-l-4 border-green-500 pl-3">
              Report Misconception
            </h4>
            <div className="space-y-3">
              <ContactItem
                icon={<Mail size={20} className="text-blue-400 shrink-0" />}
              >
                riseofummah786@gmail.com
              </ContactItem>

              <ContactItem
                icon={
                  <AlertTriangle
                    size={20}
                    className="text-yellow-400 flex-shrink-0"
                  />
                }
              >
                Submit for Scholarly Review
              </ContactItem>

              <ContactItem
                icon={
                  <Video size={20} className="text-red-400 flex-shrink-0" />
                }
              >
                Send Video for Analysis
              </ContactItem>
            </div>

            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
              <h5 className="font-semibold text-white text-sm mb-2">
                Verification Process:
              </h5>
              <ol className="text-xs text-gray-400 space-y-1">
                <li>1. Quranic evidence check</li>
                <li>2. Hadith authentication</li>
                <li>3. Scholarly opinion comparison</li>
                <li>4. Video reference verification</li>
              </ol>
            </div>
          </div>

          {/* Quick Links */}
          {/* Research Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold border-l-4 border-teal-500 pl-3">
              Research Resources
            </h4>
            <div className="space-y-2">
              {[
                {
                  label: "Quranic References",
                  onClick: () =>
                    alert(
                      "📖 Quran references section coming soon!\nWe're compiling authentic verses with explanations.",
                    ),
                },
                {
                  label: "Hadith Database",
                  onClick: () =>
                    alert(
                      "📚 Hadith database under development!\nVerified Hadith collection being prepared.",
                    ),
                },
                {
                  label: "Scholar Videos",
                  href: "https://youtube.com/playlist?list=YOUR_PLAYLIST_ID", // YouTube link daalo
                  target: "_blank",
                },
                {
                  label: "Debunked Myths",
                  onClick: () =>
                    alert(
                      "🚫 Debunked myths section launching next week!\n50+ misconceptions analyzed.",
                    ),
                },
                {
                  label: "Research Methodology",
                  onClick: () => {
                    // Show methodology in modal
                    const methodology = `
          4-STEP VERIFICATION PROCESS:
          
          1️⃣ QURAN CHECK: Verify with Quranic verses
          2️⃣ HADITH AUTHENTICATION: Cross-check with Sahih Hadith
          3️⃣ SCHOLAR OPINION: Compare with authentic scholars
          4️⃣ VIDEO EVIDENCE: Reference scholar videos
          
          ✅ Every answer goes through this process!
          `;
                    alert(methodology);
                  },
                },
              ].map((item, idx) =>
                item.href ? (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-300 hover:text-white transition hover:translate-x-1"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={idx}
                    onClick={item.onClick}
                    className="block text-gray-300 hover:text-white transition hover:translate-x-1 w-full text-left"
                  >
                    {item.label}
                  </button>
                ),
              )}
            </div>

            {/* Status Badge */}
            <div className="mt-4 p-2 bg-gray-800/50 rounded text-xs text-center">
              <span className="text-gray-400">
                🔧 Sections launching gradually
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} Traditional Islamic Research Platform
          </div>

          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>Platform by</span>
            <span className="text-white font-semibold">MD MERAJ</span>
            <span className="text-gray-500">•</span>
            <span>Research by</span>
            <span className="text-green-300">Traditional Scholarship Team</span>
          </div>

          <div className="text-gray-400 text-sm">
            <span className="hidden sm:inline">Research Methodology v2.5</span>
            <span className="sm:hidden">v2.5</span>
          </div>
        </div>

        {/* Research Methodology Badges */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="flex items-center space-x-2 bg-green-900/30 px-3 py-1 rounded-full">
              <BookOpen size={12} className="text-green-300" />
              <span className="text-green-300">Quran-Based Research</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-900/30 px-3 py-1 rounded-full">
              <Library size={12} className="text-blue-300" />
              <span className="text-blue-300">Hadith Authentication</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-900/30 px-3 py-1 rounded-full">
              <Video size={12} className="text-purple-300" />
              <span className="text-purple-300">Scholar Video References</span>
            </div>
            <div className="flex items-center space-x-2 bg-teal-900/30 px-3 py-1 rounded-full">
              <Users size={12} className="text-teal-300" />
              <span className="text-teal-300">Cross-Verification Process</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
