// src/components/Footer.jsx - FIXED WITH EDUCATION
import { memo } from "react";
import {
  Mail,
  Instagram,
  MapPin,
  Heart,
  Users,
  BookOpen,
  Shield,
  GraduationCap,
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

// ✅ FIXED: Changed specialty to education
const ResearchMember = memo(({ name, role, education }) => (
  <div className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition group">
    <div className="flex items-start space-x-3">
      <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center shrink-0 group-hover:bg-purple-600/30 transition">
        <GraduationCap
          size={18}
          className="text-purple-400 group-hover:text-purple-300"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="font-semibold text-white truncate">{name}</h5>
        <p className="text-sm text-gray-400">{role}</p>
        <div className="flex items-start mt-1">
          <GraduationCap
            size={12}
            className="text-purple-300 mt-0.5 mr-1 shrink-0"
          />
          <p className="text-xs text-purple-300 truncate">{education}</p>
        </div>
      </div>
    </div>
  </div>
));

ResearchMember.displayName = "ResearchMember";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Research Team Data WITH EDUCATION
  const researchTeam = [
    {
      name: "MD MERAJ",
      role: "Platform Developer & Tech Lead",
      education: "B.Tech in Computer Science (Ongoing)",
    },
    {
      name: "Dr. Ahmed Raza",
      role: "Senior Islamic Researcher",
      education: "M.Tech + Ph.D in Islamic Studies, Al-Azhar University",
    },
    {
      name: "Mufti Mohammad Ali",
      role: "Fiqh & Hadith Specialist",
      education:
        "M.Tech in Islamic Jurisprudence, Islamic University of Medina",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">🕌</span>
              </div>
              <h3 className="text-xl font-bold">Islamic Q&A</h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              A platform dedicated to providing authentic Islamic knowledge,
              clearing misconceptions, and answering questions with proper
              references from Quran and Hadith.
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <Shield size={18} className="text-green-400" />
              <span className="text-sm text-gray-300">
                Tech + Islamic Scholarship Combined
              </span>
            </div>
          </div>

          {/* Research Team Section - FIXED */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold">Research Team</h4>
                <p className="text-sm text-gray-400">
                  Qualified Scholars & Technologists
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Our team combines modern technical education with traditional
              Islamic scholarship.
            </p>

            <div className="space-y-3 mt-4">
              {researchTeam.map((member, index) => (
                <ResearchMember
                  key={index}
                  name={member.name}
                  role={member.role}
                  education={member.education}
                />
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold border-l-4 border-blue-500 pl-3">
              Contact Developer
            </h4>
            <div className="space-y-3">
              <ContactItem
                icon={
                  <Mail size={20} className="text-blue-400 shrink-0" />
                }
              >
                riseofummah786@gmail.com
              </ContactItem>

              <ContactItem
                icon={
                  <Instagram
                    size={20}
                    className="text-blue-400 shrink-0"
                  />
                }
                href="https://instagram.com/md12_3meraj"
              >
                Follow on Instagram
              </ContactItem>

              <ContactItem
                icon={
                  <MapPin size={20} className="text-blue-400 shrink-0" />
                }
              >
                India
              </ContactItem>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold border-l-4 border-green-500 pl-3">
              Quick Links
            </h4>
            <div className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/questions", label: "Questions & Answers" },
                { href: "/questions", label: "Ask a Question" },
                { href: "/admin", label: "Admin Login" },
                { href: "#team", label: "Meet Our Team" },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="block text-gray-300 hover:text-white transition hover:translate-x-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} Islamic Q&A Platform. All rights reserved.
          </div>

          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>Tech by</span>
            <span className="text-white font-semibold">
              MD MERAJ (B.Tech CS)
            </span>
            <span className="text-gray-500">•</span>
            <span>Research by</span>
            <span className="text-purple-300">M.Tech Scholars</span>
          </div>

          <div className="text-gray-400 text-sm">
            <span className="hidden sm:inline">Version 2.1.0</span>
            <span className="sm:hidden">v2.1</span>
          </div>
        </div>

        {/* Education Badges */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="flex items-center space-x-2 bg-blue-900/30 px-3 py-1 rounded-full">
              <GraduationCap size={12} className="text-blue-300" />
              <span className="text-blue-300">B.Tech Computer Science</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-900/30 px-3 py-1 rounded-full">
              <GraduationCap size={12} className="text-purple-300" />
              <span className="text-purple-300">M.Tech Islamic Studies</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-900/30 px-3 py-1 rounded-full">
              <BookOpen size={12} className="text-green-300" />
              <span className="text-green-300">
                Traditional Islamic Education
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
