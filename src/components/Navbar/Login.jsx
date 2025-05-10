import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = ({ onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
    if (loginError) {
      setLoginError('');
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = 'Email không được bỏ trống';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email không hợp lệ';
    
    if (!formData.password) tempErrors.password = 'Mật khẩu không được bỏ trống';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Clear any existing auth data first
        localStorage.removeItem('role');
        localStorage.removeItem('currentUser');
        
        // Get users from localStorage
        let users = [];
        try {
          const usersJson = localStorage.getItem('users');
          users = usersJson ? JSON.parse(usersJson) : [];
        } catch (parseError) {
          console.error('Error parsing users from localStorage:', parseError);
          users = [];
        }
        
        // For demo, if no users exist, create a default admin and customer
        if (users.length === 0) {
          const defaultUsers = [
            {
              id: 'admin-default',
              fullName: 'Admin User',
              email: 'admin@example.com',
              password: 'admin123',
              role: 'admin',
              createdAt: new Date().toISOString()
            },
            {
              id: 'customer-default',
              fullName: 'Customer User',
              email: 'customer@example.com',
              password: 'customer123',
              role: 'customer',
              createdAt: new Date().toISOString()
            }
          ];
          
          try {
            localStorage.setItem('users', JSON.stringify(defaultUsers));
          } catch (setError) {
            console.error('Error saving default users to localStorage:', setError);
          }
          
          // Now use these for authentication
          const user = defaultUsers.find(u => 
            u.email === formData.email && u.password === formData.password
          );
          
          if (user) {
            loginUser(user);
            return;
          }
        } else {
          // Find user with matching email and password
          const user = users.find(u => 
            u.email === formData.email && u.password === formData.password
          );
          
          if (user) {
            loginUser(user);
            return;
          }
        }
        
        // If we get here, authentication failed
        setLoginError('Email hoặc mật khẩu không đúng');
      } catch (error) {
        console.error('Failed to access localStorage during login:', error);
        setLoginError('Đăng nhập thất bại do trình duyệt chặn truy cập lưu trữ. Vui lòng kiểm tra cài đặt trình duyệt của bạn.');
      }
    }
  };
  
  const loginUser = (user) => {
    try {
      // Save login state and user info to localStorage
      localStorage.setItem('role', user.role);
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }));
      
      // Close the modal first
      onClose();
      
      // Handle different redirects based on role
      if (user.role === 'admin') {
        // Use window.location for full page reload
        window.location.href = '/admin';
      } else {
        // Call the onLoginSuccess callback if provided
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        // Stay on current page or go to home for customers
      }
    } catch (error) {
      console.error('Failed to store user data in localStorage:', error);
      setLoginError('Đăng nhập thất bại do trình duyệt chặn truy cập lưu trữ. Vui lòng kiểm tra cài đặt trình duyệt của bạn.');
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative border border-gray-200">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-4">Đăng Nhập</h2>
        
        
        {loginError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {loginError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.email || loginError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.password || loginError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="******"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Nhớ đăng nhập
              </label>
            </div>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
              Quên mật khẩu?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#fea928] text-white py-2 px-4 rounded-md hover:bg-[#e69b24] transition-colors"
          >
            Đăng Nhập
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500" onClick={() => {
              onClose();
              document.getElementById('register-btn').click();
            }}>
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
