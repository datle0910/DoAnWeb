import React, { createContext, useState, useEffect, useContext } from 'react';
import defaultProductsData from '../components/Producs/productsData';

// Create context
export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products from localStorage or use default data on initial render
  useEffect(() => {
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (error) {
        console.error('Error parsing products data from localStorage:', error);
        setProducts(defaultProductsData);
      }
    } else {
      // If no products in localStorage, use the default data
      setProducts(defaultProductsData);
      // Initialize localStorage with default data
      localStorage.setItem('adminProducts', JSON.stringify(defaultProductsData));
    }
    setLoading(false);
  }, []);

  // Add a new product
  const addProduct = (product) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    return product;
  };

  // Update an existing product
  const updateProduct = (updatedProduct) => {
    const updatedProducts = products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    return updatedProduct;
  };

  // Delete a product
  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    return productId;
  };

  // Get a product by ID
  const getProductById = (id) => {
    return products.find(p => p.id === id) || null;
  };

  // Get all products
  const getAllProducts = () => {
    return products;
  };

  // Filter products by criteria
  const filterProducts = (criteria) => {
    let filteredProducts = [...products];
    
    if (criteria.searchTerm) {
      const searchLower = criteria.searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.title.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower) ||
        p.type.toLowerCase().includes(searchLower)
      );
    }
    
    if (criteria.type) {
      filteredProducts = filteredProducts.filter(p => p.type === criteria.type);
    }
    
    if (criteria.minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= criteria.minPrice);
    }
    
    if (criteria.maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= criteria.maxPrice);
    }
    
    if (criteria.minRating) {
      filteredProducts = filteredProducts.filter(p => p.rating >= criteria.minRating);
    }
    
    if (criteria.sale) {
      filteredProducts = filteredProducts.filter(p => p.sale > 0);
    }
    
    return filteredProducts;
  };

  // Context value
  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProducts,
    filterProducts
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook for easier context usage
export const useProducts = () => useContext(ProductsContext);

export default ProductsContext; 