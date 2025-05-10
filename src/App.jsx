import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Slideshow from './components/slideshow/Slideshow';
import Product from './components/Producs/Product';
import TopProducts from './components/TopProducts/TopProducts';
import DiscountProducts from './components/Producs/DiscountProducts';
import Footer from './components/Footer/Footer';
import AllProductPage from './components/Producs/ProductPage';
import ProductDetail from './components/Producs/ProductDetail';
import MainLayout from './components/Layout/MainLayout';
import CartPage from './components/Cart/CartPage';
import { CartProvider } from './components/Cart/CartContext';
import { NotificationProvider } from './components/Cart/CartContext';
import { SearchProvider } from './context/SearchContext';
import { ProductsProvider } from './context/ProductsContext';
import AdminDashboard from './components/AdminPanel/AdminDashboard';
import Contact from './components/Contact/Contact';
import AboutUs from './components/AboutUs/AboutUs';
import Testimonials from './components/Testimonials/Testimonials';
import PromoSection from './components/PromoSection/PromoSection';
import CategoryShowcase from './components/Categories/CategoryShowcase';
import Newsletter from './components/Newsletter/Newsletter';
import ShippingPage from './components/Shipping/ShippingPage';

import AOS from 'aos';
import 'aos/dist/aos.css';

// Trang Home cho khách
function CustomerHome() {
  return (
    <MainLayout>
      <Slideshow />
      <CategoryShowcase />
      <Product />
      <PromoSection />
      <DiscountProducts />
      <Testimonials />
      <TopProducts />
      <Newsletter />
    </MainLayout>
  );
}

// Trang Admin sau đăng nhập
function AdminHome() {
  return <AdminDashboard />;
}

// Trang Product
function ProductPage() {
  return (
    <MainLayout>
      <AllProductPage />
    </MainLayout>
  );
}

// Trang Contact
function ContactPage() {
  return (
    <MainLayout>
      <Contact />
    </MainLayout>
  );
}

// Trang About Us
function AboutUsPage() {
  return (
    <MainLayout>
      <AboutUs />
    </MainLayout>
  );
}

// Trang đăng nhập đơn giản
function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    // Clear any existing authentication data first
    localStorage.removeItem('role');
    localStorage.removeItem('currentUser');
    
    // Set new role
    localStorage.setItem('role', role);
    
    if (role === 'admin') {
      // For admin login, also set a dummy currentUser
      const adminUser = {
        id: 'admin-' + Date.now(),
        fullName: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      };
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      
      // Use React Router navigation instead of direct page reload
      navigate('/admin');
    } else {
      // For customer login
      const customerUser = {
        id: 'customer-' + Date.now(),
        fullName: 'Customer User',
        email: 'customer@example.com',
        role: 'customer'
      };
      localStorage.setItem('currentUser', JSON.stringify(customerUser));
      
      // Use React Router navigation
      navigate('/');
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Đăng nhập</h2>
          <div className="space-y-4">
            <button 
              onClick={() => handleLogin('customer')}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Đăng nhập như Khách hàng
            </button>
            <button 
              onClick={() => handleLogin('admin')}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Đăng nhập như Quản trị
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// Trang truy cập trái phép
function Unauthorized() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">403 - Không có quyền truy cập</h2>
          <p className="text-gray-600">Vui lòng đăng nhập đúng vai trò.</p>
        </div>
      </div>
    </MainLayout>
  );
}

function App() {
  const [authRole, setAuthRole] = useState(localStorage.getItem('role'));
  
  // Effect to initialize AOS
  useEffect(() => {
    AOS.init({ offset: 100, duration: 800, easing: 'ease-in-sine', delay: 100 });
    AOS.refresh();
  }, []);
  
  // Effect to update authRole whenever needed
  useEffect(() => {
    const handleAuthChange = () => {
      setAuthRole(localStorage.getItem('role'));
    };
    
    // Listen for our custom auth change event
    window.addEventListener('authChange', handleAuthChange);
    
    // Also check on first render
    setAuthRole(localStorage.getItem('role'));
    
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  // Handle redirects from 404.html
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    
    if (redirect === 'admin') {
      // Check if user has admin role
      const role = localStorage.getItem('role');
      if (role === 'admin') {
        // Clean up the URL and redirect to admin
        window.history.replaceState({}, document.title, '/admin');
      } else {
        // If not admin, redirect to unauthorized
        window.history.replaceState({}, document.title, '/unauthorized');
      }
    }
  }, []);

  return (
    <Router>
      <NotificationProvider>
        <CartProvider>
          <ProductsProvider>
            <SearchProvider>
              <Routes>
                {/* Trang chính */}
                <Route path="/" element={<CustomerHome />} />

                {/* Các trang khách hàng không cần đăng nhập */}
                <Route path="/product" element={<ProductPage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/shipping" element={<ShippingPage />} />

                {/* Trang quản trị - yêu cầu role === admin */}
                <Route path="/admin" element={authRole === 'admin' ? <AdminHome /> : <Navigate to="/unauthorized" />} />
                <Route path="/admin/:section" element={authRole === 'admin' ? <AdminHome /> : <Navigate to="/unauthorized" />} />

                {/* Trang đăng nhập */}
                <Route path="/login" element={<LoginPage />} />

                {/* Trang không có quyền */}
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Mọi đường dẫn sai sẽ về trang chủ */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </SearchProvider>
          </ProductsProvider>
        </CartProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;
