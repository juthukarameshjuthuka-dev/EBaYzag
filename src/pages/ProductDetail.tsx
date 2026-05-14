import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/mock';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Heart, Shield, Truck, RefreshCw, Star, ArrowLeft, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency } from '../lib/utils';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return <div className="pt-32 text-center">Product not found.</div>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-24 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-slate-400 hover:text-gold mb-12 transition-colors">
          <ArrowLeft size={18} /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Images */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="aspect-[4/5] bg-slate-50 overflow-hidden relative"
            >
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
              {product.isNew && (
                <span className="absolute top-6 left-6 bg-luxury-blue text-white px-4 py-1 text-xs font-bold tracking-widest uppercase">New Release</span>
              )}
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "aspect-square border-2 transition-all",
                    selectedImage === idx ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <p className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-4">{product.category}</p>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-luxury-blue mb-4 tracking-tighter uppercase">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-gold" : ""} />
                  ))}
                </div>
                <span className="text-slate-400 text-sm font-medium">({product.reviewsCount} verified reviews)</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-display font-bold text-luxury-blue">{formatCurrency(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-slate-300 line-through">{formatCurrency(product.originalPrice)}</span>
                )}
              </div>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed mb-10 border-l-4 border-gold pl-6 italic">
              {product.description}
            </p>

            <div className="space-y-6 mb-12">
              <h3 className="font-display font-bold text-luxury-blue uppercase tracking-widest text-sm">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-500 text-sm">
                    <Check size={16} className="text-gold" /> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-12 border-t border-slate-100">
              <div className="flex border border-slate-200">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-4 hover:bg-slate-50 transition-colors">-</button>
                <div className="w-12 flex items-center justify-center font-bold">{quantity}</div>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-4 hover:bg-slate-50 transition-colors">+</button>
              </div>
              <button 
                onClick={handleAddToCart}
                className={cn(
                  "flex-1 flex items-center justify-center gap-3 py-4 font-bold uppercase tracking-widest transition-all",
                  added ? "bg-green-600 text-white" : "bg-luxury-blue text-white hover:bg-gold"
                )}
              >
                {added ? <><Check size={20} /> Added to Cart</> : <><ShoppingCart size={20} /> Add to Cart</>}
              </button>
              <button className="w-16 flex items-center justify-center border border-slate-200 hover:text-red-500 transition-colors">
                <Heart size={24} />
              </button>
            </div>

            {/* Service Icons */}
            <div className="grid grid-cols-3 gap-4 mt-12 py-8 border-y border-slate-50">
               <div className="text-center">
                  <Truck size={20} className="mx-auto text-gold mb-2" />
                  <span className="text-[10px] font-bold text-slate-400 block tracking-tighter">Fast Shipping</span>
               </div>
               <div className="text-center">
                  <Shield size={20} className="mx-auto text-gold mb-2" />
                  <span className="text-[10px] font-bold text-slate-400 block tracking-tighter">Verified Authentic</span>
               </div>
               <div className="text-center">
                  <RefreshCw size={20} className="mx-auto text-gold mb-2" />
                  <span className="text-[10px] font-bold text-slate-400 block tracking-tighter">Easy Returns</span>
               </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl font-display font-bold text-luxury-blue">YOU MAY ALSO LIKE</h2>
              <Link to="/shop" className="text-gold font-bold text-sm tracking-widest uppercase pb-1 border-b border-gold">Discover More</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
