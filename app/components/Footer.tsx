import React from 'react';

const Footer = () => {
  return (
    <footer className="max-w-7xl flex justify-between w-full border-t border-white/10 bg-black text-white p-4">
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Built by</span>
          <a 
            href="https://github.com/dyra-12" 
            className="text-cyan-500 hover:text-cyan-400 underline underline-offset-4 transition-colors"
          >
            Dyra 
          </a>
          <span> and </span>
          <a 
            href="https://github.com/Avenster" 
            className="text-cyan-500 hover:text-cyan-400 underline underline-offset-4 transition-colors"
          >
            Avenster
          </a>
          
        </div>
      </div>
    <div className="flex items-center gap-1">
    <span className="text-sm">The source code is available on</span>
    <a href="https://github.com/dyra-12" className="text-sm hover:underline">GitHub</a>
    </div>
    </footer>
  );
};

export default Footer;