import React, { useContext, useState } from 'react';
import { AppContext } from '../context/Context';

const Cart = () => {
  const { cartItems, updateCartItem, removeCartItem } = useContext(AppContext);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discount, setDiscount] = useState(0); // 0 for no discount, 100 for fixed discount, 10 for percentage

  // List of predefined coupons
  const coupons = [
    { code: 'SHOPY100', description: '₹100 off' },
    { code: 'HAPPY10', description: '10% off' },
  ];

  // Calculate total price and apply discount
  const totalPriceBeforeDiscount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalPriceAfterDiscount = totalPriceBeforeDiscount - (discount > 0 ? (discount === 100 ? 100 : (totalPriceBeforeDiscount * discount) / 100) : 0);

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

  const handleApplyCoupon = () => {
    if (couponCode === 'SHOPY100') {
      setDiscount(100); // Fixed discount
      setAppliedCoupon('SHOPY100');
    } else if (couponCode === 'HAPPY10') {
      setDiscount(10); // 10% discount
      setAppliedCoupon('HAPPY10');
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleSelectCoupon = (code) => {
    setCouponCode(code);
    handleApplyCoupon();
  };

  const handleCheckout = () => {
    // Handle checkout process here, e.g., redirect to payment page
    alert('Proceeding to checkout');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="py-4 flex items-center space-x-4">
                <img
                  src={process.env.PUBLIC_URL + item.image} // Ensure your image path is correct
                  alt={item.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">{item.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
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
                      <button
                        onClick={() => handleRemove(item)}
                        className="bg-red-500 text-white px-2 py-1 rounded ml-2 hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-end">
            <p className="text-xl font-semibold">Total: ₹{totalPriceBeforeDiscount.toFixed(2)}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Apply Coupon</h2>
            <div className="flex flex-col gap-2 mb-4">
              <div className="relative">
                <select
                  value={couponCode}
                  onChange={(e) => handleSelectCoupon(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-md flex-1"
                >
                  <option value="">Select a coupon</option>
                  {coupons.map((coupon) => (
                    <option key={coupon.code} value={coupon.code}>
                      {coupon.description}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Or enter coupon code"
                  value={couponCode}
                  onChange={handleCouponChange}
                  className="border border-gray-300 px-3 py-2 rounded-md flex-1"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Apply
                </button>
              </div>
            </div>
            {appliedCoupon && (
              <p className="text-green-500 mb-4">Coupon applied: {appliedCoupon}</p>
            )}
            <p className="text-xl font-semibold">Total after discount: ₹{totalPriceAfterDiscount.toFixed(2)}</p>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Proceed for Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
