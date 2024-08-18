import React from 'react';

const CartItem = ({ item, removeItem, updateCartItem }) => {
  const handleIncrement = () => {
    updateCartItem(item, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateCartItem(item, item.quantity - 1);
    } else {
      removeItem(item);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg flex justify-between items-center mb-4">
      <div className="flex items-center">
        <img
          src={process.env.PUBLIC_URL + item.image}
          alt={item.name}
          className="w-16 h-16 object-scale-down mr-4"
        />
        <div>
          <h2 className="text-lg font-bold">{item.name}</h2>
          <p className="text-gray-700">₹{(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button 
          onClick={handleDecrement}
          className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">
          -
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button 
          onClick={handleIncrement}
          className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
