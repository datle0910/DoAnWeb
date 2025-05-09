import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import { FaStar } from 'react-icons/fa';

const TopProducts = () => {
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  
  // Get top 5 rated products when products data changes
  useEffect(() => {
    if (!loading) {
      const topProducts = [...products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
      setTopRatedProducts(topProducts);
    }
  }, [products, loading]);
    
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className='mt-14 mb-12'>
      <div className='container'>
        {/* Header */}
        <div className='text-center mb-10 max-w-[600px] mx-auto'>
          <p data-aos='fade-up' className='text-sm text-[#deb658]'>Top Rated Products for you</p>
          <h1 data-aos='fade-up' className='text-3xl font-bold'>Best Products</h1>
          <p data-aos='fade-up' className='text-xs text-gray-400'>
            Hãy khám phá các loại bánh ngon được khách hàng yêu thích nhất tại tiệm của chúng tôi!
          </p>
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5'>
          {topRatedProducts.map((data, index) => (
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
                <span className='absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full shadow'>
                  TOP {index + 1}
                </span>
              </div>
              <div className='text-left space-y-1'>
                <h3 className='font-semibold'>{data.title}</h3>
                <p className='text-sm text-gray-600'>
                  {data.price.toLocaleString()} đ
                </p>
                <div className='flex items-center gap-1 text-sm'>
                  <FaStar className='text-yellow-400' />
                  <span>{data.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
