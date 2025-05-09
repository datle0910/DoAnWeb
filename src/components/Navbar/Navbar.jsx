import React, { useState, useEffect } from 'react';
import logo from '../../assets/ll.png';
import "../../index.css";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import Login from './Login';
import DangKy from './DangKy';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import { useSearch } from '../../context/SearchContext';

const Navbar = () => {
  const [showForm, setShowForm] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();
  const { searchTerm, performSearch } = useSearch();

  // Check login status on component mount and update when needed
  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const role = localStorage.getItem('role');
        const userJson = localStorage.getItem('currentUser');
        
        setIsLoggedIn(!!role);
        
        if (userJson) {
          setCurrentUser(JSON.parse(userJson));
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    };

    // Initial check
    checkLoginStatus();
    
    // Create a custom event for authentication changes
    const authChangeEvent = new Event('authChange');
    
    // Define a custom method to update authentication
    window.updateAuthStatus = () => {
      checkLoginStatus();
      window.dispatchEvent(authChangeEvent);
    };
    
    // Listen for the custom event
    window.addEventListener('authChange', checkLoginStatus);
    
    return () => {
      window.removeEventListener('authChange', checkLoginStatus);
      delete window.updateAuthStatus;
    };
  }, []);

  // Update search input when searchTerm changes in context
  useEffect(() => {
    setSearchInput(searchTerm);
  }, [searchTerm]);

  // Reset search input when changing pages (except product page)
  useEffect(() => {
    if (location.pathname !== '/product') {
      setSearchInput('');
    }
  }, [location.pathname]);

  const menu = [
    { id: 1, name: "Trang Chủ", link: "/" },
    { id: 2, name: "Sản Phẩm", link: "/product" },
    { id: 3, name: "Giao Hàng", link: "/shipping" },
    { id: 4, name: "Liên Hệ", link: "/contact" },
    { id: 5, name: "Giới Thiệu", link: "/about-us" },
  ];

  const handleLogout = () => {
    try {
      localStorage.removeItem('role');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('searchTerm');
      
      setIsLoggedIn(false);
      setCurrentUser(null);
      
      // Notify about authentication change
      if (window.updateAuthStatus) {
        window.updateAuthStatus();
      }
      
      alert("Đăng xuất thành công!");
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      alert("Đăng xuất không thành công. Vui lòng thử lại.");
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLoginClick = () => {
    setShowForm("login");
  };

  const handleRegisterClick = () => {
    setShowForm("register");
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    try {
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
        setCurrentUser(JSON.parse(userJson));
      }
      
      // Notify about authentication change
      if (window.updateAuthStatus) {
        window.updateAuthStatus();
      }
    } catch (error) {
      console.error('Error accessing localStorage during login:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      e.preventDefault();
      performSearch(searchInput);
    }
  };

  const handleSearchIconClick = () => {
    if (searchInput.trim()) {
      performSearch(searchInput);
    }
  };

  return (
    <nav className='bg-white dark:bg-gray-900 dark:text-dark'>
      <div className="bg-[#fea928] py-2">
        <div className='container mx-auto px-4'>
          <div className="flex justify-between items-center">
            {/* Logo - Trái */}
            <div className="w-1/5">
              <Link to="/" className='font-bold text-2xl sm:text-3xl flex gap-2 items-center'>
                <img src={logo} alt="logo" className='w-12 h-12' />
                <h3 className='text-xl text-[#0e0d0d]'>SweetGlow</h3>
              </Link>
            </div>

            {/* Menu - Giữa (slightly moved to the left) */}
            <div className="w-3/5 flex justify-start pl-8">
              <ul className='sm:flex hidden items-center gap-4'>
                {menu.map((item) => (
                  <li key={item.id}>
                    <Link to={item.link} className='inline-block px-3 text-[#060505] hover:text-[#f8f4e3] duration-200 font-medium'>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Phần công cụ - Phải */}
            <div className="w-1/5 flex justify-end items-center gap-3">
              {/* Thanh tìm kiếm */}
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  value={searchInput}
                  onChange={handleSearch}
                  onKeyDown={handleSearchSubmit}
                  className="w-[120px] sm:w-[140px] group-hover:w-[160px] transition-all duration-300 rounded-full border border-[#e8d9b5] px-3 py-1 focus:outline-none focus:border-1 focus:border-[#a68c69] bg-[#faf6eb]"
                />
                <IoMdSearch 
                  onClick={handleSearchIconClick}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0b0b0b] group-hover:text-[#8a7355] cursor-pointer" 
                />
              </div>

              {/* Nút giỏ hàng */}
              <button
                onClick={handleCartClick}
                className='bg-gradient-to-r from-[#deb658] to-[#966b07] transition-all duration-200 text-[#5d4a2f] py-1 px-3 rounded-full flex items-center gap-2 group hover:from-[#d1bc8a] hover:to-[#c1ab78] relative'
              >
                <span className='group-hover:block hidden transition-all duration-200 text-xs'>Order</span>
                <FaCartShopping className='text-lg text-[#121111] drop-shadow-sm cursor-pointer' />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>

              {/* Đăng nhập / Đăng ký hoặc Đăng xuất */}
              <div className='dk-dn'>
                <ul className='sm:flex hidden items-center gap-1'>
                  {!isLoggedIn ? (
                    <>
                      <li>
                        <a
                          href="#"
                          id="register-btn"
                          onClick={handleRegisterClick}
                          className="text-xs text-[#000000] hover:text-[#121111] duration-200"
                        >
                          Đăng Ký
                        </a>
                      </li>
                      <li className="mx-1 text-[#0f0e0e]">|</li>
                      <li>
                        <a
                          href="#"
                          onClick={handleLoginClick}
                          className="text-xs text-[#101010] hover:text-[#8a7355] duration-200"
                        >
                          Đăng Nhập
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center">
                        <FaUser className="mr-1 text-[#121111] text-xs" />
                        <span className="text-xs font-medium">{currentUser?.fullName || 'User'}</span>
                      </li>
                      <li className="mx-1 text-[#0f0e0e]">|</li>
                      <li>
                        <a
                          href="#"
                          onClick={handleLogout}
                          className="text-xs text-[#000000] hover:text-[#8a7355] duration-200"
                        >
                          Đăng Xuất
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hiển thị modal */}
      {showForm === "register" && (
        <DangKy 
          onClose={() => setShowForm(null)} 
          onRegisterSuccess={() => setShowForm("login")}
        />
      )}
      
      {showForm === "login" && (
        <Login
          onClose={() => setShowForm(null)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </nav>
  );
};

export default Navbar;
