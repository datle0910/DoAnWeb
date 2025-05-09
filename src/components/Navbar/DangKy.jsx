import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const DangKy = ({ onClose, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer' // Default role is customer
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

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
  };

  const validate = () => {
    let tempErrors = {};
    
    // Full Name validation
    if (!formData.fullName) tempErrors.fullName = 'Họ tên không được bỏ trống';
    else if (formData.fullName.length < 3) tempErrors.fullName = 'Họ tên phải có ít nhất 3 ký tự';
    
    // Email validation
    if (!formData.email) tempErrors.email = 'Email không được bỏ trống';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email không hợp lệ';
    
    // Check if email already exists in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === formData.email)) {
      tempErrors.email = 'Email này đã được đăng ký';
    }
    
    // Password validation
    if (!formData.password) tempErrors.password = 'Mật khẩu không được bỏ trống';
    else if (formData.password.length < 6) tempErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    
    // Confirm password validation
    if (!formData.confirmPassword) tempErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    else if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Create new user object (without confirmPassword)
      const newUser = {
        id: Date.now(), // Simple unique ID
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password, // In a real app, you'd hash this
        role: formData.role,
        createdAt: new Date().toISOString()
      };
      
      // Add new user to array
      users.push(newUser);
      
      // Save updated users array to localStorage
      localStorage.setItem('users', JSON.stringify(users));
      
      // Show success message
      setSuccessMessage('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'customer'
      });
      
      // Call success callback if provided
      if (onRegisterSuccess) {
        setTimeout(() => {
          onRegisterSuccess();
        }, 2000);
      } else {
        // Auto close after delay if no callback
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative max-h-[90vh] overflow-y-auto border border-gray-200">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-4">Đăng Ký Tài Khoản</h2>
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Nguyễn Văn A"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="example@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="******"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="******"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Loại tài khoản</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="customer">Khách hàng</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#fea928] text-white py-2 px-4 rounded-md hover:bg-[#e69b24] transition-colors"
          >
            Đăng Ký
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <a href="#" onClick={onClose} className="text-indigo-600 hover:text-indigo-500">
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DangKy;
