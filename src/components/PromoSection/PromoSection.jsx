import React from 'react';
import { FaGift, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PromoSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/product');
  };

  return (
    <div className="py-12 relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'url("https://img.freepik.com/free-photo/assortment-pieces-cake_114579-30572.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left column - Promotional Text */}
          <div data-aos="fade-right">
            <div className="flex items-center mb-3">
              <FaGift className="text-red-500 mr-2" />
              <span className="text-sm font-medium text-red-500">Ưu Đãi Đặc Biệt</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Giảm Giá 30% Cho Đơn Hàng Đầu Tiên!</h2>
            <p className="text-gray-600 mb-6">
              Đặt bánh ngay hôm nay và nhận ưu đãi đặc biệt dành cho khách hàng mới. 
              Áp dụng cho tất cả các loại bánh trong cửa hàng của chúng tôi. 
              Hãy nhanh tay, ưu đãi chỉ áp dụng đến cuối tháng!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleExploreClick}
                className="bg-[#deb658] hover:bg-[#c9a141] text-white font-medium py-3 px-6 rounded-full transition flex items-center justify-center"
              >
                Khám Phá Ngay
                <FaArrowRight className="ml-2" />
              </button>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-[#deb658] flex items-center justify-center">
                  <span className="text-lg font-bold text-[#deb658]">30%</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Mã giảm giá</p>
                  <p className="text-lg font-bold">WELCOME30</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Image */}
          <div data-aos="fade-left" className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-red-500 text-white flex items-center justify-center transform rotate-12 shadow-lg">
                <div className="text-center">
                  <p className="text-sm font-medium">Giảm giá</p>
                  <p className="text-2xl font-bold">30%</p>
                  <p className="text-xs">Chỉ tháng này!</p>
                </div>
              </div>
              <img 
                src="https://i.pinimg.com/originals/64/89/90/64899006bd72af0b174c0a366fad411e.jpg" 
                alt="Special Promotion" 
                className="rounded-lg shadow-xl w-full h-auto max-h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoSection; 