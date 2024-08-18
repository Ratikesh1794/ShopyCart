import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/Context';
import { Link } from 'react-router-dom';
import LoginPrompt from './LoginPrompt'; // Import the LoginPrompt component

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, updateCartItem, user } = useContext(AppContext);
  const [quantity, setQuantity] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const cartItem = cartItems.find(item => item.id === product.id);
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [cartItems, product.id]);

  const handleAddToCart = () => {
    if (user) {
      addToCart(product);
    } else {
      setShowLoginPrompt(true);
    }
  };

  const handleIncrement = () => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + 1;
      updateCartItem(product, newQuantity);
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => {
        const newQuantity = prevQuantity - 1;
        updateCartItem(product, newQuantity);
        return newQuantity;
      });
    } else {
      setQuantity(0);
      updateCartItem(product, 0);  // Optionally remove the item from the cart
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg flex flex-col">
      <div className="flex-shrink-0 w-full h-40 relative overflow-hidden">
        <img 
          src={process.env.PUBLIC_URL + product.image} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-scale-down" 
        />
      </div>
      <div className="mt-4 flex-grow">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2">₹{product.price.toFixed(2)}</p>
        {quantity === 0 ? (
          <button 
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center">
            <button 
              onClick={handleDecrement}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">
              -
            </button>
            <span className="mx-2">{quantity}</span>
            <button 
              onClick={handleIncrement}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">
              +
            </button>
            <Link to="/cart" className="ml-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() => window.scrollTo(0, 0)} // Optional: Scroll to top when navigating
              >
                Go to Cart
              </button>
            </Link>
          </div>
        )}
      </div>
      {showLoginPrompt && <LoginPrompt onClose={() => setShowLoginPrompt(false)} />}
    </div>
  );
};

export default ProductCard;
