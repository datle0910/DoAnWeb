import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonialsData = [
  {
    id: 1,
    name: "Nguyễn Thị Hương",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    rating: 5,
    comment: "Bánh của tiệm thực sự tuyệt vời! Tôi đặt bánh sinh nhật cho con gái và cả nhà đều rất thích. Không chỉ đẹp mắt mà còn rất ngon.",
    date: "15/05/2023"
  },
  {
    id: 2,
    name: "Trần Văn Minh",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    comment: "Bánh mì ở đây rất tươi và giòn. Tôi hay mua mỗi sáng trên đường đi làm. Sẽ tiếp tục ủng hộ tiệm!",
    date: "23/06/2023"
  },
  {
    id: 3,
    name: "Lê Thị Hà",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 5,
    comment: "Bánh kem matcha là món yêu thích của tôi. Vị trà xanh đậm đà nhưng không quá ngọt. Nhân viên phục vụ cũng rất nhiệt tình.",
    date: "07/08/2023"
  }
];

const RatingStars = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <FaStar 
          key={index} 
          className={index < rating ? "text-yellow-400" : "text-gray-300"} 
          size={16}
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-[#deb658]">Đánh Giá Từ Khách Hàng</p>
          <h2 data-aos="fade-up" className="text-3xl font-bold">Khách Hàng Nói Gì Về Chúng Tôi</h2>
          <p data-aos="fade-up" className="text-xs text-gray-500 mt-2">
            Cùng xem những đánh giá từ khách hàng đã trải nghiệm sản phẩm của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <div 
              key={testimonial.id}
              data-aos="fade-up" 
              data-aos-delay={(testimonial.id - 1) * 100}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow relative"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-sm">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                <div className="flex justify-center my-2">
                  <RatingStars rating={testimonial.rating} />
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <FaQuoteLeft className="text-gray-300 mx-auto mb-2" size={24} />
                <p className="text-gray-600 italic text-sm">{testimonial.comment}</p>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">{testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 