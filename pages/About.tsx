
import React from 'react';
import { ExternalLink, Quote, Target, Cpu } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-zinc-900 dark:text-white">The Thesis</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            In an era of attention extraction, we are building for the long-term stewardship of the digital self.
          </p>
        </header>

        <div className="space-y-16">
          {/* Main Thesis Image - Fixed URL and refined styling */}
          <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden glass border border-black/5 dark:border-white/10 mb-16 relative group shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600" 
              alt="Conceptual Architecture and Focus"
              className="w-full h-full object-cover opacity-70 dark:opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-50/20 dark:from-[#050505]/40 to-transparent pointer-events-none"></div>
          </div>

          <section className="glass p-10 rounded-[2.5rem] border border-black/5 dark:border-white/10 relative">
            <Quote className="absolute top-10 right-10 text-zinc-900/5 dark:text-white/5 w-20 h-20" />
            <h2 className="text-3xl font-bold mb-6 italic text-zinc-900 dark:text-white">The Foundation</h2>
            <div className="prose prose-zinc dark:prose-invert prose-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p className="mb-6">
                Founded by Tanaka Gaadzikwa, Tanaka Enterprises represents a fundamental shift in how software is conceived. 
                Our work is rooted in the belief that digital tools should be an extension of human capability, not a distraction from it.
              </p>
              <p className="mb-6">
                Tanaka began this journey by identifying a critical failure in modern product design: the prioritization of engagement over utility. 
                As a developer and designer, he sought to create an alternative—a holding company for software that honors silence and efficiency.
              </p>
              <p>
                We do not build for the next quarter; we build for the next decade. Our portfolio consists of intentional, 
                high-utility applications that leverage emerging technology to reduce, rather than increase, cognitive load.
              </p>
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-3xl border border-black/5 dark:border-white/10">
              <div className="w-10 h-10 glass border border-black/5 dark:border-white/10 flex items-center justify-center rounded-xl mb-6">
                <Target size={20} className="text-zinc-900 dark:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">Strategic Intent</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Our mission is to decouple productivity from anxiety. We engineer environments that foster 
                flow states and allow users to achieve significant outcomes with minimal digital interference.
              </p>
            </div>
            <div className="glass p-8 rounded-3xl border border-black/5 dark:border-white/10">
              <div className="w-10 h-10 glass border border-black/5 dark:border-white/10 flex items-center justify-center rounded-xl mb-6">
                <Cpu size={20} className="text-zinc-900 dark:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">Technological Ethos</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                We utilize AI and modern distributed systems to create anticipatory software. 
                Technology should vanish into the background once its purpose is fulfilled.
              </p>
            </div>
          </div>

          <section className="text-center py-20 border-y border-black/5 dark:border-white/5">
            <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Quiet Innovation</h2>
            <p className="text-zinc-500 italic mb-10">"Software is the new architecture of human experience."</p>
            <div className="flex justify-center gap-6">
              <a href="https://www.linkedin.com/in/tanaka-gaadzikwa-a7bb1335b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white hover:text-zinc-500 transition-colors">
                Corporate <ExternalLink size={14} />
              </a>
              <span className="text-zinc-300 dark:text-zinc-800">|</span>
              <a href="#" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white hover:text-zinc-500 transition-colors">
                Insight <ExternalLink size={14} />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
