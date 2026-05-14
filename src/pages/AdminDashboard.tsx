import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Users, ShoppingBag, DollarSign, TrendingUp, Package, Plus, Search, Filter, MoreVertical, LayoutGrid, List } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { PRODUCTS } from '../data/mock';

const data = [
  { name: 'Mon', sales: 4000, revenue: 2400 },
  { name: 'Tue', sales: 3000, revenue: 1398 },
  { name: 'Wed', sales: 2000, revenue: 9800 },
  { name: 'Thu', sales: 2780, revenue: 3908 },
  { name: 'Fri', sales: 1890, revenue: 4800 },
  { name: 'Sat', sales: 2390, revenue: 3800 },
  { name: 'Sun', sales: 3490, revenue: 4300 },
];

const pieData = [
  { name: 'Shoes', value: 400 },
  { name: 'Watches', value: 300 },
  { name: 'Fashion', value: 300 },
  { name: 'Electronics', value: 200 },
];

const COLORS = ['#D4AF37', '#0A1128', '#C0C0C0', '#F9F6EE'];

export const AdminDashboard = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar (Admin specific) */}
      <aside className="w-64 bg-luxury-blue text-white hidden xl:block fixed h-full z-20">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-gold text-luxury-blue flex items-center justify-center font-bold text-lg rounded-sm">L</div>
            <span className="font-display font-bold text-xl tracking-tighter">LUXORA ADMIN</span>
          </div>
          
          <nav className="space-y-2">
             {[
               { icon: LayoutGrid, name: 'Dashboard', active: true },
               { icon: ShoppingBag, name: 'Products' },
               { icon: Package, name: 'Orders' },
               { icon: Users, name: 'Customers' },
               { icon: TrendingUp, name: 'Analytics' },
               { icon: DollarSign, name: 'Revenue' },
             ].map(item => (
               <button key={item.name} className={cn(
                 "w-full flex items-center gap-4 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-sm",
                 item.active ? "bg-gold text-luxury-blue" : "text-slate-400 hover:text-white"
               )}>
                 <item.icon size={18} /> {item.name}
               </button>
             ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 xl:ml-64 p-8 xl:p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-display font-bold text-luxury-blue uppercase tracking-tighter">Command Center</h1>
            <p className="text-slate-400 text-sm font-medium">Global platform overview for May 2024</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search orders..." className="bg-white border-none py-3 pl-10 pr-6 shadow-sm text-xs font-bold tracking-widest outline-none w-64" />
            </div>
            <button className="bg-gold text-luxury-blue p-3 shadow-sm hover:scale-105 transition-transform">
              <Plus size={20} />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-white">
          <div className="bg-luxury-blue p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 transition-transform group-hover:scale-125">
              <DollarSign size={100} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Total Revenue</p>
            <div className="text-3xl font-display font-bold mb-2">$124,560.00</div>
            <div className="text-[10px] font-bold text-gold">+12.5% vs last month</div>
          </div>
          <div className="bg-white p-8 shadow-sm border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 text-slate-400">Total Sales</p>
            <div className="text-3xl font-display font-bold text-luxury-blue mb-2">1,240</div>
            <div className="text-[10px] font-bold text-green-600">+8.2% vs last month</div>
          </div>
          <div className="bg-white p-8 shadow-sm border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Active Users</p>
            <div className="text-3xl font-display font-bold text-luxury-blue mb-2">45,670</div>
            <div className="text-[10px] font-bold text-green-600">+15.1% vs last month</div>
          </div>
          <div className="bg-white p-8 shadow-sm border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Stock Availability</p>
            <div className="text-3xl font-display font-bold text-luxury-blue mb-2">85.4%</div>
            <div className="text-[10px] font-bold text-amber-500">-2.4% vs last month</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-white p-10 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-display font-bold text-luxury-blue uppercase tracking-widest text-sm">Revenue Forecast</h3>
              <select className="bg-slate-50 border-none text-[10px] font-bold uppercase tracking-widest">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#D4AF37" fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-10 border border-slate-200 shadow-sm">
            <h3 className="font-display font-bold text-luxury-blue uppercase tracking-widest text-sm mb-10">Sales By Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 mt-8">
              {pieData.map((item, id) => (
                <div key={id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[id] }} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-luxury-blue">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
           <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-display font-bold text-luxury-blue uppercase tracking-widest">Inventory Status</h3>
              <div className="flex gap-4">
                <button className="p-2 bg-slate-50 text-slate-400"><List size={18} /></button>
                <button className="p-2 bg-gold text-luxury-blue"><LayoutGrid size={18} /></button>
              </div>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead className="bg-slate-50">
                 <tr>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stock</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {PRODUCTS.map(p => (
                   <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-slate-100 overflow-hidden">
                              <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <p className="text-xs font-bold text-luxury-blue uppercase truncate w-32 tracking-tighter">{p.name}</p>
                              <p className="text-[8px] text-slate-400 uppercase font-bold tracking-widest">SKU: {p.id.toUpperCase()}-X</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6 text-xs text-slate-500 font-bold uppercase tracking-widest">{p.category}</td>
                     <td className="px-8 py-6 font-bold text-xs text-luxury-blue">{formatCurrency(p.price)}</td>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                           <div className="flex-1 w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-gold" style={{ width: `${p.stock}%` }} />
                           </div>
                           <span className="text-[10px] font-bold text-slate-500">{p.stock}</span>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <span className={cn(
                          "text-[8px] font-bold uppercase tracking-widest px-2 py-1",
                          p.stock > 10 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        )}>
                          {p.stock > 10 ? 'In Stock' : 'Low Stock'}
                        </span>
                     </td>
                     <td className="px-8 py-6 text-slate-400">
                        <button className="hover:text-gold transition-colors"><MoreVertical size={18} /></button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </main>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
