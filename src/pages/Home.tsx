import React from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from '../data/mock';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Headphones, RefreshCw, Star } from 'lucide-react';

export const Home = () => {
  const featuredProducts = PRODUCTS.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="overflow-hidden">
      <Hero />

      {/* Categories Grid */}
      <section className="py-24 bg-luxury-dark px-10 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-xs font-bold tracking-[0.4em] text-gold uppercase mb-1">Featured Selections</h2>
              <p className="text-2xl font-light text-white">Trending Categories</p>
            </div>
            <Link to="/categories" className="text-white font-bold text-xs tracking-widest border-b border-gold pb-1 hover:text-gold transition-colors">VIEW ALL</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-80 overflow-hidden cursor-pointer rounded-xl border border-white/5"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent flex flex-col justify-end p-6 group-hover:from-gold/20 transition-all">
                  <span className="text-gold text-[10px] font-bold mb-1 tracking-[0.2em]">{cat.itemCount} ITEMS</span>
                  <h3 className="text-2xl font-display font-bold text-white group-hover:text-gold transition-colors">{cat.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-luxury-black px-10 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-xs font-bold tracking-[0.4em] text-gold uppercase mb-1">Our Finest Selection</h2>
              <p className="text-3xl font-light text-white italic">Curated Arrivals</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/shop" className="premium-btn btn-outline inline-flex items-center gap-2">
              Discover Full Shop <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-24 relative overflow-hidden bg-luxury-black flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=2000" 
          alt="Watch banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/80 via-transparent to-luxury-black/80" />
        <div className="relative z-10 text-center px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <span className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] uppercase border border-gold text-gold rounded-full">
              Seasonal Exclusive
            </span>
            <h2 className="text-4xl md:text-7xl font-light text-white mb-6 tracking-tight leading-none">TIMELESS ELEGANCE <br/><span className="italic font-bold text-gold">40% OFF</span></h2>
            <p className="text-gray-400 text-lg mb-10 font-medium max-w-xl mx-auto">Limited time offer on all premium watch collections. Experience heritage at its finest.</p>
            <Link to="/shop?category=watches" className="premium-btn btn-gold inline-block">Secure Offer Now</Link>
          </motion.div>
        </div>
      </section>

      {/* Features/Service Section */}
      <section className="py-24 border-y border-white/5 px-10 md:px-12 bg-luxury-dark">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-white/5 border border-white/10 text-gold flex items-center justify-center rounded-full mb-6 group-hover:bg-gold group-hover:text-black transition-all duration-500">
              <Truck size={24} />
            </div>
            <h3 className="text-sm font-bold tracking-widest text-white mb-2 uppercase">Global Shipping</h3>
            <p className="text-gray-500 text-xs tracking-wide leading-relaxed">Complimentary insured shipping on all orders over $500.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-white/5 border border-white/10 text-gold flex items-center justify-center rounded-full mb-6 group-hover:bg-gold group-hover:text-black transition-all duration-500">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-sm font-bold tracking-widest text-white mb-2 uppercase">Secure Checkout</h3>
            <p className="text-gray-500 text-xs tracking-wide leading-relaxed">Protected by world-class enterprise encryption.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-white/5 border border-white/10 text-gold flex items-center justify-center rounded-full mb-6 group-hover:bg-gold group-hover:text-black transition-all duration-500">
              <Headphones size={24} />
            </div>
            <h3 className="text-sm font-bold tracking-widest text-white mb-2 uppercase">24/7 Concierge</h3>
            <p className="text-gray-500 text-xs tracking-wide leading-relaxed">Our expert advisors are available for your every need.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-white/5 border border-white/10 text-gold flex items-center justify-center rounded-full mb-6 group-hover:bg-gold group-hover:text-black transition-all duration-500">
              <RefreshCw size={24} />
            </div>
            <h3 className="text-sm font-bold tracking-widest text-white mb-2 uppercase">Easy Returns</h3>
            <p className="text-gray-500 text-xs tracking-wide leading-relaxed">Complimentary returns within 30 days of purchase.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-luxury-black px-10 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-xs font-bold tracking-[0.4em] text-gold uppercase mb-1">Global Reputation</h2>
            <p className="text-3xl font-light text-white italic">Voices of Trust</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card-bg p-10 border border-white/5 relative group hover:border-gold/30 transition-all rounded-xl"
              >
                <div className="absolute top-0 right-10 translate-y-[-50%] grayscale group-hover:grayscale-0 transition-all">
                  <img src={t.userAvatar} alt={t.userName} className="w-16 h-16 rounded-full border-4 border-luxury-black shadow-2xl" />
                </div>
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} className="fill-gold text-gold" />)}
                </div>
                <p className="text-gray-400 text-sm italic mb-8 leading-relaxed">"{t.comment}"</p>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-widest">{t.userName}</h4>
                  <p className="text-[9px] text-gold font-bold uppercase tracking-[0.2em] mt-1">{t.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 bg-luxury-dark px-10 md:px-12 text-center border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light text-white mb-6 uppercase tracking-tighter">Join the <span className="italic font-bold text-gold">Elite</span></h2>
          <p className="text-gray-400 mb-10 text-lg">Subscribe for private collection launches and exclusive lifestyle invitations.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="ENTER EMAIL ADDRESS" 
              className="flex-1 bg-white/5 border border-white/10 px-6 py-4 text-white text-xs tracking-widest focus:outline-none focus:border-gold transition-colors rounded-sm"
            />
            <button className="bg-gold px-10 py-4 text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-colors rounded-sm">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};
