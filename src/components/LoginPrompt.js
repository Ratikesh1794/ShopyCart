import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa'; // Import an icon for added visual appeal

const LoginPrompt = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-transform scale-95 hover:scale-100">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full shadow-lg">
            <FaLock className="text-blue-500 text-4xl" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Login Required</h2>
        <p className="text-gray-600 mb-6">
          Please log in to add items to your cart and enjoy a personalized shopping experience.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/login">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Log In
            </button>
          </Link>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;
