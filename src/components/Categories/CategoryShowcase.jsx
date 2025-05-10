import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCookieBite, FaBirthdayCake, FaBreadSlice, FaLeaf, FaCookie } from 'react-icons/fa';

const categories = [
  {
    id: 1,
    name: "Bánh Mì",
    icon: <FaBreadSlice size={32} />,
    description: "Bánh mì tươi mỗi ngày",
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
    borderColor: "border-amber-200",
    iconBg: "bg-amber-100",
    count: 6,
    filterType: "Bánh Mì"
  },
  {
    id: 2,
    name: "Bánh Kem",
    icon: <FaBirthdayCake size={32} />,
    description: "Bánh kem tươi ngon",
    bgColor: "bg-rose-50",
    textColor: "text-rose-600",
    borderColor: "border-rose-200",
    iconBg: "bg-rose-100",
    count: 8,
    filterType: "Bánh Kem"
  },
  {
    id: 3,
    name: "Bánh Ngọt",
    icon: <FaCookieBite size={32} />,
    description: "Bánh ngọt thơm ngon",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    iconBg: "bg-blue-100",
    count: 10,
    filterType: "Bánh Ngọt"
  },
  {
    id: 4,
    name: "Bánh Quy",
    icon: <FaCookie size={32} />,
    description: "Bánh quy giòn tan",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    borderColor: "border-orange-200",
    iconBg: "bg-orange-100",
    count: 7,
    filterType: "Bánh Quy"
  },
  {
    id: 5,
    name: "Bánh Chay",
    icon: <FaLeaf size={32} />,
    description: "Bánh chay thanh đạm",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-200",
    iconBg: "bg-green-100",
    count: 4,
    filterType: "Bánh Chay"
  }
];

const CategoryShowcase = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    // Navigate to products page with filter applied
    navigate(`/product?type=${category.filterType}`);
  };

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-[#deb658]">Khám Phá</p>
          <h2 data-aos="fade-up" className="text-3xl font-bold">Danh Mục Sản Phẩm</h2>
          <p data-aos="fade-up" className="text-xs text-gray-500 mt-2">
            Chúng tôi cung cấp đa dạng các loại bánh cho mọi nhu cầu của bạn
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              data-aos="zoom-in"
              data-aos-delay={(category.id - 1) * 100}
              className={`${category.bgColor} ${category.borderColor} border rounded-xl p-6 hover:shadow-md transition cursor-pointer`}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`${category.iconBg} w-16 h-16 rounded-full flex items-center justify-center mb-4 ${category.textColor}`}>
                  {category.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${category.textColor}`}>{category.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                <span className={`text-xs px-3 py-1 rounded-full ${category.textColor} ${category.iconBg}`}>
                  {category.count} sản phẩm
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryShowcase; 