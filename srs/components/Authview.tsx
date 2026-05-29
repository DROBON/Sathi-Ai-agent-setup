import React, { useState, useEffect } from 'react';
import { LogIn, UserPlus, Shield, Mail, Lock, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from '../types';

interface AuthViewProps {
  onAuth: (user: User) => void;
}

const FlickeringGrid = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-tr from-indigo-100/10 via-transparent to-purple-100/10" 
      />
    </div>
  );
};

export const AuthView: React.FC<AuthViewProps> = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLogin && password.length < 8) {
      setError('পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে।');
      return;
    }

    setIsLoading(true);
    const endpoint = isLogin ? '/api/auth/login/local' : '/api/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        onAuth({ ...(data.user || data), token: data.token });
      } else {
        setError(data.error || 'প্রবেশ করতে সমস্যা হচ্ছে। সঠিক তথ্য দিন।');
      }
    } catch (err) {
      setError('সার্ভার ত্রুটি। আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      <FlickeringGrid />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/70 backdrop-blur-2xl rounded-[3rem] border border-gray-100 shadow-2xl p-12 relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="p-5 bg-indigo-600 text-white rounded-3xl shadow-xl shadow-indigo-100 mb-6">
            <Shield className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
            {isLogin ? 'সাথী এআই লগইন' : 'নতুন অ্যাকাউন্ট'}
          </h2>
          <p className="text-gray-400 text-sm font-medium tracking-wide">
            {isLogin ? 'আপনার অর্গানাইজার এবং মেমোরিতে ফিরে যান' : 'সিস্টেমে প্রবেশের জন্য রেজিস্টার করুন'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <Mail className="absolute left-5 top-5 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              required
              placeholder="ইউজার নাম বা ইমেইল"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-gray-50/50 border-2 border-transparent px-14 py-5 rounded-3xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold text-gray-900"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-5 top-5 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="password" 
              required
              placeholder="পাসওয়ার্ড"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gray-50/50 border-2 border-transparent px-14 py-5 rounded-3xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold text-gray-900"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-start gap-3 text-red-500 text-xs font-bold bg-red-50 p-4 rounded-2xl border border-red-100"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white font-black py-5 rounded-3xl shadow-2xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
          >
            {isLoading ? 'প্রসেসিং...' : (isLogin ? 'সাইন ইন' : 'অ্যাকাউন্ট তৈরি করুন')}
            {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-gray-50/50 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 font-black text-sm hover:underline tracking-tight transition-all"
          >
            {isLogin ? 'অ্যাকাউন্ট নেই? নতুন একটি খুলুন' : 'ইতিমধ্যেই অ্যাকাউন্ট আছে? লগইন করুন'}
          </button>
        </div>

        <div className="mt-12 flex justify-center items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Secure AI Access System</span>
        </div>
      </motion.div>
    </div>
  );
};