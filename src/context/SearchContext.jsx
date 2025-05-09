import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Create context
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Load search term from localStorage on initial load
  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm');
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }
  }, []);

  // Update search term when URL changes (handle browser back/forward)
  useEffect(() => {
    // Skip processing for admin routes
    if (location.pathname.startsWith('/admin')) {
      return;
    }
    
    if (location.pathname === '/product') {
      const queryParams = new URLSearchParams(location.search);
      const searchFromQuery = queryParams.get('search');
      
      if (searchFromQuery) {
        setSearchTerm(searchFromQuery);
        localStorage.setItem('searchTerm', searchFromQuery);
      } else if (location.search === '') {
        // Clear search when on product page without query
        setSearchTerm('');
        localStorage.removeItem('searchTerm');
      }
    }
  }, [location]);

  // Function to update search term and navigate
  const performSearch = (term) => {
    // Skip search functionality for admin routes
    if (location.pathname.startsWith('/admin')) {
      return;
    }
    
    const trimmedTerm = term.trim().toLowerCase();
    setSearchTerm(trimmedTerm);
    
    if (trimmedTerm) {
      localStorage.setItem('searchTerm', trimmedTerm);
      navigate(`/product?search=${encodeURIComponent(trimmedTerm)}`);
    } else {
      clearSearch();
    }
  };

  // Function to clear search
  const clearSearch = () => {
    // Skip for admin routes
    if (location.pathname.startsWith('/admin')) {
      return;
    }
    
    setSearchTerm('');
    localStorage.removeItem('searchTerm');
    
    // Only navigate if we're on the product page
    if (location.pathname === '/product') {
      navigate('/product', { replace: true });
    }
  };

  // Context value
  const value = {
    searchTerm,
    setSearchTerm,
    performSearch,
    clearSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook for easier context usage
export const useSearch = () => useContext(SearchContext);

export default SearchContext; 