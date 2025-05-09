import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

// Create a context for notifications
export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = 'success', duration = 3000) => {
    setNotification({ message, type });
    
    // Auto-hide notification after duration
    const timer = setTimeout(() => {
      setNotification(null);
    }, duration);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
      {notification && (
        <div className={`fixed top-20 right-4 p-4 rounded-lg shadow-lg z-50 ${
          notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' :
          notification.type === 'error' ? 'bg-red-100 border-l-4 border-red-500 text-red-700' :
          'bg-blue-100 border-l-4 border-blue-500 text-blue-700'
        }`}>
          <p>{notification.message}</p>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

// Main Cart Context
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  // Add a forceUpdate state to trigger re-renders when needed
  const [forceUpdate, setForceUpdate] = useState(0);
  const notificationContext = useContext(NotificationContext);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error parsing cart data from localStorage:', error);
        setCartItems([]);
      }
    }
    setLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      // Force update to ensure all components re-render
      setForceUpdate(prev => prev + 1);
    }
  }, [cartItems, loading]);

  // Add item to cart - Using useCallback to avoid recreation on each render
  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      let newItems;
      if (existingItemIndex !== -1) {
        // If item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        newItems = updatedItems;
      } else {
        // If item doesn't exist, add new item
        newItems = [...prevItems, { ...product, quantity }];
      }
      
      // Show notification after state update, not during render
      if (notificationContext && notificationContext.showNotification) {
        setTimeout(() => {
          notificationContext.showNotification(`${product.title} đã được thêm vào giỏ hàng!`, 'success', 3000);
        }, 0);
      }
      
      return newItems;
    });
  }, [notificationContext]);

  // Remove item from cart
  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId);
      return newItems;
    });
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Get cart item count
  const getCartCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0) || 0;
  }, [cartItems]);

  // Calculate cart total
  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  // Check if product is in cart
  const isInCart = useCallback((productId) => {
    return cartItems.some(item => item.id === productId);
  }, [cartItems]);

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
    isInCart,
    forceUpdate,  // Make forceUpdate available to consuming components
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext; 