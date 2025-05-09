import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaCheck, FaShoppingBag } from 'react-icons/fa';
import MainLayout from '../Layout/MainLayout';
import { useCart } from '../Cart/CartContext';
import { useNotification } from '../Cart/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const { showNotification } = useNotification();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal,
    clearCart,
    forceUpdate 
  } = useCart();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('role');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    setLoading(false);
  }, [navigate, forceUpdate]); // Include forceUpdate to re-render on cart changes

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showNotification('Giỏ hàng của bạn đang trống!', 'error');
      return;
    }

    // Save order details for the success modal
    const orderId = 'ORD-' + Date.now().toString().substring(8);
    const orderDate = new Date().toLocaleDateString('vi-VN');
    const totalAmount = getCartTotal();
    const itemCount = cartItems.length;
    
    setOrderDetails({
      orderId,
      orderDate,
      totalAmount,
      itemCount
    });

    // Save order to localStorage for admin to view
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrders = [
      ...orders,
      ...cartItems.map(item => ({
        id: 'ORD-' + Date.now() + '-' + item.id,
        productId: item.id,
        productName: item.title,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
        status: 'Pending',
        date: new Date().toISOString().slice(0, 10)
      }))
    ];
    localStorage.setItem('orders', JSON.stringify(newOrders));

    // Show success modal
    setShowSuccessModal(true);
    
    // Clear the cart
    clearCart();
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Loading cart...</h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Giỏ Hàng Của Bạn</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống</p>
            <button 
              onClick={() => navigate('/product')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0">
                              <img 
                                className="h-full w-full object-cover rounded" 
                                src={item.img} 
                                alt={item.title} 
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.title}</div>
                              <div className="text-sm text-gray-500">{item.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.price.toLocaleString()} đ</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                            >
                              <FaMinus className="text-gray-600" size={12} />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                            >
                              <FaPlus className="text-gray-600" size={12} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {calculateSubtotal(item).toLocaleString()} đ
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => handleRemoveItem(item.id)} 
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h2>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="font-medium">{getCartTotal().toLocaleString()} đ</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="font-medium">0 đ</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Tổng cộng</span>
                      <span className="font-semibold text-red-600">{getCartTotal().toLocaleString()} đ</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                  >
                    Thanh toán
                  </button>
                  <button
                    onClick={() => navigate('/product')}
                    className="w-full mt-2 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Success Modal */}
        {showSuccessModal && orderDetails && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center"></div>
            <div className="bg-white rounded-lg p-8 max-w-md w-full relative z-10 shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-4">
                  <FaCheck className="text-green-500 text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Đặt hàng thành công!</h2>
                <p className="text-gray-600 mb-6">Cảm ơn bạn đã mua hàng tại SWEETGLOW</p>
                
                <div className="w-full bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Mã đơn hàng:</span>
                    <span className="font-semibold">{orderDetails.orderId}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Ngày đặt hàng:</span>
                    <span>{orderDetails.orderDate}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Số lượng sản phẩm:</span>
                    <span>{orderDetails.itemCount}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                    <span className="font-semibold">Tổng tiền:</span>
                    <span className="font-bold text-red-600">{orderDetails.totalAmount.toLocaleString()} đ</span>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => navigate('/product')}
                    className="px-6 py-2 bg-[#fea928] text-white rounded-lg hover:bg-[#e09a24] transition-colors flex items-center"
                  >
                    <FaShoppingBag className="mr-2" />
                    Tiếp tục mua sắm
                  </button>
                  <button
                    onClick={handleCloseSuccessModal}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Về trang chủ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage; 