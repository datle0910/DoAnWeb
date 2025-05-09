import React, { useState, useEffect } from 'react';
import { FaUsers, FaShoppingCart, FaClipboardList, FaSignOutAlt, FaChartBar, FaHome, FaUserEdit, FaBoxOpen, FaMoneyBillWave, FaEdit, FaTrash, FaEye, FaSave, FaTimes, FaPlus } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/ll.png';
import { useProducts } from '../../context/ProductsContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  
  // Dashboard state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [dailySales, setDailySales] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasAdminAccess, setHasAdminAccess] = useState(false);
  
  // Product management state
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productForm, setProductForm] = useState({
    id: '',
    title: '',
    description: '',
    type: 'Bánh Mì',
    price: 0,
    rating: 5.0,
    sale: 0,
    numOfPurchase: 0,
    img: null,
  });
  
  // User management state
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentUserEdit, setCurrentUserEdit] = useState(null);
  const [isUserEditMode, setIsUserEditMode] = useState(false);
  const [userForm, setUserForm] = useState({
    id: '',
    fullName: '',
    email: '',
    password: '',
    role: 'customer',
    createdAt: ''
  });
  
  // Order management state
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [currentOrderDetail, setCurrentOrderDetail] = useState(null);
  
  // Check admin access on mount and when localStorage changes
  useEffect(() => {
    const checkAdminAccess = () => {
      const role = localStorage.getItem('role');
      if (role === 'admin') {
        setHasAdminAccess(true);
        
        // Load current user
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          try {
            setCurrentUser(JSON.parse(storedUser));
          } catch (error) {
            console.error('Error parsing currentUser:', error);
          }
        }
        
        // Load users
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          try {
            setUsers(JSON.parse(storedUsers));
          } catch (error) {
            console.error('Error parsing users:', error);
          }
        } else {
          // Initialize with sample users if none exist
          const initialUsers = [
            {
              id: 'user1',
              fullName: 'Khách hàng mẫu',
              email: 'customer@example.com',
              password: 'password123',
              role: 'customer',
              createdAt: new Date().toISOString()
            },
            {
              id: 'admin1',
              fullName: 'Quản trị viên',
              email: 'admin@example.com',
              password: 'adminpass',
              role: 'admin',
              createdAt: new Date().toISOString()
            }
          ];
          setUsers(initialUsers);
          localStorage.setItem('users', JSON.stringify(initialUsers));
        }

        // Load orders
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
          try {
            setOrders(JSON.parse(storedOrders));
          } catch (error) {
            console.error('Error parsing orders:', error);
          }
        }
        
        // Generate some sample daily sales data
        const sampleDailySales = {
          'Thứ 2': Math.floor(Math.random() * 5000000) + 1000000,
          'Thứ 3': Math.floor(Math.random() * 5000000) + 1000000,
          'Thứ 4': Math.floor(Math.random() * 5000000) + 1000000,
          'Thứ 5': Math.floor(Math.random() * 5000000) + 1000000,
          'Thứ 6': Math.floor(Math.random() * 5000000) + 1000000,
          'Thứ 7': Math.floor(Math.random() * 5000000) + 1000000,
          'CN': Math.floor(Math.random() * 5000000) + 1000000,
        };
        setDailySales(sampleDailySales);
        
        setIsLoading(false);
      } else {
        setHasAdminAccess(false);
        navigate('/unauthorized');
      }
    };
    
    checkAdminAccess();
    
    // Listen for storage events (for logout)
    const handleStorage = () => {
      const role = localStorage.getItem('role');
      if (role !== 'admin') {
        navigate('/unauthorized');
      }
    };
    window.addEventListener('storage', handleStorage);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [navigate]);

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('currentUser');
    navigate('/');
  };
  
  // Handle tab change
  const handleTabChange = (tabId) => {
    // If Home is clicked, set activeTab to 'dashboard'
    if (tabId === 1) {
      setActiveTab('dashboard');
    } else {
      // For other tabs, use their respective paths
      const path = adminMenuItems.find(item => item.id === tabId)?.link.split('/').pop() || 'dashboard';
      setActiveTab(path);
    }
  };

  // PRODUCT MANAGEMENT FUNCTIONS
  
  // Add a new product
  const handleAddProduct = () => {
    setProductForm({
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      title: '',
      description: '',
      type: 'Bánh Mì',
      price: 0,
      rating: 5.0,
      sale: 0,
      numOfPurchase: 0,
      img: null,
    });
    setIsEditMode(false);
    setShowProductModal(true);
  };
  
  // Edit an existing product
  const handleEditProduct = (product) => {
    setProductForm({
      ...product,
    });
    setIsEditMode(true);
    setShowProductModal(true);
  };
  
  // View product details
  const handleViewProduct = (product) => {
    setCurrentProduct(product);
  };
  
  // Delete a product
  const handleDeleteProduct = (productId) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      deleteProduct(productId);
      alert("Đã xóa sản phẩm thành công!");
    }
  };
  
  // Handle form input changes
  const handleProductFormChange = (e) => {
    const { name, value, type } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };
  
  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm(prev => ({
          ...prev,
          img: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Save product (add new or update existing)
  const handleSaveProduct = () => {
    // Validate form
    if (!productForm.title || !productForm.description || productForm.price <= 0) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
      return;
    }
    
    if (isEditMode) {
      // Update existing product
      updateProduct(productForm);
      alert("Cập nhật sản phẩm thành công!");
    } else {
      // Add new product
      if (!productForm.img) {
        alert("Vui lòng chọn hình ảnh cho sản phẩm!");
        return;
      }
      addProduct(productForm);
      alert("Thêm sản phẩm mới thành công!");
    }
    
    setShowProductModal(false);
  };
  
  // Close product modal
  const handleCloseProductModal = () => {
    setShowProductModal(false);
  };

  // USER MANAGEMENT FUNCTIONS
  
  // Add new user
  const handleAddUser = () => {
    setUserForm({
      id: Date.now().toString(),
      fullName: '',
      email: '',
      password: '',
      role: 'customer',
      createdAt: new Date().toISOString()
    });
    setIsUserEditMode(false);
    setShowUserModal(true);
  };
  
  // Edit user
  const handleEditUser = (user) => {
    setUserForm({
      ...user,
      password: '' // Don't show the password
    });
    setIsUserEditMode(true);
    setShowUserModal(true);
  };
  
  // Delete user
  const handleDeleteUser = (userId) => {
    if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      alert("Đã xóa người dùng thành công!");
    }
  };
  
  // Handle user form changes
  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Save user
  const handleSaveUser = () => {
    // Validation
    if (!userForm.fullName || !userForm.email) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    
    if (!isUserEditMode && !userForm.password) {
      alert("Vui lòng nhập mật khẩu cho người dùng mới!");
      return;
    }
    
    let updatedUsers;
    if (isUserEditMode) {
      // Update existing user
      updatedUsers = users.map(u => 
        u.id === userForm.id ? {
          ...u,
          fullName: userForm.fullName,
          email: userForm.email,
          role: userForm.role,
          // Only update password if a new one was provided
          ...(userForm.password ? { password: userForm.password } : {})
        } : u
      );
      alert("Cập nhật người dùng thành công!");
    } else {
      // Add new user
      updatedUsers = [...users, { ...userForm }];
      alert("Thêm người dùng mới thành công!");
    }
    
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setShowUserModal(false);
  };
  
  // Close user modal
  const handleCloseUserModal = () => {
    setShowUserModal(false);
  };

  // ORDER MANAGEMENT FUNCTIONS
  
  // View order details
  const handleViewOrder = (order) => {
    setCurrentOrderDetail(order);
    setShowOrderModal(true);
  };
  
  // Update order status
  const handleUpdateOrderStatus = (orderId, status) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('adminOrders', JSON.stringify(updatedOrders));
  };
  
  // Cancel order
  const handleCancelOrder = (orderId) => {
    if (confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
      handleUpdateOrderStatus(orderId, 'Cancelled');
      alert("Đã hủy đơn hàng thành công!");
    }
  };
  
  // Close order modal
  const handleCloseOrderModal = () => {
    setShowOrderModal(false);
  };

  // Admin menu items - simplified labels
  const adminMenuItems = [
    { id: 1, name: "Home", link: "/admin", icon: <FaHome className="w-5 h-5 mr-3" /> },
    { id: 2, name: "Sản Phẩm", link: "/admin/products", icon: <FaBoxOpen className="w-5 h-5 mr-3" /> },
    { id: 3, name: "Đơn Hàng", link: "/admin/orders", icon: <FaShoppingCart className="w-5 h-5 mr-3" /> },
    { id: 4, name: "Người Dùng", link: "/admin/users", icon: <FaUsers className="w-5 h-5 mr-3" /> },
    { id: 5, name: "Thống Kê", link: "/admin/stats", icon: <FaChartBar className="w-5 h-5 mr-3" /> },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-yellow-500 mb-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  // If user is not admin, don't render anything (redirect happens in useEffect)
  if (!hasAdminAccess || !currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar - Similar to Customer Navbar */}
      <nav className='bg-white dark:bg-gray-900 dark:text-dark w-full'>
        <div className="bg-[#fea928] py-2"> 
          <div className='container mx-auto px-4'>
            <div className="flex justify-between items-center">
              {/* Logo - Trái */}
              <div className="w-1/4">
                <Link to="/admin" className='font-bold text-2xl sm:text-3xl flex gap-2 items-center' onClick={() => setActiveTab('dashboard')}>
                  <img src={logo} alt="logo" className='w-12 h-12' />
                  <h3 className='text-xl text-[#0e0d0d]'>SWEETGLOW</h3>
                </Link>
              </div>

              {/* Menu - Giữa */}
              <div className="w-2/4 flex justify-center">
                <ul className='sm:flex hidden items-center gap-6'>
                  {adminMenuItems.map((item) => (
                    <li key={item.id}>
                      <Link 
                        to={item.link} 
                        className='inline-block px-4 text-[#060505] hover:text-[#f8f4e3] duration-200 font-medium'
                        onClick={(e) => {
                          e.preventDefault();
                          handleTabChange(item.id);
                        }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Admin Info - Phải */}
              <div className="w-1/4 flex justify-end items-center gap-4">
                <div className="flex items-center">
                  <FaUserEdit className="mr-2 text-[#121111]" />
                  <span className="text-sm font-medium mr-4">{currentUser.fullName || 'Admin'}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-[#000000] hover:text-[#f8f4e3] duration-200 font-medium"
                  >
                    Đăng Xuất
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Now takes full width */}
      <div className="flex-1 p-8">
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Tổng quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                    <FaUsers className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-gray-500">Tổng người dùng</div>
                    <div className="text-2xl font-bold">{users.length}</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                    <FaShoppingCart className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-gray-500">Đơn hàng</div>
                    <div className="text-2xl font-bold">{orders.length}</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
                    <FaClipboardList className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-gray-500">Sản phẩm</div>
                    <div className="text-2xl font-bold">{products.length}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4">Thống kê gần đây</h3>
              <p className="text-gray-500">Đơn hàng gần đây: {orders.length > 0 ? orders.length : 'Không có đơn hàng nào'}</p>
              <p className="text-gray-500">Người dùng mới: {users.length > 0 ? users.filter(u => new Date(u.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length : 0} (trong 7 ngày qua)</p>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Quản lý khách hàng</h2>
              <button
                onClick={handleAddUser}
                className="bg-[#fea928] hover:bg-[#e09a24] text-white px-4 py-2 rounded-lg transition-all duration-200"
              >
                + Thêm người dùng mới
              </button>
            </div>
            
            {users.length > 0 ? (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {typeof user.id === 'string' && user.id.length > 8 
                            ? user.id.substring(0, 8) + '...' 
                            : user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role === 'admin' ? 'Admin' : 'Khách hàng'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap flex">
                          <button onClick={() => handleEditUser(user)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                            <FaEdit className="inline mr-1" /> Sửa
                          </button>
                          <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">
                            <FaTrash className="inline mr-1" /> Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">Không có người dùng nào.</p>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h2>
            {orders.length > 0 ? (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.productName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.total.toLocaleString()} VND</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className={`px-2 py-1 text-xs rounded border ${
                              order.status === 'Completed' ? 'bg-green-100 border-green-300' :
                              order.status === 'Cancelled' ? 'bg-red-100 border-red-300' :
                              order.status === 'Shipped' ? 'bg-blue-100 border-blue-300' :
                              order.status === 'Processing' ? 'bg-yellow-100 border-yellow-300' :
                              'bg-gray-100 border-gray-300'
                            }`}
                          >
                            <option value="Pending">Chờ xử lý</option>
                            <option value="Processing">Đang xử lý</option>
                            <option value="Shipped">Đã giao</option>
                            <option value="Completed">Hoàn thành</option>
                            <option value="Cancelled">Đã hủy</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap flex">
                          <button onClick={() => handleViewOrder(order)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                            <FaEye className="inline mr-1" /> Chi tiết
                          </button>
                          {order.status !== 'Cancelled' && order.status !== 'Completed' && (
                            <button onClick={() => handleCancelOrder(order.id)} className="text-red-600 hover:text-red-900">
                              <FaTimes className="inline mr-1" /> Hủy
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">Không có đơn hàng nào.</p>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Quản lý sản phẩm</h2>
              <button 
                onClick={handleAddProduct}
                className="bg-[#fea928] hover:bg-[#e09a24] text-white px-4 py-2 rounded-lg transition-all duration-200"
              >
                + Thêm sản phẩm mới
              </button>
            </div>
            
            {products.length > 0 ? (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giảm giá (%)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.price.toLocaleString()} VND</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.sale}%</td>
                        <td className="px-6 py-4 whitespace-nowrap flex">
                          <button onClick={() => handleEditProduct(product)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                            <FaEdit className="inline mr-1" /> Sửa
                          </button>
                          <button onClick={() => handleViewProduct(product)} className="text-green-600 hover:text-green-900 mr-3">
                            <FaEye className="inline mr-1" /> Chi tiết
                          </button>
                          <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-900">
                            <FaTrash className="inline mr-1" /> Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">Không có sản phẩm nào.</p>
            )}
          </div>
        )}
        
        {/* Product Modal */}
        {showProductModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">{isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
                <button onClick={handleCloseProductModal} className="text-gray-500 hover:text-gray-700">
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Tên sản phẩm</label>
                  <input
                    type="text"
                    name="title"
                    value={productForm.title}
                    onChange={handleProductFormChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Mô tả</label>
                  <textarea
                    name="description"
                    value={productForm.description}
                    onChange={handleProductFormChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 h-32"
                    placeholder="Nhập mô tả sản phẩm"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Loại sản phẩm</label>
                    <select
                      name="type"
                      value={productForm.type}
                      onChange={handleProductFormChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="Bánh Mì">Bánh Mì</option>
                      <option value="Bánh Kem">Bánh Kem</option>
                      <option value="Bánh Ngọt">Bánh Ngọt</option>
                      <option value="Bánh Quy">Bánh Quy</option>
                      <option value="Bánh Chay">Bánh Chay</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Giá (VND)</label>
                    <input
                      type="number"
                      name="price"
                      value={productForm.price}
                      onChange={handleProductFormChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Giảm giá (%)</label>
                    <input
                      type="number"
                      name="sale"
                      value={productForm.sale}
                      onChange={handleProductFormChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      min="0"
                      max="100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Đánh giá (1-5)</label>
                    <input
                      type="number"
                      name="rating"
                      value={productForm.rating}
                      onChange={handleProductFormChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      min="1"
                      max="5"
                      step="0.1"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Đã bán</label>
                  <input
                    type="number"
                    name="numOfPurchase"
                    value={productForm.numOfPurchase}
                    onChange={handleProductFormChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Hình ảnh</label>
                  {productForm.img ? (
                    <div className="mb-2">
                      <img src={productForm.img} alt="Product preview" className="h-40 object-contain" />
                    </div>
                  ) : null}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseProductModal}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProduct}
                    className="px-4 py-2 bg-[#fea928] text-white rounded hover:bg-[#e09a24]"
                  >
                    <FaSave className="inline mr-2" />
                    {isEditMode ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Product View Modal */}
        {currentProduct && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Chi tiết sản phẩm</h3>
                <button onClick={() => setCurrentProduct(null)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img src={currentProduct.img} alt={currentProduct.title} className="w-full h-auto object-contain rounded" />
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-bold">{currentProduct.title}</h4>
                  <p className="text-gray-600">{currentProduct.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-100 p-2 rounded">
                      <span className="text-gray-500 text-sm">Loại:</span>
                      <p className="font-medium">{currentProduct.type}</p>
                    </div>
                    
                    <div className="bg-gray-100 p-2 rounded">
                      <span className="text-gray-500 text-sm">Giá:</span>
                      <p className="font-medium text-red-600">{currentProduct.price.toLocaleString()} VND</p>
                    </div>
                    
                    <div className="bg-gray-100 p-2 rounded">
                      <span className="text-gray-500 text-sm">Giảm giá:</span>
                      <p className="font-medium">{currentProduct.sale}%</p>
                    </div>
                    
                    <div className="bg-gray-100 p-2 rounded">
                      <span className="text-gray-500 text-sm">Đánh giá:</span>
                      <p className="font-medium">⭐ {currentProduct.rating}/5</p>
                    </div>
                    
                    <div className="bg-gray-100 p-2 rounded">
                      <span className="text-gray-500 text-sm">Đã bán:</span>
                      <p className="font-medium">{currentProduct.numOfPurchase} sản phẩm</p>
                    </div>
                    
                    <div className="bg-gray-100 p-2 rounded">
                      <span className="text-gray-500 text-sm">ID sản phẩm:</span>
                      <p className="font-medium">{currentProduct.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => {
                        setCurrentProduct(null);
                        handleEditProduct(currentProduct);
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      <FaEdit className="inline mr-2" />
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => {
                        setCurrentProduct(null);
                        handleDeleteProduct(currentProduct.id);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      <FaTrash className="inline mr-2" />
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* User Modal */}
        {showUserModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">{isUserEditMode ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</h3>
                <button onClick={handleCloseUserModal} className="text-gray-500 hover:text-gray-700">
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Họ tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={userForm.fullName}
                    onChange={handleUserFormChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Nhập họ tên"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userForm.email}
                    onChange={handleUserFormChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Nhập email"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Mật khẩu {isUserEditMode && '(để trống nếu không thay đổi)'}</label>
                  <input
                    type="password"
                    name="password"
                    value={userForm.password}
                    onChange={handleUserFormChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder={isUserEditMode ? "Nhập mật khẩu mới (nếu cần)" : "Nhập mật khẩu"}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Vai trò</label>
                  <select
                    name="role"
                    value={userForm.role}
                    onChange={handleUserFormChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="customer">Khách hàng</option>
                    <option value="admin">Quản trị viên</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseUserModal}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveUser}
                    className="px-4 py-2 bg-[#fea928] text-white rounded hover:bg-[#e09a24]"
                  >
                    <FaSave className="inline mr-2" />
                    {isUserEditMode ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Order Detail Modal */}
        {showOrderModal && currentOrderDetail && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full shadow-xl border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Chi tiết đơn hàng</h3>
                <button onClick={handleCloseOrderModal} className="text-gray-500 hover:text-gray-700">
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-3 rounded">
                    <span className="text-gray-500 text-sm">Mã đơn hàng:</span>
                    <p className="font-medium">{currentOrderDetail.id}</p>
                  </div>
                  
                  <div className="bg-gray-100 p-3 rounded">
                    <span className="text-gray-500 text-sm">Ngày đặt:</span>
                    <p className="font-medium">{currentOrderDetail.date}</p>
                  </div>
                  
                  <div className="bg-gray-100 p-3 rounded">
                    <span className="text-gray-500 text-sm">Tổng tiền:</span>
                    <p className="font-medium text-red-600">{currentOrderDetail.total.toLocaleString()} VND</p>
                  </div>
                  
                  <div className="bg-gray-100 p-3 rounded">
                    <span className="text-gray-500 text-sm">Trạng thái:</span>
                    <select
                      value={currentOrderDetail.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        setCurrentOrderDetail({...currentOrderDetail, status: newStatus});
                        handleUpdateOrderStatus(currentOrderDetail.id, newStatus);
                      }}
                      className="mt-1 block w-full p-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="Pending">Chờ xử lý</option>
                      <option value="Processing">Đang xử lý</option>
                      <option value="Shipped">Đã giao</option>
                      <option value="Completed">Hoàn thành</option>
                      <option value="Cancelled">Đã hủy</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-3">Thông tin sản phẩm</h4>
                  <div className="bg-gray-100 p-4 rounded">
                    <div className="grid grid-cols-5 text-sm font-medium text-gray-500 mb-2">
                      <div className="col-span-2">Sản phẩm</div>
                      <div>Đơn giá</div>
                      <div>Số lượng</div>
                      <div>Thành tiền</div>
                    </div>
                    <div className="py-3 border-t border-gray-200">
                      <div className="grid grid-cols-5 items-center">
                        <div className="col-span-2 font-medium">{currentOrderDetail.productName}</div>
                        <div>{currentOrderDetail.price.toLocaleString()} VND</div>
                        <div>{currentOrderDetail.quantity}</div>
                        <div className="font-medium">{(currentOrderDetail.price * currentOrderDetail.quantity).toLocaleString()} VND</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleCloseOrderModal}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Đóng
                  </button>
                  {currentOrderDetail.status !== 'Cancelled' && currentOrderDetail.status !== 'Completed' && (
                    <button
                      onClick={() => {
                        handleCancelOrder(currentOrderDetail.id);
                        handleCloseOrderModal();
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Hủy đơn hàng
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'stats' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Thống kê doanh thu</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                    <FaMoneyBillWave className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-gray-500">Tổng doanh thu</div>
                    <div className="text-2xl font-bold">
                      {products.reduce((total, product) => total + (product.price * product.numOfPurchase), 0).toLocaleString()} VND
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                    <FaShoppingCart className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-gray-500">Sản phẩm đã bán</div>
                    <div className="text-2xl font-bold">
                      {products.reduce((total, product) => total + product.numOfPurchase, 0)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
                    <FaUsers className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-gray-500">Tổng khách hàng</div>
                    <div className="text-2xl font-bold">{users.filter(u => u.role !== 'admin').length}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4">Báo cáo bán hàng theo thời gian</h3>
              <div className="w-full mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-700">Doanh thu theo ngày trong tuần</h4>
                </div>
                <div className="relative">
                  <div className="flex items-end h-64 mt-4 space-x-2">
                    {Object.entries(dailySales).map(([day, revenue]) => {
                      // Calculate the height based on revenue
                      const maxRevenue = Math.max(...Object.values(dailySales));
                      const heightPercentage = (revenue / maxRevenue) * 100;
                      return (
                        <div key={day} className="flex flex-col items-center flex-1">
                          <div 
                            className="w-full bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t hover:opacity-80 transition-all duration-200"
                            style={{ height: `${heightPercentage}%` }}
                          ></div>
                          <div className="text-xs font-medium mt-2">{day}</div>
                          <div className="text-xs text-gray-500">{(revenue / 1000000).toFixed(1)}M</div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Horizontal guidelines */}
                  <div className="absolute left-0 top-0 h-full w-full">
                    <div className="absolute border-b border-gray-200 w-full" style={{ top: '0%' }}></div>
                    <div className="absolute border-b border-gray-200 w-full" style={{ top: '25%' }}></div>
                    <div className="absolute border-b border-gray-200 w-full" style={{ top: '50%' }}></div>
                    <div className="absolute border-b border-gray-200 w-full" style={{ top: '75%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Tổng doanh thu tuần:</span> {Object.values(dailySales).reduce((sum, value) => sum + value, 0).toLocaleString()} VND
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Trung bình/ngày:</span> {(Object.values(dailySales).reduce((sum, value) => sum + value, 0) / Object.keys(dailySales).length).toLocaleString()} VND
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4">Sản phẩm bán chạy</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng lượng mua</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doanh thu</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.numOfPurchase}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {(product.price * product.numOfPurchase).toLocaleString()} VND
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 