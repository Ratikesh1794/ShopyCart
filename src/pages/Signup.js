import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    // Fetch user data from JSON file
    fetch('/data/users.json')
      .then(response => response.json())
      .then(users => {
        if (users.some(user => user.email === email)) {
          setError('Email already exists');
        } else {
          const newUser = { name, email, password };
          users.push(newUser);

          // Save the updated users list to JSON file (for demo purposes)
          // In a real-world app, this would be handled by a backend server
          fetch('/data/users.json', {
            method: 'POST', // This will not work without a backend
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(users)
          })
            .then(() => {
              localStorage.setItem('loggedInUser', JSON.stringify(newUser));
              navigate('/login'); // Redirect to login page
            })
            .catch(err => {
              console.error('Error updating users.json:', err);
              setError('An error occurred. Please try again.');
            });
        }
      })
      .catch(err => {
        console.error('Error fetching users.json:', err);
        setError('An error occurred. Please try again.');
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        className="border p-2 mb-4 w-64 rounded-full"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
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
      <button
        onClick={handleSignup}
        className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-full"
      >
        Sign Up
      </button>
      <br />
      <div className="flex items-center gap-1">
        <p>Already have an account?</p>
        <a href="/login" className="text-blue-500 hover:text-blue-900">Login</a>
      </div>
    </div>
  );
};

export default Signup;
