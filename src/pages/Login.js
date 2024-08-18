import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);

  const handleLogin = () => {
    // Fetch user data from JSON file
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
    </div>
  );
};

export default Login;
