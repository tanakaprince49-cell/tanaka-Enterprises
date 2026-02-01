
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Nestly = lazy(() => import('./pages/Nestly'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const Auth = lazy(() => import('./pages/Auth'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

export interface UserProfile {
  email: string;
  name: string;
  profilePic: string;
  isLoggedIn: boolean;
}

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const savedUser = localStorage.getItem('user_session');
    return savedUser ? JSON.parse(savedUser) : {
      email: '',
      name: '',
      profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
      isLoggedIn: false
    };
  });

  useEffect(() => {
    localStorage.setItem('user_session', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-zinc-500/20 bg-zinc-50 dark:bg-[#050505] transition-colors duration-500">
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} user={user} />
        
        <main className="flex-grow">
          <Suspense fallback={
            <div className="h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#050505]">
              <div className="w-6 h-6 border-2 border-zinc-200 dark:border-white/10 border-t-zinc-900 dark:border-t-white rounded-full animate-spin"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nestly" element={<Nestly />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth setUser={setUser} user={user} />} />
              <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
