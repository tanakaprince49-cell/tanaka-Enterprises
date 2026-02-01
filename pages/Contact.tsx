
import React, { useState } from 'react';
import { Mail, Linkedin, MapPin, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Investment Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/mbddlaep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "Contact Form" }),
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitted(true); // User feedback even on error for this demo
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <h1 className="text-5xl md:text-8xl font-bold mb-10 text-zinc-900 dark:text-white tracking-tighter leading-[1.1]">Get in <br /><span className="text-zinc-400 dark:text-zinc-600">touch.</span></h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-16 max-w-md font-medium">
              Whether you're an investor, a potential collaborator, or an early user—we'd love to hear your thoughts.
            </p>

            <div className="space-y-10">
              <ContactMethod 
                icon={<MessageCircle size={22} className="text-[#25D366]" />} 
                label="WhatsApp (Investors)" 
                value="0780011810"
                href="https://wa.me/263780011810"
              />
              <ContactMethod 
                icon={<Mail size={22} />} 
                label="Email" 
                value="tanaka@tanakaenterprises.com"
                href="mailto:tanaka@tanakaenterprises.com"
              />
              <ContactMethod 
                icon={<Linkedin size={22} />} 
                label="LinkedIn" 
                value="Tanaka Gaadzikwa"
                href="https://www.linkedin.com/in/tanaka-gaadzikwa-a7bb1335b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              />
              <ContactMethod 
                icon={<MapPin size={22} />} 
                label="Location" 
                value="Global / Remote"
              />
            </div>
          </div>

          <div className="glass p-12 md:p-16 rounded-[3.5rem] border border-zinc-200 dark:border-white/10 shadow-3xl">
            {!submitted ? (
              <>
                <h3 className="text-3xl font-bold mb-10 text-zinc-900 dark:text-white tracking-tight">Send a message</h3>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400 dark:text-zinc-600 px-1">Name</label>
                      <input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        type="text" 
                        className="w-full glass bg-zinc-900/[0.02] dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-white/5 focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-900 dark:text-white transition-all font-medium" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400 dark:text-zinc-600 px-1">Email</label>
                      <input 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        type="email" 
                        className="w-full glass bg-zinc-900/[0.02] dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-white/5 focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-900 dark:text-white transition-all font-medium" 
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400 dark:text-zinc-600 px-1">Subject</label>
                    <div className="relative">
                      <select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full glass bg-zinc-900/[0.02] dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-white/5 focus:border-zinc-400 dark:focus:border-zinc-600 appearance-none text-zinc-900 dark:text-white transition-all font-medium cursor-pointer">
                        <option className="bg-zinc-50 dark:bg-zinc-900">Investment Inquiry</option>
                        <option className="bg-zinc-50 dark:bg-zinc-900">Press / Media</option>
                        <option className="bg-zinc-50 dark:bg-zinc-900">Partnership</option>
                        <option className="bg-zinc-50 dark:bg-zinc-900">Other</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                        <ArrowRight size={16} className="rotate-90" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400 dark:text-zinc-600 px-1">Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6} 
                      className="w-full glass bg-zinc-900/[0.02] dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-white/5 focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-900 dark:text-white transition-all font-medium resize-none"
                    ></textarea>
                  </div>
                  <button 
                    disabled={loading}
                    className="btn-premium w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-full flex items-center justify-center gap-3 hover:opacity-95 transition-all disabled:opacity-50 shadow-2xl text-xs uppercase tracking-[0.2em]"
                  >
                    {loading ? 'Sending...' : 'Send Message'} <ArrowRight size={18} />
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="w-20 h-20 bg-zinc-900 dark:bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <CheckCircle2 size={40} className="text-white dark:text-zinc-900" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white tracking-tight">Message Received</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mb-10 max-w-sm mx-auto font-medium leading-relaxed">
                  Thank you for reaching out. We appreciate your interest in Tanaka Enterprises and will respond as soon as possible.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn-premium px-10 py-4 glass border border-zinc-200 dark:border-white/10 rounded-full text-zinc-900 dark:text-white font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-900/5 dark:hover:bg-white/5"
                >
                  Send another
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactMethod: React.FC<{ icon: React.ReactNode; label: string; value: string; href?: string }> = ({ icon, label, value, href }) => {
  const content = (
    <div className="flex items-center gap-6 group cursor-pointer">
      <div className="w-14 h-14 glass border border-zinc-200 dark:border-white/10 flex items-center justify-center rounded-[1.25rem] group-hover:border-zinc-400 dark:group-hover:border-white/30 transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
        <span className="text-zinc-900 dark:text-white group-hover:scale-110 transition-transform duration-500">{icon}</span>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400 dark:text-zinc-600 mb-1.5">{label}</p>
        <p className="text-base font-semibold text-zinc-900 dark:text-white group-hover:text-zinc-500 dark:group-hover:text-zinc-300 transition-colors tracking-tight">{value}</p>
      </div>
    </div>
  );

  return href ? <a href={href} target="_blank" rel="noreferrer" className="block focus-visible:ring-offset-8 rounded-2xl">{content}</a> : content;
};

export default Contact;
