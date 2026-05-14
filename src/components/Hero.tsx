import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative h-[100vh] flex items-center overflow-hidden bg-luxury-black">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0 opacity-50"
      >
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
          alt="Premium background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/80 to-transparent z-10" />
      </motion.div>

      <div className="container mx-auto px-10 md:px-12 relative z-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] uppercase border border-gold text-gold rounded-full">
              Limited Edition Release
            </span>
            <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-tight leading-[1.05]">
              Precision <span className="font-bold italic text-white/90">Crafted</span><br/>Luxury Goods.
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-md leading-relaxed">
              Experience the pinnacle of corporate elegance. Curated collections of luxury watches, high-performance electronics, and bespoke fashion.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="premium-btn btn-gold">
                Shop Collection
              </Link>
              <button className="premium-btn btn-outline">
                Discover Heritage
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute bottom-0 right-12 w-px h-32 bg-gold/50 hidden lg:block" />
    </section>
  );
};
