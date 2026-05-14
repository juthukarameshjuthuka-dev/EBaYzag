import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { LayoutDashboard, ShoppingBag, Heart, MapPin, User, LogOut, Package, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/mock';
import { formatCurrency } from '../lib/utils';

export const UserDashboard = () => {
  const { user, logout } = useAuth();
  
  if (!user) return <div className="pt-40 text-center">Please login to view dashboard.</div>;

  const mockOrders = [
    { id: 'ORD-9482', date: '2024-05-10', total: 1450, status: 'Shipped', items: 2 },
    { id: 'ORD-8271', date: '2024-04-15', total: 850, status: 'Delivered', items: 1 },
  ];

  return (
    <div className="pt-32 pb-32 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-72">
            <div className="bg-white border border-slate-200 p-8 rounded-sm shadow-sm">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gold-light text-gold flex items-center justify-center rounded-full mx-auto mb-4 font-display font-bold text-3xl">
                  {user.name.charAt(0)}
                </div>
                <h3 className="font-display font-bold text-luxury-blue uppercase tracking-tighter text-xl">{user.name}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{user.role} Member</p>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'Dashboard', icon: LayoutDashboard, active: true },
                  { name: 'My Orders', icon: Package },
                  { name: 'Wishlist', icon: Heart },
                  { name: 'Addresses', icon: MapPin },
                  { name: 'Profile Settings', icon: User },
                ].map(item => (
                  <button key={item.name} className={cn(
                    "w-full flex items-center gap-4 px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all",
                    item.active ? "bg-luxury-blue text-white" : "text-slate-500 hover:bg-slate-50"
                  )}>
                    <item.icon size={18} /> {item.name}
                  </button>
                ))}
                <button onClick={logout} className="w-full flex items-center gap-4 px-4 py-3 text-sm font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all mt-8">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-8 border border-slate-200 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Spent</p>
                <div className="text-3xl font-display font-bold text-luxury-blue">{formatCurrency(2300)}</div>
              </div>
              <div className="bg-white p-8 border border-slate-200 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Active Orders</p>
                <div className="text-3xl font-display font-bold text-luxury-blue">01</div>
              </div>
              <div className="bg-white p-8 border border-slate-200 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Wishlist Items</p>
                <div className="text-3xl font-display font-bold text-luxury-blue">12</div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-display font-bold text-luxury-blue uppercase tracking-widest">Recent Orders</h3>
                  <button className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] hover:underline">View All Orders</button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {mockOrders.map(order => (
                        <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6 font-bold text-xs text-luxury-blue">{order.id}</td>
                          <td className="px-8 py-6 text-xs text-slate-500 font-medium">{order.date}</td>
                          <td className="px-8 py-6">
                            <span className={cn(
                              "text-[8px] font-bold uppercase tracking-widest px-2 py-1",
                              order.status === 'Shipped' ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                            )}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 font-bold text-xs text-luxury-blue">{formatCurrency(order.total)}</td>
                          <td className="px-8 py-6">
                            <button className="text-gold font-bold text-[10px] uppercase tracking-widest hover:underline">Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>

            {/* Recommended for You */}
            <div>
              <h3 className="font-display font-bold text-luxury-blue uppercase tracking-widest mb-8">EXCLUSIVE FOR YOU</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {PRODUCTS.slice(4, 7).map(p => (
                   <div key={p.id} className="bg-white border p-4 flex gap-4 hover:shadow-md transition-all cursor-pointer group">
                      <div className="w-20 h-20 bg-slate-50 overflow-hidden">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="text-[9px] font-bold text-gold uppercase mb-1">{p.category}</p>
                        <h4 className="text-xs font-bold text-luxury-blue uppercase tracking-tighter truncate w-32">{p.name}</h4>
                        <p className="text-xs font-bold text-luxury-blue mt-1">{formatCurrency(p.price)}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
