import React from 'react';
import './Footer.css'; // Importing the custom CSS for that extra vaporwave vibe

const Footer = () => {
  return (
    <footer className="footer bg-gradient-to-r from-purple-900 via-pink-900 to-cyan-900 text-white py-8 px-4 relative overflow-hidden">
      {/* Glowy background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side - Copyright */}
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-bold glow-text">
              &copy; 2024 Your Name. All rights reserved, dude.
            </p>
          </div>

          {/* Center - Links */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
            <a href="#hero" className="hover:text-cyan-300 transition-colors duration-300 glow-link">
              Home
            </a>
            <a href="#projects" className="hover:text-pink-300 transition-colors duration-300 glow-link">
              Projects
            </a>
            <a href="#contact" className="hover:text-purple-300 transition-colors duration-300 glow-link">
              Contact
            </a>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors duration-300 glow-link">
              GitHub
            </a>
          </div>

          {/* Right side - Social or extra */}
          <div className="text-sm opacity-75">
            <p>Made with ❤️ in Vaporwave Land</p>
          </div>
        </div>

        {/* Flashy bottom line */}
        <div className="mt-6 border-t border-cyan-400 pt-4">
          <p className="text-center text-sm animate-pulse">
            Keep it retro, keep it cool.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;