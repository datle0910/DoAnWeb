import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import { useProducts } from '../../context/ProductsContext';

function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { products, loading, filterProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { searchTerm, performSearch, clearSearch } = useSearch();
  const [searchInput, setSearchInput] = useState('');

  const [filter, setFilter] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    sale: false,
  });

  // Sync searchInput with searchTerm from context
  useEffect(() => {
    setSearchInput(searchTerm);
  }, [searchTerm]);

  // Apply filters and search when dependencies change
  useEffect(() => {
    if (!loading) {
      const criteria = { 
        ...filter, 
        searchTerm 
      };
      setFilteredProducts(filterProducts(criteria));
    }
  }, [loading, filter, searchTerm, filterProducts]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const applySearch = () => {
    performSearch(searchInput);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applySearch();
    }
  };

  const handleClearSearch = () => {
    clearSearch();
    setSearchInput('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Tất cả sản phẩm</h1>

      {/* Search bar for product page */}
      <div className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            onKeyDown={handleSearchSubmit}
            placeholder="Tìm kiếm sản phẩm..."
            className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button 
            onClick={applySearch}
            className="bg-yellow-500 text-white px-4 py-2 rounded-r hover:bg-yellow-600"
          >
            Tìm
          </button>
          {searchTerm && (
            <button 
              onClick={handleClearSearch}
              className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Xóa
            </button>
          )}
        </div>
        {searchTerm && (
          <div className="mt-2 text-sm text-gray-600">
            Kết quả tìm kiếm cho: <span className="font-medium">"{searchTerm}"</span>
          </div>
        )}
      </div>

      {/* Lọc nâng cao */}
      <div className="mb-6 p-4 bg-gray-100 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-4">Lọc sản phẩm</h2>
        <div className="grid grid-cols-2 gap-4">
          <select name="type" value={filter.type} onChange={handleFilterChange} className="border p-2 rounded">
            <option value="">Tất cả loại</option>
            <option value="Bánh Mì">Bánh Mì</option>
            <option value="Bánh Kem">Bánh Kem</option>
            <option value="Bánh Ngọt">Bánh Ngọt</option>
            <option value="Bánh Quy">Bánh Quy</option>
            <option value="Bánh Chay">Bánh Chay</option>
          </select>

          <input type="number" name="minPrice" value={filter.minPrice} onChange={handleFilterChange} placeholder="Giá tối thiểu" className="border p-2 rounded" />

          <input type="number" name="maxPrice" value={filter.maxPrice} onChange={handleFilterChange} placeholder="Giá tối đa" className="border p-2 rounded" />

          <input type="number" name="minRating" value={filter.minRating} onChange={handleFilterChange} placeholder="Đánh giá tối thiểu" className="border p-2 rounded" step="0.1" min="0" max="5" />

          <label className="flex items-center col-span-2 gap-2">
            <input type="checkbox" name="sale" checked={filter.sale} onChange={handleFilterChange} />
            Chỉ sản phẩm đang giảm giá
          </label>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="p-4 bg-white shadow rounded-md hover:shadow-lg transition-all cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.img} alt={product.title} className="w-full h-48 object-cover rounded-md mb-2" />
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-red-600">{product.price.toLocaleString()} VND</span>
                {product.sale > 0 && <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">-{product.sale}%</span>}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-600">⭐ {product.rating}/5</span>
                <span className="text-sm text-gray-600">Đã bán: {product.numOfPurchase}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Không tìm thấy sản phẩm phù hợp.</p>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
