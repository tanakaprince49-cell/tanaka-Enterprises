
import React, { useState } from 'react';
import { CheckCircle2, Heart, Scale, Moon, Droplets, Activity, Send, ExternalLink } from 'lucide-react';

const Nestly: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/mbddlaep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          source: "Nestly Beta Signup",
          timestamp: new Date().toISOString()
        }),
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <div className="inline-block px-4 py-1 glass border border-pink-200/50 dark:border-pink-500/20 rounded-full text-[10px] uppercase font-bold tracking-[0.25em] text-pink-500 dark:text-pink-400 mb-6">
              Our Newest Venture
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-zinc-900 dark:text-white tracking-tight font-serif">
              Nestly. <br /> 
              <span className="text-zinc-400 dark:text-zinc-500 italic">Your journey, simplified.</span>
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10 max-w-lg font-medium">
              Nestly is a free online pregnancy tracker designed to help expecting mothers monitor their health easily and safely. No app download required—just calm, intentional tracking.
            </p>
            
            <div className="space-y-5 mb-12">
              <FeatureItem text="Weight changes throughout your pregnancy" />
              <FeatureItem text="Sleep patterns to ensure proper rest" />
              <FeatureItem text="Hydration levels for overall wellness" />
              <FeatureItem text="Body changes and symptoms to stay aware" />
            </div>

            {!submitted ? (
              <div className="space-y-6">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email for the waitlist" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-8 py-5 glass bg-zinc-900/[0.03] dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400 font-medium"
                    required
                  />
                  <button 
                    disabled={loading}
                    className="btn-premium px-10 py-5 bg-gradient-to-r from-pink-400 to-pink-600 text-white font-bold rounded-full hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-2xl"
                  >
                    {loading ? 'Processing...' : 'Start Tracking Today'}
                    <Send size={18} />
                  </button>
                </form>
                <div className="flex items-center gap-4">
                   <div className="h-px flex-grow bg-zinc-200 dark:bg-white/5"></div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">or</span>
                   <div className="h-px flex-grow bg-zinc-200 dark:bg-white/5"></div>
                </div>
                <a 
                  href="https://nestly-eight.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-zinc-900 dark:text-white font-bold hover:opacity-70 transition-all uppercase tracking-[0.2em] text-[10px]"
                >
                  Go directly to account creation <ExternalLink size={14} />
                </a>
              </div>
            ) : (
              <div className="p-8 glass border border-green-500/30 rounded-3xl bg-green-500/[0.03] animate-in fade-in slide-in-from-bottom-3 duration-500">
                <h4 className="text-xl font-bold mb-2 flex items-center gap-2 text-zinc-900 dark:text-white">
                  <CheckCircle2 className="text-green-500" size={24} /> Welcome to the Nestly Beta.
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium">We'll notify you as soon as your personalized tracker is ready.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div className="relative group w-full max-w-sm">
              <div className="absolute -inset-10 bg-pink-500/[0.05] dark:bg-pink-500/[0.02] blur-[80px] rounded-full group-hover:bg-pink-500/[0.1] transition-all duration-1000"></div>
              <div className="relative glass rounded-[4rem] border border-zinc-200 dark:border-white/10 p-4 shadow-3xl scale-[0.98] group-hover:scale-100 transition-all duration-700 bg-white dark:bg-zinc-950">
                 <div className="bg-zinc-50 dark:bg-[#020617] rounded-[3.5rem] overflow-hidden aspect-[9/19] relative flex flex-col items-center pt-20 px-6 border border-zinc-200 dark:border-white/5">
                    <div className="w-28 h-28 bg-gradient-to-br from-pink-300 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl mb-12 animate-pulse-soft">
                      <Heart className="text-white fill-white" size={48} />
                    </div>
                    <div className="text-center mb-16">
                      <h2 className="text-5xl font-bold text-zinc-900 dark:text-white tracking-tighter font-serif">Nestly</h2>
                      <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-zinc-400 mt-4">Welcome Back</p>
                    </div>
                    <div className="w-full space-y-4">
                        <div className="h-12 w-full glass bg-zinc-200/50 dark:bg-white/5 rounded-2xl"></div>
                        <div className="h-12 w-full glass bg-zinc-200/50 dark:bg-white/5 rounded-2xl"></div>
                        <div className="h-14 w-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-2xl shadow-lg"></div>
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-100 dark:bg-[#020617] rounded-b-2xl border-x border-b border-zinc-200 dark:border-white/5"></div>
                 </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-zinc-400 text-[9px] uppercase tracking-[0.4em] font-bold mb-4 italic">Accessible everywhere</p>
              <div className="inline-flex items-center gap-3 text-xl font-bold text-zinc-900 dark:text-white px-8 py-4 glass border border-zinc-200 dark:border-white/10 rounded-2xl shadow-xl">
                No app download required.
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid md:grid-cols-4 gap-6 mb-24">
          <BreakdownCard 
            icon={<Scale size={24} className="text-pink-400" />}
            title="Weight Tracking"
            text="Easily log and visualize weight changes throughout each trimester."
          />
          <BreakdownCard 
            icon={<Moon size={24} className="text-indigo-400" />}
            title="Sleep Monitoring"
            text="Keep a pulse on your rest cycles to ensure optimal recovery for you and baby."
          />
          <BreakdownCard 
            icon={<Droplets size={24} className="text-blue-400" />}
            title="Hydration Intake"
            text="Set gentle reminders and track water consumption for systemic wellness."
          />
          <BreakdownCard 
            icon={<Activity size={24} className="text-emerald-400" />}
            title="Symptom Log"
            text="Document body changes and symptoms to stay aware and share with professionals."
          />
        </div>

        {/* Final CTA */}
        <div className="glass p-12 md:p-20 rounded-[4rem] border border-pink-200/30 dark:border-white/5 text-center relative overflow-hidden bg-gradient-to-b from-white to-pink-50/20 dark:from-zinc-950 dark:to-pink-900/5">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight font-serif">Stress-free health tracking.</h2>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 mb-10 max-w-2xl mx-auto font-medium">
              Start tracking today and stay in control of your pregnancy journey with Nestly. Our simple, calm interface respects your peace of mind.
            </p>
            <a 
              href="https://nestly-eight.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-12 py-5 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-full shadow-2xl hover:scale-105 transition-transform uppercase tracking-[0.2em] text-[10px]"
            >
                Create Your Account
            </a>
        </div>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400 group">
    <CheckCircle2 size={18} className="text-pink-300 dark:text-pink-900 transition-colors duration-500" />
    <span className="text-sm font-semibold tracking-tight">{text}</span>
  </div>
);

const BreakdownCard: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="glass p-8 rounded-[2.5rem] border border-zinc-200 dark:border-white/10 hover:border-pink-200/50 transition-all duration-700 hover:shadow-2xl">
    <div className="mb-6">{icon}</div>
    <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white tracking-tight font-serif">{title}</h3>
    <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed font-medium">{text}</p>
  </div>
);

export default Nestly;
