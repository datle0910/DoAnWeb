import React, { useState } from 'react';
import { FaEnvelope, FaBell, FaCheck } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }
    
    // Simulate successful subscription
    setSubscribed(true);
    setEmail('');
    
    // Reset subscription state after 5 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <div className="bg-[#faf7f2] py-14">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div 
            data-aos="fade-up"
            className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#deb658]"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-[#deb658]"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-[#deb658] text-white flex items-center justify-center">
                  <FaEnvelope size={24} />
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Đăng Ký Nhận Thông Tin</h3>
                <p className="text-gray-600">
                  Đăng ký để nhận thông tin về sản phẩm mới và ưu đãi đặc biệt từ Tiệm Bánh của chúng tôi
                </p>
              </div>
              
              {subscribed ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                    <FaCheck />
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Đăng ký thành công!</p>
                    <p className="text-sm text-green-600">Cảm ơn bạn đã đăng ký nhận tin từ chúng tôi.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-grow relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <FaEnvelope />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Nhập email của bạn"
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${error ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#deb658] focus:border-transparent`}
                        required
                      />
                      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>
                    <button
                      type="submit"
                      className="bg-[#deb658] hover:bg-[#c9a141] text-white font-medium py-3 px-6 rounded-lg transition flex items-center justify-center"
                    >
                      <FaBell className="mr-2" />
                      Đăng Ký
                    </button>
                  </div>
                </form>
              )}
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Chúng tôi cam kết bảo mật thông tin của bạn và không gửi email spam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter; 