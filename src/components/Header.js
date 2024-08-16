import React from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { BiUserCircle } from "react-icons/bi";
import { PiShoppingBagFill } from "react-icons/pi";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='h-full container mx-auto flex items-center px-2 justify-between'>
        <div className=' cursor-pointer'>
        <Link to="/">
          <Logo w={90} h={50} />
        </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md'>
          <input type='text' placeholder='Search your product...' className='w-full outline-none pl-2 rounded-xl' />
          <div className='text-lg w-[50px] h-8 bg-blue-700 hover:bg-blue-900 flex items-center justify-center  rounded-r-full text-white cursor-pointer'>
            <GrSearch />
          </div>
        </div>

        <div className='flex items-center gap-5'>

          <div className='text-4xl cursor-pointer  text-blue-700  hover:text-blue-900'>
            <BiUserCircle />
          </div>
          <Link to="CartItem">
          <div className='text-3xl cursor-pointer  text-blue-700  hover:text-blue-900 relative'>
            <span>
              <PiShoppingBagFill />
              <div className='bg-orange-500 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-1.5 -right-2'>
                <p className='text-xs'>0</p>
              </div>
            </span>
          </div>
          </Link>

          <div>
            <a href='login' className='bg-blue-700 text-white px-3 py-2 rounded-full hover:bg-blue-900 hover:shadow-md'>Login</a>
            {/* <button className='bg-blue-700 text-white px-3 py-2 rounded-full hover:bg-blue-900 hover:shadow-md'>Login</button> */}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
