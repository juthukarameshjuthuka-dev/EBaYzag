import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/mock';
import { ProductCard } from '../components/ProductCard';
import { Filter, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.categorySlug === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="bg-luxury-blue py-16 px-6 md:px-12 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">THE CATALOG</h1>
        <p className="text-slate-400 max-w-xl mx-auto">Discover excellence in every category.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between mb-12">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 border-b border-slate-200 focus:border-gold transition-colors outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {['all', ...CATEGORIES.map(c => c.slug)].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-1 text-[10px] font-bold uppercase tracking-widest transition-all",
                  selectedCategory === cat ? "bg-luxury-blue text-white" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
