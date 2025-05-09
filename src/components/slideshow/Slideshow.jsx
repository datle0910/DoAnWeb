import React from 'react';
import cake1 from './ImgSlideshow/cake1.png';
import cake2 from './ImgSlideshow/cake2.png';
import cake3 from './ImgSlideshow/cake3.png';
import Slider from "react-slick";


const Slideshow = () => {
      const imgList = [
        { 
            id: 1,
            img: cake1,
            title: "Mừng đại lễ 30/4 - Giảm ngay 10%",
            description: "Thưởng thức hương vị ngọt ngào với ưu đãi đặc biệt nhân dịp 30/4. Hãy đặt hàng ngay để nhận ngay ưu đãi!"
        },
        { 
            id: 2,
            img: cake2,
            title: "Bánh dâu tươi - Sự lựa chọn hoàn hảo",
            description: "Bánh bông lan mềm mịn, kết hợp cùng lớp kem dâu chua ngọt. Hoàn hảo cho mọi dịp đặc biệt!"
            
        },
        { 
            id: 3,
            img: cake3,
            title: "Bánh kem socola - Ưu đãi hấp dẫn!",
            description: "Hương vị đậm đà từ socola nguyên chất, kết hợp cùng lớp kem mịn màng. Đặt ngay để tận hưởng vị ngon khó cưỡng!"
        }
    ];


    const settings = {
      dots: true, // Hiển thị chấm điều hướng
      infinite: true, // Vòng lặp vô hạn
      speed: 500, // Tốc độ chuyển đổi (ms)
      slidesToShow: 1, // Chỉ hiển thị 1 ảnh
      slidesToScroll: 1, // Cuộn 1 ảnh mỗi lần
      autoplay: true, // Tự động chạy slide
      autoplaySpeed: 3000, // 3 giây đổi ảnh
  };

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center">
      {/* background patten */}
      <div className="h-[700px] w-[700px] bg-[#fea928]/40 absolute -top-1/2 right-0 rounded-3xl rotate-45">
      </div>

      {/* hero section */}
      <div className="container pb-8 sm:pb-0">
      <Slider {...settings}>
  {imgList.map((item) => (
    <div key={item.id}>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* text content */}
        <div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10'>
          <h2 className='text-5xl sm:text-6xl lg:text-7xl font-bold'>{item.title}</h2>
          <p className='text-sm'>{item.description}</p>
          <div>
            <button className="bg-gradient-to-r from-[#fea928] to-[#ed8900] hover:scale-105 duration-200 text-white py-2 px-4 rounded-full">
              Order Now
            </button>
          </div>
        </div>
        {/* image content */}
        <div className='order-1 sm:order-2'>
          <div className='relative z-10'>
            <img src={item.img} alt={item.title} 
              className='w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-125 object-contain mx-auto'
            />
          </div>
        </div>
      </div>
    </div>
  ))}
</Slider>

      </div>
    </div>
  );
}

export default Slideshow;
