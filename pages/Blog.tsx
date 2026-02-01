
import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, CheckCircle2 } from 'lucide-react';

const Blog: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/mbddlaep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "Journal Subscription" }),
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const posts = [
    {
      title: "The Architecture of Silence",
      description: "Exploring the necessity of non-extractive design in a world of constant notification.",
      category: "Philosophy",
      readTime: "6 min",
      date: "Spring 2025",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Engineering Intentionality",
      description: "How we utilize minimalist UI patterns to foster user focus and long-term habit formation.",
      category: "Product",
      readTime: "8 min",
      date: "Coming Soon",
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Decoupling Growth from Noise",
      description: "A look into the business model of Tanaka Enterprises and why we prioritize stewardship over scale.",
      category: "Strategy",
      readTime: "5 min",
      date: "Coming Soon",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20">
          <div className="inline-block px-4 py-1 glass border border-zinc-200 dark:border-white/10 rounded-full text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400 dark:text-zinc-500 mb-6">
            Insights & Discourse
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 italic text-zinc-900 dark:text-white tracking-tight">The Journal</h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl font-medium">
            Sharing our journey in building calm technology and defining the next generation of intentional digital tools.
          </p>
        </header>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <div 
              key={index} 
              className="glass rounded-[2.5rem] border border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/20 transition-all duration-700 group overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-zinc-900/[0.02] dark:hover:shadow-white/[0.02]"
            >
              <div className="flex flex-col md:flex-row gap-0">
                <div className="w-full md:w-56 h-56 md:h-auto grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-10 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] font-bold text-zinc-400 mb-5">
                      <span className="text-zinc-900 dark:text-white/60">{post.category}</span>
                      <span className="w-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full"></span>
                      <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors text-zinc-900 dark:text-zinc-300 tracking-tight">{post.title}</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 max-w-2xl font-medium">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-zinc-400 dark:text-zinc-600 text-[10px] uppercase tracking-[0.4em] font-bold">
                      {post.date}
                    </div>
                    <div className="group-hover:translate-x-2 transition-transform duration-500">
                       <ArrowRight size={20} className="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-24 p-12 glass rounded-[3rem] border border-zinc-200 dark:border-white/10 text-center shadow-xl">
          {!submitted ? (
            <>
              <BookOpen size={40} className="mx-auto mb-8 text-zinc-300 dark:text-zinc-700 animate-pulse-soft" />
              <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white tracking-tight">Subscribe to our dispatch</h3>
              <p className="text-zinc-500 dark:text-zinc-400 mb-10 max-w-md mx-auto font-medium">
                Get occasional updates on our research, development, and new product launches.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                  className="flex-grow px-8 py-5 glass border border-zinc-200 dark:border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-white/5 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all text-zinc-900 dark:text-white bg-transparent font-medium"
                />
                <button 
                  disabled={loading}
                  className="btn-premium px-10 py-5 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:opacity-95 transition-all disabled:opacity-50 shadow-xl"
                >
                  {loading ? 'Joining...' : 'Join'}
                </button>
              </form>
            </>
          ) : (
            <div className="py-10 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-zinc-900 dark:bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <CheckCircle2 size={32} className="text-white dark:text-zinc-900" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white tracking-tight">Welcome Aboard</h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">You've been added to our journal dispatch.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Blog;
