import React from 'react';

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
      <input type="text" placeholder="Name" className="border p-2 mb-4 w-64 rounded-full" />
      <input type="email" placeholder="Email" className="border p-2 mb-4 w-64 rounded-full" />
      <input type="password" placeholder="Password" className="border p-2 mb-4 w-64 rounded-full" />
      <button className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-full">Sign Up</button><br />
      <div className="flex items-center gap-1">
        <p>
        Already have an account?
        </p>
        <a href="login" className="text-blue-500 hover:text-blue-900">Login</a>
      </div> 
    </div>
  );
};

export default Signup;
