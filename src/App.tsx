import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
