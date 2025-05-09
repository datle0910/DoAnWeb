import React from 'react';
import { FaCertificate, FaLeaf, FaHeart, FaUsers } from 'react-icons/fa';

// Placeholder for importing actual bakery images
import bakerImage from '../../assets/ll.png'; // Replace with actual baker image
import bakeryStoryImage from '../../assets/ll.png'; // Replace with actual bakery image
import team1 from '../../assets/ll.png'; // Replace with actual team member image
import team2 from '../../assets/ll.png'; // Replace with actual team member image
import team3 from '../../assets/ll.png'; // Replace with actual team member image

const AboutUs = () => {
  const values = [
    {
      icon: <FaCertificate className="text-3xl text-[#fea928]" />,
      title: "Chất Lượng",
      description: "Chúng tôi sử dụng những nguyên liệu tốt nhất và công thức đặc biệt để tạo ra những chiếc bánh ngon nhất."
    },
    {
      icon: <FaLeaf className="text-3xl text-[#fea928]" />,
      title: "Tự Nhiên",
      description: "Không chất bảo quản, không phẩm màu nhân tạo - chỉ có sự tươi ngon từ thiên nhiên."
    },
    {
      icon: <FaHeart className="text-3xl text-[#fea928]" />,
      title: "Đam Mê",
      description: "Mỗi chiếc bánh đều được làm với tình yêu, sự tỉ mỉ và đam mê từ đội ngũ thợ làm bánh của chúng tôi."
    },
    {
      icon: <FaUsers className="text-3xl text-[#fea928]" />,
      title: "Phục Vụ",
      description: "Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu trong mọi sản phẩm và dịch vụ."
    }
  ];

  const team = [
    {
      image: team1,
      name: "Lê Văn Đạt",
      position: "Master Baker",
      description: "Hơn 15 năm kinh nghiệm làm bánh tại các tiệm bánh nổi tiếng ở Pháp và Việt Nam."
    },
    {
      image: team2,
      name: "Đạt Lê Văn",
      position: "Pastry Chef",
      description: "Chuyên gia về bánh ngọt với nhiều sáng tạo độc đáo, từng đoạt giải thưởng tại cuộc thi làm bánh quốc tế."
    },
    {
      image: team3,
      name: "Ăng Đẹt Pro vip",
      position: "Store Manager",
      description: "Quản lý cửa hàng với tâm huyết phục vụ khách hàng và đảm bảo chất lượng dịch vụ tốt nhất."
    }
  ];

  return (
    <div className="bg-[#faf8f1]">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-[#fea928] to-[#e69b24] mb-16">
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white relative z-10">
          <h1 className="text-5xl font-bold mb-6" data-aos="fade-down">Về SweetGlow Bakery</h1>
          <p className="text-xl max-w-2xl mx-auto" data-aos="fade-up">
            Nơi những chiếc bánh ngon nhất được tạo ra với tình yêu, sự tỉ mỉ và nguyên liệu chất lượng cao.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <img 
              src={bakeryStoryImage} 
              alt="SweetGlow Bakery Story" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div data-aos="fade-left">
            <h2 className="text-3xl font-bold text-[#333] mb-6">Câu Chuyện Của Chúng Tôi</h2>
            <p className="text-gray-600 mb-4">
              SweetGlow Bakery được thành lập vào năm 2010 bởi những người yêu bánh với ước mơ mang đến những sản phẩm bánh ngọt chất lượng cao với giá cả hợp lý cho mọi người.
            </p>
            <p className="text-gray-600 mb-4">
              Từ một tiệm bánh nhỏ, chúng tôi đã phát triển thành một trong những tiệm bánh được yêu thích nhất tại thành phố, phục vụ hàng trăm khách hàng mỗi ngày với các loại bánh mì, bánh ngọt và bánh kem đặc biệt.
            </p>
            <p className="text-gray-600">
              Triết lý của chúng tôi rất đơn giản: sử dụng nguyên liệu tốt nhất, áp dụng kỹ thuật làm bánh truyền thống kết hợp với sáng tạo hiện đại, và luôn đặt chất lượng lên hàng đầu trong mọi sản phẩm.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#333] mb-12" data-aos="fade-up">Giá Trị Cốt Lõi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-[#faf8f1] p-6 rounded-lg shadow-md text-center"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-sm">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#333] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Master Baker Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1" data-aos="fade-right">
            <h2 className="text-3xl font-bold text-[#333] mb-6">Nghệ Nhân Làm Bánh</h2>
            <p className="text-gray-600 mb-4">
              Đứng đằng sau mỗi chiếc bánh là đội ngũ thợ làm bánh lành nghề và đầy đam mê của chúng tôi, dẫn đầu là Master Baker Nguyễn Văn A với hơn 15 năm kinh nghiệm.
            </p>
            <p className="text-gray-600 mb-4">
              Chúng tôi liên tục học hỏi, cải tiến và sáng tạo để mang đến những sản phẩm mới lạ, hấp dẫn nhưng vẫn giữ được hương vị truyền thống đã làm nên tên tuổi của SweetGlow Bakery.
            </p>
            <p className="text-gray-600">
              Mỗi ngày, đội ngũ của chúng tôi thức dậy từ 3 giờ sáng để chuẩn bị bột bánh, nướng bánh mì và bánh ngọt tươi, đảm bảo khách hàng luôn được thưởng thức những sản phẩm tươi ngon nhất.
            </p>
          </div>
          <div className="order-1 md:order-2" data-aos="fade-left">
            <img 
              src={bakerImage} 
              alt="SweetGlow Master Baker" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#333] mb-12" data-aos="fade-up">Đội Ngũ Của Chúng Tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="bg-[#faf8f1] rounded-lg overflow-hidden shadow-md"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#333] mb-1">{member.name}</h3>
                  <p className="text-[#fea928] font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#fea928] py-16">
        <div className="container mx-auto px-4 text-center" data-aos="zoom-in">
          <h2 className="text-3xl font-bold text-white mb-6">Ghé Thăm Cửa Hàng Của Chúng Tôi</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Hãy đến và thưởng thức những chiếc bánh ngon tuyệt của chúng tôi. Chúng tôi mong được phục vụ bạn!
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-white text-[#fea928] py-3 px-8 rounded-full font-bold hover:bg-[#f8f4e3] transition-colors"
          >
            Liên Hệ Ngay
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 