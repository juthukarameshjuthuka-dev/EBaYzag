import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-luxury-black border-t border-white/5 py-12 px-10 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
        <div className="flex flex-wrap justify-center md:justify-start gap-8">
          <span className="text-gray-400">© 2024 AURELIUS LUXURY RETAIL</span>
          <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/" className="hover:text-white transition-colors">Cookie Policy</Link>
        </div>
        
        <div className="flex items-center space-x-8">
          <span className="hidden sm:inline">Global Shipping Available</span>
          <div className="flex space-x-2">
            {[Facebook, Instagram, Twitter].map((Icon, idx) => (
              <button key={idx} className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
