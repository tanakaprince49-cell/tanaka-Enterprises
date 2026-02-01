
import React, { useState } from 'react';
import { User, Shield, Camera, Check, LogOut, Loader2 } from 'lucide-react';
import { UserProfile } from '../App';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updating, setUpdating] = useState<'name' | 'password' | null>(null);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const avatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  ];

  const handleUpdateName = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating('name');
    setTimeout(() => {
      setUser(prev => ({ ...prev, name }));
      setUpdating(null);
      setMessage({ text: 'Name updated successfully', type: 'success' });
      setTimeout(() => setMessage(null), 3000);
    }, 1000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }
    setUpdating('password');
    setTimeout(() => {
      setUpdating(null);
      setPassword('');
      setConfirmPassword('');
      setMessage({ text: 'Password reset link sent to your email', type: 'success' });
      setTimeout(() => setMessage(null), 3000);
    }, 1500);
  };

  const selectAvatar = (url: string) => {
    setUser(prev => ({ ...prev, profilePic: url }));
    setMessage({ text: 'Profile picture updated', type: 'success' });
    setTimeout(() => setMessage(null), 2000);
  };

  const handleLogout = () => {
    setUser({ email: '', name: '', profilePic: '', isLoggedIn: false });
    navigate('/auth');
  };

  if (!user.isLoggedIn) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Profile Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-10 rounded-[2.5rem] border border-zinc-200 dark:border-white/10 text-center relative overflow-hidden group shadow-2xl">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/5 shadow-inner">
                <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 p-2 glass rounded-full border border-white/10 text-zinc-400">
                <Camera size={16} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">{user.name}</h2>
            <p className="text-sm text-zinc-500 font-medium mb-8">{user.email}</p>
            
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-2xl border border-red-500/20 text-red-500 hover:bg-red-500/5 transition-all text-xs font-bold uppercase tracking-widest"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>

          <div className="glass p-8 rounded-[2rem] border border-zinc-200 dark:border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
              <Shield size={16} /> System Status
            </h3>
            <div className="space-y-4">
              <StatusItem label="Account Type" value="Beta Preview" />
              <StatusItem label="Intentional Score" value="98%" />
              <StatusItem label="Member Since" value="Spring 2025" />
            </div>
          </div>
        </div>

        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-8">
          {message && (
            <div className={`p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
              message.type === 'success' ? 'bg-green-500/5 border-green-500/20 text-green-500' : 'bg-red-500/5 border-red-500/20 text-red-500'
            }`}>
              <Check size={18} />
              <span className="text-sm font-bold">{message.text}</span>
            </div>
          )}

          <section className="glass p-10 rounded-[2.5rem] border border-zinc-200 dark:border-white/10">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">Identity Settings</h3>
            
            <form onSubmit={handleUpdateName} className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400 px-1">Display Name</label>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-grow glass bg-zinc-900/[0.02] dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-white/5 focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-900 dark:text-white transition-all font-medium" 
                  />
                  <button 
                    disabled={updating === 'name'}
                    className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center min-w-[120px]"
                  >
                    {updating === 'name' ? <Loader2 size={16} className="animate-spin" /> : 'Save'}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-12">
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400 px-1 mb-6">Gallery Avatars</p>
              <div className="grid grid-cols-6 gap-4">
                {avatars.map((url, i) => (
                  <button 
                    key={i}
                    onClick={() => selectAvatar(url)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all hover:scale-105 active:scale-95 ${
                      user.profilePic === url ? 'border-zinc-900 dark:border-white scale-110 shadow-lg' : 'border-transparent'
                    }`}
                  >
                    <img src={url} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="glass p-10 rounded-[2.5rem] border border-zinc-200 dark:border-white/10">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">Security</h3>
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400 px-1">New Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full glass bg-zinc-900/[0.02] dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-white/5 focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-900 dark:text-white transition-all font-medium" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400 px-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full glass bg-zinc-900/[0.02] dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-white/5 focus:border-zinc-400 dark:focus:border-zinc-600 text-zinc-900 dark:text-white transition-all font-medium" 
                  />
                </div>
              </div>
              <button 
                disabled={updating === 'password' || !password}
                className="w-full py-5 bg-transparent border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:bg-zinc-900/5 dark:hover:bg-white/5 disabled:opacity-30 transition-all flex items-center justify-center"
              >
                {updating === 'password' ? <Loader2 size={18} className="animate-spin" /> : 'Update Security Credentials'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

const StatusItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-zinc-500 font-medium">{label}</span>
    <span className="text-zinc-900 dark:text-white font-bold">{value}</span>
  </div>
);

export default Dashboard;
