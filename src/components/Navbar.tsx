import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Heart, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { totalItems } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-5 px-10 md:px-12",
      isScrolled ? "glass-header" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#D4AF37] to-[#F9E29B] rounded-sm mr-2 transition-transform group-hover:rotate-6"></div>
          <span className="font-display font-bold text-2xl tracking-tighter text-white hidden sm:block">AURELIUS</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={cn(
                "text-sm font-medium transition-colors hover:text-gold uppercase tracking-widest",
                location.pathname === link.path ? "text-gold" : "text-gray-400"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center bg-white/5 border border-white/10 px-4 py-1.5 rounded-full group">
            <Search size={14} className="text-gray-400 group-hover:text-gold transition-colors mr-2" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-transparent text-[10px] text-white outline-none w-32 focus:w-48 transition-all"
            />
          </div>
          
          <Link to="/cart" className="relative text-white hover:text-gold transition-colors">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] font-bold px-1.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <Link to={user ? "/dashboard" : "/login"} className="text-white hover:text-gold transition-colors flex items-center space-x-3">
            <User size={20} />
            <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest leading-none">
              {user ? user.name.split(' ')[0] : 'ACCOUNT'}
            </span>
          </Link>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-600">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gold/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-lg font-display font-medium text-luxury-blue"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
