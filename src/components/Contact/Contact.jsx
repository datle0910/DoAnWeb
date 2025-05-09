import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ lại sớm.');
  };

  return (
    <div className="bg-[#faf8f1] py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#333] mb-4">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe ý kiến và phục vụ quý khách. Hãy liên hệ với chúng tôi bằng một trong những cách dưới đây.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form liên hệ */}
          <div className="bg-white p-8 rounded-lg shadow-md" data-aos="fade-right">
            <h2 className="text-2xl font-semibold text-[#333] mb-6">Gửi Tin Nhắn</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Họ tên</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fea928]"
                  placeholder="Nhập họ tên của bạn"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fea928]"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fea928]"
                  placeholder="0123 456 789"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-2">Tin nhắn</label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fea928]"
                  placeholder="Nhập nội dung tin nhắn của bạn"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#fea928] hover:bg-[#e69b24] text-white py-3 px-6 rounded-md transition-colors font-medium"
              >
                Gửi Tin Nhắn
              </button>
            </form>
          </div>

          {/* Thông tin liên hệ */}
          <div className="flex flex-col" data-aos="fade-left">
            <div className="bg-white p-8 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold text-[#333] mb-6">Thông Tin Liên Hệ</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#fef5e5] flex items-center justify-center mr-4">
                    <FaPhone className="text-[#fea928] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Số Điện Thoại</h3>
                    <p className="text-lg">(+84) 901 234 567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#fef5e5] flex items-center justify-center mr-4">
                    <FaEnvelope className="text-[#fea928] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Email</h3>
                    <p className="text-lg">sweetglow@bakery.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#fef5e5] flex items-center justify-center mr-4">
                    <FaMapMarkerAlt className="text-[#fea928] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Địa Chỉ</h3>
                    <p className="text-lg">12 Nguyễn Văn Bảo, Quận Gò Vấp, TP.HCM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#fef5e5] flex items-center justify-center mr-4">
                    <FaClock className="text-[#fea928] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Giờ Mở Cửa</h3>
                    <p className="text-lg">Thứ 2 - Chủ Nhật: 7:00 - 22:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-[#333] mb-6">Theo Dõi Chúng Tôi</h2>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 rounded-full bg-[#fef5e5] flex items-center justify-center hover:bg-[#fea928] transition-colors">
                  <FaFacebook className="text-[#fea928] hover:text-white text-xl transition-colors" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-[#fef5e5] flex items-center justify-center hover:bg-[#fea928] transition-colors">
                  <FaInstagram className="text-[#fea928] hover:text-white text-xl transition-colors" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-[#fef5e5] flex items-center justify-center hover:bg-[#fea928] transition-colors">
                  <FaTwitter className="text-[#fea928] hover:text-white text-xl transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bản đồ */}
        <div className="mt-12" data-aos="zoom-in">
          <h2 className="text-2xl font-semibold text-[#333] mb-6 text-center">Vị Trí Cửa Hàng</h2>
          <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4946681366885!2d106.70140997465782!3d10.773225089387625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4670702e31%3A0xa5777fb3a5bb9e35!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTw6BpIEfDsm4!5e0!3m2!1svi!2s!4v1685330314347!5m2!1svi!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 