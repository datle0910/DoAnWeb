import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import { FaPercent, FaTags } from 'react-icons/fa';

const DiscountProducts = () => {
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const [discountProducts, setDiscountProducts] = useState([]);
  
  // Get top 5 discounted products when products data changes
  useEffect(() => {
    if (!loading) {
      const topDiscounts = [...products]
        .filter(product => product.sale > 0) // Only consider products with discounts
        .sort((a, b) => b.sale - a.sale) // Sort by discount percentage (highest first)
        .slice(0, 5); // Take top 5
      setDiscountProducts(topDiscounts);
    }
  }, [products, loading]);
    
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className='mt-14 mb-12'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-10 max-w-[600px] mx-auto'>
          <p data-aos='fade-up' className='text-sm text-[#deb658]'><FaTags className="inline mr-1" /> Siêu Giảm Giá</p>
          <h1 data-aos='fade-up' className='text-3xl font-bold'>Khuyến Mãi Hot Nhất</h1>
          <p data-aos='fade-up' className='text-xs text-gray-400'>
            Đừng bỏ lỡ cơ hội mua sắm với giá ưu đãi hấp dẫn, số lượng có hạn!
          </p>
        </div>

        {/* Product Grid */}
        <div className='w-full flex justify-center'>
          <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5 w-full'>
            {discountProducts.map((data, index) => (
              <div
                data-aos="fade-up"
                key={data.id}
                className='space-y-3 bg-white p-4 rounded-lg shadow hover:shadow-lg transition w-full max-w-[200px] cursor-pointer'
                onClick={() => handleProductClick(data.id)}
              >
                <div className='relative'>
                  <img
                    src={data.img}
                    alt={data.title}
                    className='h-[220px] w-full object-cover rounded-md'
                  />
                  <span className='absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow flex items-center'>
                    <FaPercent className="mr-1" size={10} /> {data.sale}% OFF
                  </span>
                </div>
                <div className='text-left space-y-1'>
                  <h3 className='font-semibold'>{data.title}</h3>
                  <div className="flex flex-col">
                    <p className='text-sm text-red-600 font-medium'>
                      {(data.price * (1 - data.sale/100)).toLocaleString()} đ
                    </p>
                    <p className='text-xs text-gray-500 line-through'>
                      {data.price.toLocaleString()} đ
                    </p>
                  </div>
                  <div className='flex items-center gap-1 text-sm'>
                    <span className="text-xs">Tiết kiệm: {(data.price * data.sale/100).toLocaleString()} đ</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountProducts; 