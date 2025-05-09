import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import { useCart } from '../Cart/CartContext';
import { useProducts } from '../../context/ProductsContext';
import Login from '../Navbar/Login';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { getProductById } = useProducts();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);
  
  const product = getProductById(parseInt(id));

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Product not found</h2>
            <button 
              onClick={() => navigate('/product')}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Back to Products
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('role');
    if (!isLoggedIn) {
      // Store the product to add after login
      setPendingProduct({
        product,
        quantity
      });
      // Show login form
      setShowLoginForm(true);
      return;
    }
    
    // Add product to cart if logged in
    addToCart(product, quantity);
  };

  const handleLoginSuccess = () => {
    setShowLoginForm(false);
    // If there was a pending product, add it to cart
    if (pendingProduct) {
      addToCart(pendingProduct.product, pendingProduct.quantity);
      setPendingProduct(null);
    }
  };

  return (
    <MainLayout>
      {showLoginForm && (
        <Login 
          onClose={() => setShowLoginForm(false)} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <img 
              src={product.img} 
              alt={product.title} 
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
            {product.sale > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded">
                Sale {product.sale}%
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>
            
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-red-600">
                {product.price.toLocaleString()} VND
              </span>
              {product.sale > 0 && (
                <span className="text-gray-500 line-through">
                  {(product.price * (1 + product.sale/100)).toLocaleString()} VND
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">★</span>
              <span>{product.rating}/5</span>
              <span className="text-gray-500">({product.numOfPurchase} đã bán)</span>
            </div>

            <div className="flex items-center space-x-4">
              <label className="font-medium">Số lượng:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 px-3 py-2 border rounded"
              />
            </div>

            <div className="space-x-4">
              <button
                onClick={handleAddToCart}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700"
              >
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={() => navigate('/product')}
                className="bg-gray-200 px-8 py-3 rounded-lg hover:bg-gray-300"
              >
                Quay lại
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 border-t pt-4">
              <h3 className="font-bold mb-2">Thông tin sản phẩm:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Loại: {product.type}</li>
                <li>Thương hiệu: {product.brand || 'Đang cập nhật'}</li>
                <li>Xuất xứ: {product.origin || 'Đang cập nhật'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
