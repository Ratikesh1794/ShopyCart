import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/Context';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { user, fetchUserOrders } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user && fetchUserOrders) {
      fetchUserOrders(user.email).then(fetchedOrders => setOrders(fetchedOrders))
        .catch(error => console.error('Error fetching orders:', error));
    }
  }, [user, fetchUserOrders]); // Include fetchUserOrders in dependency array

  if (!user) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold">You are not logged in</h2>
        <p className="mt-2 text-gray-600">Please log in to view your profile and orders.</p>
        <Link to="/login" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">User Profile</h2>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Personal Details</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {/* Add other user details here */}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">My Orders</h3>
        {orders.length > 0 ? (
          <ul>
            {orders.map(order => (
              <li key={order.id} className="border-b py-2">
                Order #{order.id} - {order.date} - ${order.total}
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
