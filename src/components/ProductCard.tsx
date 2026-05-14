import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group p-4 rounded-xl premium-card cursor-pointer relative"
    >
      {/* Badge */}
      {(product.isNew || product.discount > 0) && (
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-white text-black text-[8px] font-black px-2 py-0.5 uppercase tracking-widest rounded-sm">New</span>
          )}
          {product.discount > 0 && (
            <span className="bg-gold text-black text-[8px] font-black px-2 py-0.5 uppercase tracking-widest rounded-sm">-{product.discount}%</span>
          )}
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-zinc-900 rounded-lg mb-6 flex items-center justify-center">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        
        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-gold hover:text-black flex items-center justify-center transition-all">
            <Heart size={16} />
          </button>
          <Link to={`/product/${product.id}`} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-gold hover:text-black flex items-center justify-center transition-all">
            <Eye size={16} />
          </Link>
          <button 
            onClick={() => addToCart(product)}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-gold hover:text-black flex items-center justify-center transition-all"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-2 pb-2">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{product.category}</p>
          <div className="flex items-center gap-1">
            <Star size={10} className="fill-gold text-gold" />
            <span className="text-[10px] font-bold text-gray-400">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-white mb-2 group-hover:text-gold transition-colors truncate uppercase tracking-tight">{product.name}</h3>
        </Link>
        
        <p className="text-gold text-sm font-bold tracking-tight">{formatCurrency(product.price)}</p>
      </div>
    </motion.div>
  );
};
