import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Github } from 'lucide-react';
import { motion } from 'motion/react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-12 border border-slate-200 shadow-xl"
      >
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-luxury-blue text-gold flex items-center justify-center font-display font-bold text-2xl mx-auto mb-6">L</div>
          <h1 className="text-3xl font-display font-bold text-luxury-blue uppercase tracking-widest">Welcome Back</h1>
          <p className="text-slate-400 mt-2 font-medium">Access your global luxury account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 focus:border-gold outline-none text-sm transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 focus:border-gold outline-none text-sm transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-luxury-blue text-white py-4 font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all flex items-center justify-center gap-2 group">
            Authenticate <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">Or continue with</p>
          <div className="flex justify-center gap-4">
            <button className="w-full py-3 border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all text-xs font-bold uppercase tracking-widest">
              <Github size={16} /> GitHub
            </button>
          </div>
          <p className="mt-10 text-xs text-slate-500 font-medium">
            New to Luxora? <button className="text-gold font-bold hover:underline">Request Invitation</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
