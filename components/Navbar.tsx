
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, LogIn, User } from 'lucide-react';
import { UserProfile } from '../App';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  user: UserProfile;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Enterprises', href: '/' },
    { label: 'Nestly', href: '/nestly' },
    { label: 'Philosophy', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 ${scrolled ? 'pt-2' : 'pt-4'}`}>
      <div className={`max-w-6xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-full shadow-2xl transition-all duration-700 ${scrolled ? 'shadow-black/5 dark:shadow-white/5 border-zinc-200/50 dark:border-white/10' : 'border-transparent'}`}>
        <Link 
          to="/" 
          className="flex items-center space-x-2 group focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-black rounded-lg"
        >
          <span className="text-sm md:text-lg font-bold tracking-tighter uppercase text-zinc-900 dark:text-white whitespace-nowrap group-hover:opacity-70 transition-opacity">
            Tanaka Enterprises
          </span>
          <span className="w-1.5 h-1.5 bg-zinc-900 dark:bg-white rounded-full hidden sm:block animate-pulse-soft"></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`relative px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 rounded-full focus-visible:ring-1 focus-visible:ring-zinc-400 dark:focus-visible:ring-white/30 
                ${isActive(item.href) 
                  ? 'text-zinc-900 dark:text-white opacity-100' 
                  : 'text-zinc-400 dark:text-zinc-500 opacity-60 hover:opacity-100 hover:text-zinc-900 dark:hover:text-white hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] dark:hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-zinc-900 dark:bg-white rounded-full animate-dot-in shadow-[0_0_8px_rgba(255,255,255,0.5)] dark:shadow-[0_0_8px_rgba(255,255,255,0.3)]"></span>
              )}
            </Link>
          ))}
          
          <div className="w-px h-4 bg-zinc-200 dark:bg-white/10 mx-2"></div>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-900/5 dark:hover:bg-white/5 transition-all text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white active:scale-90 focus-visible:ring-1 focus-visible:ring-zinc-400 dark:focus-visible:ring-white/30"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          
          {user.isLoggedIn ? (
            <Link 
              to="/dashboard" 
              className="ml-2 flex items-center gap-2 pl-2 pr-4 py-1.5 glass rounded-full border border-zinc-200/50 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30 transition-all group"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden border border-zinc-200 dark:border-white/10">
                <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white max-w-[80px] truncate">{user.name}</span>
            </Link>
          ) : (
            <Link 
              to="/auth" 
              className="btn-premium ml-2 px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-lg hover:shadow-zinc-900/20 dark:hover:shadow-white/10 active:scale-95 transition-all flex items-center gap-2"
            >
              <LogIn size={12} />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-900/5 dark:hover:bg-white/5 transition-colors text-zinc-400 dark:text-zinc-500"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            className="p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white active:scale-90 transition-transform"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-24 left-6 right-6 glass p-8 rounded-[2.5rem] border border-zinc-200/50 dark:border-white/10 md:hidden animate-in fade-in zoom-in-95 duration-500 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-bold py-3 transition-all flex items-center justify-between ${
                  isActive(item.href) ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'
                }`}
              >
                {item.label}
                {isActive(item.href) && <span className="w-1.5 h-1.5 bg-zinc-900 dark:bg-white rounded-full"></span>}
              </Link>
            ))}
            <div className="pt-6 mt-4 border-t border-zinc-200 dark:border-white/10">
              <Link 
                to={user.isLoggedIn ? "/dashboard" : "/auth"}
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-center rounded-2xl block uppercase tracking-widest text-xs"
              >
                {user.isLoggedIn ? "Dashboard" : "Login"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
