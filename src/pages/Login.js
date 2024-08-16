import React from 'react';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Login</h2>
      <input type="text" placeholder="Email" className="border p-2 mb-4 w-64 rounded-full" />
      <div>
        <input type="password" placeholder="Password" className="border p-2 mb-4 w-64 rounded-full" />
      </div>
      <a href="forgetpassword" className="text-blue-500 hover:text-blue-900">Forgot Password?</a><br />
      <button className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-full">Login</button><br />
      <div className="flex items-center gap-1">
        <p>
          Don't have an account?
        </p>
        <a href="Signup" className="text-blue-500 hover:text-blue-900">
          Register
        </a>
      </div>
    </div>
  );
};

export default Login;
