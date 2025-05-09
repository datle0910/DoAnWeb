import React, { useEffect, useState } from 'react';
import { FaStar, FaShoppingCart, FaFire } from 'react-icons/fa';
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
      <div className='container mx-auto px-4'>
        {/* Header section */}
        <div className='text-center mb-10 max-w-[600px] mx-auto'>
          <p data-aos='fade-up' className='text-sm text-[#deb658]'><FaFire className="inline mr-1" /> Top Sản Phẩm Bán Chạy</p>
          <h1 data-aos='fade-up' className='text-3xl font-bold'>Sản Phẩm Được Mua Nhiều Nhất</h1>
          <p data-aos='fade-up' className='text-xs text-gray-400'>
            Hãy khám phá các loại bánh ngon được khách hàng yêu thích nhất tại tiệm của chúng tôi!
          </p>
        </div>

        {/* Body section */}
        <div className="w-full flex justify-center">
          <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5 w-full'>
            {topSellingProducts.map((data, index) => (
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
                  <span className='absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full shadow flex items-center'>
                    <FaShoppingCart className="mr-1" size={10} /> TOP {index + 1}
                  </span>
                  {data.sale > 0 && (
                    <span className='absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow'>
                      -{data.sale}%
                    </span>
                  )}
                </div>
                <div className='text-left space-y-1'>
                  <h3 className='font-semibold'>{data.title}</h3>
                  <div className="flex flex-col">
                    {data.sale > 0 ? (
                      <>
                        <p className='text-sm text-red-600 font-medium'>
                          {(data.price * (1 - data.sale/100)).toLocaleString()} đ
                        </p>
                        <p className='text-xs text-gray-500 line-through'>
                          {data.price.toLocaleString()} đ
                        </p>
                      </>
                    ) : (
                      <p className='text-sm text-gray-600'>
                        {data.price.toLocaleString()} đ
                      </p>
                    )}
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                      <FaStar className='text-yellow-400' />
                      <span className="text-sm">{data.rating}</span>
                    </div>
                    <span className='text-xs text-orange-500 font-medium'>Đã bán: {data.numOfPurchase}</span>
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

export default Product;
