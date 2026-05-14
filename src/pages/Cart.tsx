import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-40 text-center px-6">
        <div className="w-24 h-24 bg-slate-50 flex items-center justify-center rounded-full mx-auto mb-8">
          <ShoppingBag size={40} className="text-slate-300" />
        </div>
        <h1 className="text-3xl font-display font-bold text-luxury-blue mb-4">YOUR BAG IS EMPTY</h1>
        <p className="text-slate-500 mb-10 max-w-sm mx-auto">Explore our premium selection and find something that defines your lifestyle.</p>
        <Link to="/shop" className="bg-luxury-blue text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-gold transition-colors inline-block">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl font-display font-bold text-luxury-blue mb-12 tracking-tighter">SHOPPING BAG <span className="text-slate-300 ml-4">({totalItems})</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <motion.div 
                key={item.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 border border-slate-100 flex flex-col sm:flex-row gap-6 shadow-sm"
              >
                <div className="w-full sm:w-32 aspect-square overflow-hidden bg-slate-50">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] text-gold font-bold uppercase tracking-widest mb-1">{item.product.category}</p>
                      <h3 className="text-xl font-display font-bold text-luxury-blue mb-2 uppercase tracking-tighter">{item.product.name}</h3>
                      {item.selectedSize && <p className="text-sm text-slate-500">Size: <span className="text-luxury-blue font-bold">{item.selectedSize}</span></p>}
                    </div>
                    <p className="text-lg font-display font-bold text-luxury-blue">{formatCurrency(item.product.price)}</p>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex border border-slate-200">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-2 hover:bg-slate-50 transition-colors"><Minus size={16} /></button>
                      <div className="w-10 flex items-center justify-center font-bold text-sm">{item.quantity}</div>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-3 py-2 hover:bg-slate-50 transition-colors"><Plus size={16} /></button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-red-500 flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <div className="bg-luxury-blue p-10 text-white sticky top-32">
              <h2 className="text-2xl font-display font-bold mb-8 uppercase tracking-widest">Order Summary</h2>
              <div className="space-y-4 mb-8 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-bold">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Shipping</span>
                  <span className="text-gold font-bold uppercase">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tax estimate</span>
                  <span className="font-bold">{formatCurrency(totalPrice * 0.1)}</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between text-xl">
                  <span className="font-display font-bold">Total</span>
                  <span className="font-display font-bold text-gold">{formatCurrency(totalPrice * 1.1)}</span>
                </div>
              </div>
              <Link to="/checkout" className="w-full py-5 bg-gold text-luxury-blue font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white transition-all">
                Checkout Now <ArrowRight size={20} />
              </Link>
              <div className="mt-6 space-y-4">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed">Secure checkout processed by SSL encrypted systems. Global courier tracking provided instantly.</p>
              </div>
            </div>
            
            <Link to="/shop" className="flex items-center justify-center gap-2 text-slate-400 hover:text-luxury-blue font-bold uppercase tracking-widest text-xs transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
