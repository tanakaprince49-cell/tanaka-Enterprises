
import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Loader2, Shield, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../App';

interface AuthProps {
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  user: UserProfile;
}

const Auth: React.FC<AuthProps> = ({ setUser, user }) => {
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    if (mode === 'signup') {
        window.open('https://nestly-eight.vercel.app', '_blank');
        return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/mbddlaep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          action: mode === 'login' ? 'User Login' : 'User Signup',
          timestamp: new Date().toISOString()
        }),
      });
      
      if (response.ok) {
        const username = email.split('@')[0];
        setUser({
          email: email,
          name: username,
          profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
          isLoggedIn: true
        });
        setSubmitted(true);
      } else {
        throw new Error("Auth request failed");
      }
    } catch (error) {
      console.error("Error during auth:", error);
      // Fallback for demo purposes
      const username = email.split('@')[0];
      setUser({
        email: email,
        name: username,
        profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
        isLoggedIn: true
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-40 pb-20 px-6 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        {!submitted ? (
          <div className="glass p-10 md:p-12 rounded-[3rem] border border-zinc-200 dark:border-white/10 shadow-3xl text-center">
            <div className="w-16 h-16 glass border border-zinc-200 dark:border-white/10 flex items-center justify-center rounded-2xl mb-8 mx-auto">
              <Shield size={32} className="text-zinc-900 dark:text-white" />
            </div>
            
            <h1 className="text-3xl font-bold mb-3 text-zinc-900 dark:text-white tracking-tight font-serif">
              {mode === 'login' ? 'Welcome Back' : 'Join Nestly'}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8 font-medium">
              {mode === 'login' 
                ? 'Enter your credentials to access your intentional dashboard.' 
                : 'Account creation for Nestly is handled securely on our dedicated platform.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full glass bg-zinc-900/[0.02] dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 rounded-2xl px-12 py-5 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-white/5 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all text-zinc-900 dark:text-white font-medium"
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" size={20} />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="btn-premium w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl flex items-center justify-center gap-3 hover:opacity-95 transition-all disabled:opacity-50 shadow-2xl text-xs uppercase tracking-[0.2em]"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : (mode === 'login' ? 'Secure Login' : 'Create Account')}
                {!loading && (mode === 'login' ? <ArrowRight size={18} /> : <ExternalLink size={18} />)}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-white/10">
              <p className="text-sm text-zinc-500 font-medium">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="ml-2 text-zinc-900 dark:text-white font-bold hover:underline"
                >
                  {mode === 'login' ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className="glass p-12 rounded-[3rem] border border-zinc-200 dark:border-white/10 shadow-3xl text-center animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="w-20 h-20 bg-zinc-900 dark:bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <CheckCircle2 size={40} className="text-white dark:text-zinc-900" />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white tracking-tight font-serif">
              Welcome back, {user.name}.
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 mb-10 max-w-sm mx-auto font-medium leading-relaxed">
              You are officially in the Nestly beta queue.
            </p>
            <Link 
              to="/dashboard"
              className="btn-premium w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl flex items-center justify-center gap-3 hover:opacity-95 transition-all shadow-2xl text-xs uppercase tracking-[0.2em]"
            >
              Access Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
