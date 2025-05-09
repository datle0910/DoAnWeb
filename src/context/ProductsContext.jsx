import React, { createContext, useState, useEffect, useContext } from 'react';
import defaultProductsData from '../components/Producs/productsData';

// Create context
export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to ensure images are properly handled
  const ensureImageIntegrity = (productData) => {
    return productData.map(product => {
      // If the image is already a base64 string (from admin upload), keep it as is
      if (typeof product.img === 'string' && product.img.startsWith('data:image')) {
        return product;
      }
      
      // If the image is a string that isn't a data URL (from imports), it may not work on Vercel
      // In that case, ensure we have a proper URL or fallback
      if (typeof product.img === 'object' || typeof product.img === 'undefined') {
        // Provide a fallback image for safety
        return {
          ...product,
          img: 'https://placehold.jp/300x200.png?text=Product+Image'
        };
      }
      
      return product;
    });
  };

  // Load products from localStorage or use default data on initial render
  useEffect(() => {
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        setProducts(ensureImageIntegrity(parsedProducts));
      } catch (error) {
        console.error('Error parsing products data from localStorage:', error);
        setProducts(ensureImageIntegrity(defaultProductsData));
      }
    } else {
      // If no products in localStorage, use the default data
      const processedProducts = ensureImageIntegrity(defaultProductsData);
      setProducts(processedProducts);
      // Initialize localStorage with default data
      localStorage.setItem('adminProducts', JSON.stringify(processedProducts));
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