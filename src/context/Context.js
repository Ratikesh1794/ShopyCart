import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AppContext = createContext();

const Context = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(storedUser);
    
    if (storedUser) {
      fetch('/data/cart.json') // Change this to your actual path
        .then(response => response.json())
        .then(cart => {
          setCartItems(cart.filter(item => item.userEmail === storedUser.email));
        });
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetch('/data/cart.json') // Change this to your actual path
        .then(response => response.json())
        .then(cart => {
          const updatedCart = cart.filter(item => item.userEmail === user.email);
          setCartItems(updatedCart);
        });
    }
  }, [user]);

  const addToCart = (product) => {
    if (!user) {
      alert('Please log in first!');
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newItem = { ...product, quantity: 1, userEmail: user.email };
        return [...prevItems, newItem];
      }
    });

    // Save to JSON file (use a backend service in real applications)
    fetch('/data/cart.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItems)
    });
  };

  const updateCartItem = (product, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === product.id
          ? { ...item, quantity }
          : item
      ).filter(item => item.quantity > 0)
    );

    // Save to JSON file (use a backend service in real applications)
    fetch('/data/cart.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItems)
    });
  };

  const removeCartItem = (product) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== product.id)
    );

    // Save to JSON file (use a backend service in real applications)
    fetch('/data/cart.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItems)
    });
  };

  const fetchUserOrders = (userEmail) => {
    return fetch('/data/orders.json') // Change this to your actual path
      .then(response => response.json())
      .then(orders => orders.filter(order => order.userEmail === userEmail));
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    setCartItems([]);
  };

  return (
    <AppContext.Provider value={{ cartItems, addToCart, updateCartItem, removeCartItem, user, setUser, fetchUserOrders, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export default Context;
