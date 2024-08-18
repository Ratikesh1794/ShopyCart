import React, { useState } from 'react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = () => {
    // Implement password reset logic here
    setMessage('Password reset link has been sent to your email.');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Forgot Password</h2>
      <input
        type="text"
        placeholder="Email"
        className="border p-2 mb-4 w-64 rounded-full"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button
        onClick={handlePasswordReset}
        className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-full"
      >
        Reset Password
      </button>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default ForgetPassword;
