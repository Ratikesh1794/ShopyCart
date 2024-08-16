import React, { useState } from 'react';

const ProductCard = ({ product, addToCart, updateCartItem, cartItems }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    setQuantity(1);
    addToCart(product);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    updateCartItem(product, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateCartItem(product, quantity - 1);
    } else {
      setQuantity(0);
      updateCartItem(product, 0);  // You might want to remove the item from the cart here
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

