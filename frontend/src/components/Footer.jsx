// src/components/Footer.jsx - CORRECTED
import { memo } from 'react';
import { Mail, Instagram, MapPin, Heart } from "lucide-react";

// Memoized components - CORRECTED
const ContactItem = memo(({ icon, children, href }) => {
  const content = (
    <div className="flex items-center space-x-3">
      {icon}
      <span className="text-gray-300">{children}</span>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
      {content}
    </a>
  ) : content;
});

ContactItem.displayName = 'ContactItem';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold border-l-4 border-blue-500 pl-3">
              Contact Developer
            </h4>
            <div className="space-y-3">
              <ContactItem 
                icon={<Mail size={20} className="text-blue-400 flex-shrink-0" />}
              >
                riseofummah786@gmail.com
              </ContactItem>
              
              <ContactItem 
                icon={<Instagram size={20} className="text-blue-400 flex-shrink-0" />}
                href="https://instagram.com/md12_3meraj"
              >
                Follow on Instagram
              </ContactItem>
              
              <ContactItem 
                icon={<MapPin size={20} className="text-blue-400 flex-shrink-0" />}
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
              {['/', '/questions', '/questions', '/admin'].map((href, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="block text-gray-300 hover:text-white transition hover:translate-x-1"
                >
                  {['Home', 'Questions & Answers', 'Ask a Question', 'Admin Login'][idx]}
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
          </div>

          <div className="text-gray-400 text-sm">
            <span className="hidden sm:inline">Version 1.0.0</span>
            <span className="sm:hidden">v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;