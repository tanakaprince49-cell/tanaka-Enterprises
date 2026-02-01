
import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-900 dark:text-white mb-2">Tanaka Enterprises</p>
          <p className="text-zinc-500 text-sm">Building software that breathes.</p>
        </div>
        
        <div className="flex space-x-6 text-zinc-500">
          <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors"><Twitter size={20} /></a>
          <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors"><Github size={20} /></a>
          <a href="https://www.linkedin.com/in/tanaka-gaadzikwa-a7bb1335b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors"><Linkedin size={20} /></a>
        </div>

        <div className="text-zinc-600 text-[10px] uppercase tracking-widest font-medium">
          © {new Date().getFullYear()} Tanaka Gaadzikwa. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
