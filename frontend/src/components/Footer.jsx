// src/components/Footer.jsx - UPDATED WITH RESEARCH TEAM
import { memo } from "react";
import {
  Mail,
  Instagram,
  MapPin,
  Heart,
  Users,
  BookOpen,
  Shield,
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

const ResearchMember = memo(({ name, role, specialty }) => (
  <div className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition">
    <div className="flex items-start space-x-3">
      <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
        <Users size={18} className="text-purple-400" />
      </div>
      <div>
        <h5 className="font-semibold text-white">{name}</h5>
        <p className="text-sm text-gray-400">{role}</p>
        <p className="text-xs text-purple-300 mt-1">{specialty}</p>
      </div>
    </div>
  </div>
));

ResearchMember.displayName = "ResearchMember";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Research Team Data
  const researchTeam = [
    {
      name: "MD MERAJ",
      role: "Your Role",
      education: "B.Tech in Computer Science, XYZ University (2022-2026)",
    },
    {
      name: "Researcher 1 Name",
      role: "Their Role",
      education: "M.Tech in Islamic Studies, University Name",
    },
    {
      name: "Researcher 2 Name",
      role: "Their Role",
      education: "M.Tech in Islamic Jurisprudence, University Name",
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
                Answers verified by scholars
              </span>
            </div>
          </div>

          {/* Research Team Section - NEW */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen size={20} className="text-white" />
              </div>
              <h4 className="text-lg font-bold">Research Team</h4>
            </div>
            <p className="text-gray-300 text-sm">
              Our team of qualified Islamic scholars ensures every answer is
              accurate and authentic.
            </p>

            <div className="space-y-3 mt-4">
              {researchTeam.map((member, index) => (
                <ResearchMember
                  key={index}
                  name={member.name}
                  role={member.role}
                  specialty={member.specialty}
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
                  <Mail size={20} className="text-blue-400 flex-shrink-0" />
                }
              >
                riseofummah786@gmail.com
              </ContactItem>

              <ContactItem
                icon={
                  <Instagram
                    size={20}
                    className="text-blue-400 flex-shrink-0"
                  />
                }
                href="https://instagram.com/md12_3meraj"
              >
                Follow on Instagram
              </ContactItem>

              <ContactItem
                icon={
                  <MapPin size={20} className="text-blue-400 flex-shrink-0" />
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
                { href: "#research", label: "Meet Our Team" },
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
            <span>Made with</span>
            <Heart
              size={16}
              className="text-red-500 fill-current animate-pulse"
            />
            <span>by</span>
            <span className="text-white font-semibold">MD MERAJ</span>
            <span className="text-gray-500">•</span>
            <span className="text-purple-300">Research Team: 3 Members</span>
          </div>

          <div className="text-gray-400 text-sm">
            <span className="hidden sm:inline">Version 2.0.0</span>
            <span className="sm:hidden">v2.0</span>
          </div>
        </div>

        {/* Verification Badge */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Authentic References</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Scholar Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>24/7 Research Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
