import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';

const Product = () => {
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  
  // Get top 5 selling products when products data changes
  useEffect(() => {
    if (!loading) {
      const topProducts = [...products]
        .sort((a, b) => b.numOfPurchase - a.numOfPurchase)
        .slice(0, 5);
      setTopSellingProducts(topProducts);
    }
  }, [products, loading]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className='mt-14 mb-12'>
      <div className='container'>
        {/* Header section */}
        <div className='text-center mb-10 max-w-[600px] mx-auto'>
          <p data-aos='fade-up' className='text-sm text-[#deb658]'>Top Sản Phẩm Được Mua Nhiều Nhất</p>
          <h1 data-aos='fade-up' className='text-3xl font-bold'>Sản Phẩm Được Mua Nhiều Nhất</h1>
          <p data-aos='fade-up' className='text-xs text-gray-400'>
            Hãy khám phá các loại bánh ngon được khách hàng yêu thích nhất tại tiệm của chúng tôi!
          </p>
        </div>

        {/* Body section */}
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5'>
            {topSellingProducts.map((data) => (
              <div
                data-aos="fade-up"
                key={data.id}
                className='space-y-3 text-left cursor-pointer hover:opacity-90 transition-opacity'
                onClick={() => handleProductClick(data.id)}
              >
                <img src={data.img} alt={data.title} className='h-[220px] w-[150px] object-cover rounded-md' />
                <div>
                  <h3 className='font-semibold'>{data.title}</h3>
                  <p className='text-sm text-gray-600'>{data.price.toLocaleString()} đ</p>
                  <div className='flex items-center gap-1'>
                    <FaStar className='text-yellow-400' />
                    <span>{data.rating}</span>
                  </div>
                  <p className='text-xs text-gray-500'>Đã bán: {data.numOfPurchase}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
