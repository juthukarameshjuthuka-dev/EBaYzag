import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';
import { CreditCard, Truck, ShieldCheck, CheckCircle, ChevronRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsOrdered(true);
      clearCart();
    }, 3000);
  };

  if (isOrdered) {
    return (
      <div className="pt-40 pb-40 text-center max-w-lg mx-auto px-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-green-100 flex items-center justify-center rounded-full mx-auto mb-8"
        >
          <CheckCircle size={40} className="text-green-600" />
        </motion.div>
        <h1 className="text-4xl font-display font-bold text-luxury-blue mb-4 tracking-tighter">ORDER CONFIRMED</h1>
        <p className="text-slate-500 mb-10 leading-relaxed font-medium">Thank you for choosing LUXORA. Your order <span className="text-luxury-blue font-bold italic">#LUX-9482</span> has been placed successfully. A confirmation email has been sent to your inbox.</p>
        <Link to="/dashboard" className="bg-luxury-blue text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-gold transition-colors block w-full">Track Your Order</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Checkout Steps */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-4 flex-shrink-0">
                  <div className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-full font-bold transition-colors",
                    step >= i ? "bg-luxury-blue text-white" : "bg-slate-200 text-slate-400"
                  )}>{i}</div>
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-widest whitespace-nowrap",
                    step >= i ? "text-luxury-blue" : "text-slate-400"
                  )}>
                    {i === 1 ? 'Shipping' : i === 2 ? 'Delivery' : 'Payment'}
                  </span>
                  {i < 3 && <ChevronRight className="text-slate-300" size={16} />}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-display font-bold text-luxury-blue mb-8 uppercase tracking-widest border-b border-slate-200 pb-4">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="First Name" className="bg-white border text-sm border-slate-200 px-6 py-4 focus:border-gold outline-none" />
                    <input type="text" placeholder="Last Name" className="bg-white border text-sm border-slate-200 px-6 py-4 focus:border-gold outline-none" />
                    <input type="email" placeholder="Email Address" className="bg-white border text-sm border-slate-200 px-6 py-4 focus:border-gold outline-none md:col-span-2" />
                    <input type="text" placeholder="Full Address" className="bg-white border text-sm border-slate-200 px-6 py-4 focus:border-gold outline-none md:col-span-2" />
                    <input type="text" placeholder="City" className="bg-white border text-sm border-slate-200 px-6 py-4 focus:border-gold outline-none" />
                    <input type="text" placeholder="Postal Code" className="bg-white border text-sm border-slate-200 px-6 py-4 focus:border-gold outline-none" />
                  </div>
                  <button onClick={() => setStep(2)} className="bg-luxury-blue text-white px-12 py-4 font-bold uppercase tracking-widest hover:bg-gold transition-colors">Continue to Delivery</button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-display font-bold text-luxury-blue mb-8 uppercase tracking-widest border-b border-slate-200 pb-4">Delivery Method</h2>
                  <div className="space-y-4">
                    <label className="flex items-center gap-6 p-6 bg-white border border-slate-200 cursor-pointer hover:border-gold transition-colors">
                      <input type="radio" name="delivery" defaultChecked className="w-5 h-5 accent-gold" />
                      <div className="flex-1">
                        <p className="font-bold text-luxury-blue">Express Global Delivery</p>
                        <p className="text-sm text-slate-500">2-3 Business Days • Insured Tracking</p>
                      </div>
                      <span className="font-bold">Free</span>
                    </label>
                    <label className="flex items-center gap-6 p-6 bg-white border border-slate-200 cursor-pointer hover:border-gold transition-colors">
                      <input type="radio" name="delivery" className="w-5 h-5 accent-gold" />
                      <div className="flex-1">
                        <p className="font-bold text-luxury-blue">Priority Same-Day</p>
                        <p className="text-sm text-slate-500">Available in select cities • Concierge Hand-Off</p>
                      </div>
                      <span className="font-bold">$45.00</span>
                    </label>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="border border-luxury-blue text-luxury-blue px-12 py-4 font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors">Back</button>
                    <button onClick={() => setStep(3)} className="bg-luxury-blue text-white px-12 py-4 font-bold uppercase tracking-widest hover:bg-gold transition-colors">Continue to Payment</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-display font-bold text-luxury-blue mb-8 uppercase tracking-widest border-b border-slate-200 pb-4">Payment Method</h2>
                  <div className="bg-white border border-slate-200 p-8">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <CreditCard className="text-gold" size={24} />
                        <span className="font-bold text-luxury-blue">Secure Card Payment</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="w-10 h-6 bg-slate-100 rounded-sm" />
                        <span className="w-10 h-6 bg-slate-100 rounded-sm" />
                        <span className="w-10 h-6 bg-slate-100 rounded-sm" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input type="text" placeholder="Card Number" className="bg-slate-50 border text-sm border-slate-200 px-6 py-4 focus:border-gold outline-none md:col-span-2" />
                      <input type="text" placeholder="MM / YY" className="bg-slate-50 border text-sm border-slate-200 px-6 py-4 focus:border-gold outline-none" />
                      <input type="password" placeholder="CVC" className="bg-slate-50 border text-sm border-slate-200 px-6 py-4 focus:border-gold outline-none" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} className="border border-luxury-blue text-luxury-blue px-12 py-4 font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors">Back</button>
                    <button 
                      onClick={handlePlaceOrder} 
                      disabled={isProcessing}
                      className="flex-1 bg-luxury-blue text-white px-12 py-4 font-bold uppercase tracking-widest hover:bg-gold transition-colors flex items-center justify-center gap-3"
                    >
                      {isProcessing ? (
                        <>Processing Payment...</>
                      ) : (
                        <><Lock size={18} /> Place Order - {formatCurrency(totalPrice * 1.1)}</>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white p-10 border border-slate-200 shadow-sm sticky top-32">
              <h3 className="font-display font-bold text-luxury-blue mb-8 uppercase tracking-widest border-b pb-4">YOUR BAG</h3>
              <div className="space-y-6 mb-8 overflow-y-auto max-h-[40vh]">
                {cart.map(item => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-slate-50 flex-shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-luxury-blue uppercase truncate w-40">{item.product.name}</p>
                      <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                      <p className="text-xs font-bold text-gold">{formatCurrency(item.product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-bold">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Global Shipping</span>
                  <span className="text-green-600 font-bold uppercase">Free</span>
                </div>
                <div className="flex justify-between text-xl pt-4">
                  <span className="font-display font-bold text-luxury-blue">Total</span>
                  <span className="font-display font-bold text-gold">{formatCurrency(totalPrice * 1.1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
