import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import logo from '../../assets/ll.png';

const Footer = () => {
  return (
    <footer className='bg-[#f3f3f3] py-8 mt-12'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {/* Thông tin cửa hàng */}
          <div className='space-y-4'>
            <img src={logo} alt="Logo" className='w-12 h-12' />
            <h3 className='font-semibold text-lg'>SweetGlow</h3>
            <p className='text-sm text-gray-600'>
              Chúng tôi cung cấp các loại bánh ngọt ngon lành, phục vụ cho mọi sở thích của khách hàng.
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h4 className='font-semibold text-lg mb-3'>Liên kết nhanh</h4>
            <ul className='space-y-2'>
              <li><a href="/" className='text-gray-600 hover:text-[#deb658]'>Trang chủ</a></li>
              <li><a href="/products" className='text-gray-600 hover:text-[#deb658]'>Sản phẩm</a></li>
              <li><a href="/about-us" className='text-gray-600 hover:text-[#deb658]'>Giới thiệu</a></li>
              <li><a href="/contact" className='text-gray-600 hover:text-[#deb658]'>Liên hệ</a></li>
            </ul>
          </div>

          {/* Kênh liên hệ */}
          <div>
            <h4 className='font-semibold text-lg mb-3'>Liên hệ</h4>
            <p className='text-gray-600'>Email: support@sweetglow.com</p>
            <p className='text-gray-600'>Điện thoại: +84 123 456 789</p>
          </div>

          {/* Mạng xã hội */}
          <div>
            <h4 className='font-semibold text-lg mb-3'>Mạng xã hội</h4>
            <div className='flex gap-4'>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className='text-2xl text-gray-600 hover:text-[#deb658]' />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className='text-2xl text-gray-600 hover:text-[#deb658]' />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className='text-2xl text-gray-600 hover:text-[#deb658]' />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className='text-2xl text-gray-600 hover:text-[#deb658]' />
              </a>
            </div>
          </div>
        </div>

        {/* Bản quyền */}
        <div className='mt-8 text-center text-sm text-gray-500'>
          <p>&copy; 2025 SweetGlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
