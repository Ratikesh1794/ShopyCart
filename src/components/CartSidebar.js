import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/Context';

const CartSidebar = ({ toggleSidebar }) => {
  const { cartItems, updateCartItem, removeCartItem } = useContext(AppContext);

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleIncrement = (item) => {
    updateCartItem(item, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateCartItem(item, item.quantity - 1);
    } else {
      // Optionally remove item from cart if quantity is zero
      updateCartItem(item, 0);
    }
  };

  const handleRemove = (item) => {
    removeCartItem(item); // Call the function to remove the item
  };

  return (
    <div className="fixed right-0 top-0 h-full w-1/4 bg-white shadow-lg p-4 z-50 flex flex-col">
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
      <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
      <ul className="flex-1 overflow-y-auto divide-y divide-gray-200">
        {cartItems.map((item) => (
          <li key={item.id} className="py-2 flex items-start space-x-4">
            <img
              src={process.env.PUBLIC_URL + item.image} // Ensure your image path is correct
              alt={item.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <button
                      onClick={() => handleDecrement(item)}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item)}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-sm text-right">
                  <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => handleRemove(item)}
                    className="bg-red-500 text-white px-2 py-1 rounded mt-2 hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col w-full">
        <p className="font-semibold text-right">Total: ₹{totalPrice.toFixed(2)}</p>
        <Link to="/cart">
          <button
            onClick={toggleSidebar}
            className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartSidebar;
