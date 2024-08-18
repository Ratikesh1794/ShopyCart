import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal is open by default
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);

  const handleLogin = () => {
    fetch('/data/users.json')  // Updated path
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(users => {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          setUser(user); // Update context with the logged-in user
          navigate('/');
        } else {
          setError('Invalid email or password');
        }
      })
      .catch(() => setError('An error occurred while logging in.'));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Email"
        className="border p-2 mb-4 w-64 rounded-full"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-4 w-64 rounded-full"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <a href="ForgetPassword" className="text-blue-500 hover:text-blue-900">Forgot Password?</a><br />
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-full"
      >
        Login
      </button><br />
      <div className="flex items-center gap-1">
        <p>Don't have an account?</p>
        <a href="Signup" className="text-blue-500 hover:text-blue-900">Register</a>
      </div>

      {/* Modal for Admin Login Details */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h3 className="text-lg font-semibold mb-4">Admin Login Details</h3>
            <p>Email: <strong>admin@gmail.com</strong></p>
            <p>Password: <strong>admin</strong></p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
