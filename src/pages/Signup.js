import React from 'react';

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
      <input type="text" placeholder="Name" className="border p-2 mb-4 w-64" />
      <input type="email" placeholder="Email" className="border p-2 mb-4 w-64" />
      <input type="password" placeholder="Password" className="border p-2 mb-4 w-64" />
      <button className="bg-blue-500 text-white px-4 py-2">Sign Up</button>
    </div>
  );
};

export default Signup;
