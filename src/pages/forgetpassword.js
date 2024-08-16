import React from 'react'


const forgetpassword = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Forget Password</h2>
      <input type="email" placeholder="Email" className="border p-2 mb-4 w-64 rounded-full" />
      <button className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-full">Submit</button><br />
      <div className="flex items-center gap-1">
        <p>
          Remember your password?
        </p>
        <a href="login" className="text-blue-500 hover:text-blue-900">Login</a>
      </div>
    </div>
  )
}

export default forgetpassword