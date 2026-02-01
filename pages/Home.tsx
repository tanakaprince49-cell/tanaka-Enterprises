
import React from 'react';
import { ArrowRight, Zap, Target, ShieldCheck, MessageCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-6 max-w-6xl mx-auto text-center mb-24">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/10 dark:border-white/10 text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-8 animate-pulse-soft">
          <span className="w-1.5 h-1.5 bg-zinc-900 dark:bg-zinc-100 rounded-full"></span>
          <span>Enduring Infrastructure</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-zinc-900 dark:text-white">
          The architecture <br />
          <span className="text-zinc-400 dark:text-zinc-500 italic">of focus.</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
          Tanaka Enterprises is a software holding company dedicated to digital stewardship. 
          We engineer systems that respect human attention and foster intentional progress.
        </p>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link 
              to="/nestly" 
              className="btn-premium w-full sm:w-auto px-10 py-5 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-full flex items-center justify-center gap-2 group shadow-2xl shadow-zinc-900/10 dark:shadow-white/5"
            >
              Explore Nestly
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <Link to="/about" className="btn-premium w-full sm:w-auto px-10 py-5 glass border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white font-bold rounded-full flex items-center justify-center hover:bg-zinc-900/5 dark:hover:bg-white/5">
              Core Philosophy
            </Link>
          </div>
        </div>
      </section>

      {/* Investor Alert Section */}
      <section className="px-6 max-w-6xl mx-auto mb-32">
        <div className="glass p-8 md:p-12 rounded-[3rem] border border-zinc-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 bg-zinc-900/[0.01] dark:bg-white/[0.01]">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">Strategic Partnerships & Investment</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
              We are currently scaling our operations and seeking strategic investors who align with our vision of calm, intentional software. Join us in building the next generation of digital infrastructure.
            </p>
          </div>
          <a 
            href="https://wa.me/263780011810" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-premium px-8 py-4 bg-[#25D366] text-white font-bold rounded-2xl flex items-center gap-3 shadow-xl hover:shadow-[#25D366]/20 transition-all text-xs uppercase tracking-widest whitespace-nowrap"
          >
            <MessageCircle size={18} />
            Contact via WhatsApp
          </a>
        </div>
      </section>

      {/* Core Principles */}
      <section className="px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-32">
        <PrincipleCard 
          icon={<Zap size={24} className="text-zinc-900 dark:text-zinc-100" />}
          title="Radical Utility"
          description="Every interaction is a contract. We minimize cognitive overhead to ensure software serves the user, not the provider."
        />
        <PrincipleCard 
          icon={<Target size={24} className="text-zinc-900 dark:text-zinc-100" />}
          title="Precision Engineering"
          description="We build for longevity. Our systems are designed to operate with high availability and minimal friction over decades."
        />
        <PrincipleCard 
          icon={<ShieldCheck size={24} className="text-zinc-900 dark:text-zinc-100" />}
          title="Digital Sovereignty"
          description="Data is an extension of the self. We champion privacy-first architectures that restore agency to the individual."
        />
      </section>

      {/* Featured Project - NESTLY */}
      <section className="px-6 max-w-6xl mx-auto mb-20">
        <div className="glass rounded-[3rem] p-8 md:p-16 border border-zinc-200/50 dark:border-white/10 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/5 blur-[120px] rounded-full -mr-20 -mt-20 group-hover:bg-pink-500/10 transition-colors duration-1000"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 mb-4">Initial Offering</p>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 dark:text-white group-hover:translate-x-1 transition-transform duration-700 font-serif">Nestly</h2>
              <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed font-medium">
                The free online pregnancy tracker designed for calm and intentional monitoring of your maternal health journey.
              </p>
              <Link to="/nestly" className="inline-flex items-center gap-2 text-zinc-900 dark:text-white font-bold hover:gap-4 transition-all uppercase tracking-[0.2em] text-[10px] focus-visible:ring-1 focus-visible:ring-zinc-400">
                Explore Nestly <ArrowRight size={14} />
              </Link>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="aspect-[4/5] glass rounded-[3.5rem] border border-zinc-200/50 dark:border-white/10 shadow-3xl relative overflow-hidden transition-all duration-700 group-hover:-translate-y-3 group-hover:shadow-4xl">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Nestly Aesthetic" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-40 mix-blend-overlay grayscale group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="h-full flex flex-col items-center justify-center p-10 text-center relative z-10">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-pink-300 to-pink-500 flex items-center justify-center shadow-2xl mb-8 group-hover:rotate-6 transition-transform">
                    <Heart className="text-white fill-white" size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2 font-serif">Nestly</h3>
                  <p className="text-white/60 text-[9px] uppercase tracking-[0.5em]">Pregnancy Tracker</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const PrincipleCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="glass p-10 rounded-[2.5rem] border border-zinc-200/50 dark:border-white/10 transition-all duration-500 group cursor-default hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-white/5 hover:border-zinc-300 dark:hover:border-white/20">
    <div className="w-14 h-14 glass flex items-center justify-center rounded-2xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm border border-zinc-200 dark:border-white/5">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white group-hover:translate-x-1 transition-transform duration-500">{title}</h3>
    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm font-medium">
      {description}
    </p>
  </div>
);

export default Home;
