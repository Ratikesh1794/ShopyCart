import React, { useState, useContext } from 'react';
import Logo from './Logo';
import { GrSearch } from 'react-icons/gr';
import { BiUserCircle } from 'react-icons/bi';
import { PiShoppingBagFill } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Context';
import CartSidebar from './CartSidebar';
import LoginPrompt from './LoginPrompt';

const Header = () => {
  const { cartItems, user, logout } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Toggle cart sidebar visibility
  const toggleSidebar = () => {
    if (!user) {
      setShowLoginPrompt(true); // Show login prompt if not logged in
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      navigate('/'); // Redirect to homepage if search query is blank
    } else {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <header className='h-16 shadow-md bg-white'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
          <div className='cursor-pointer'>
            <Link to="/">
              <Logo w={90} h={50} />
            </Link>
          </div>

          <form
            onSubmit={handleSearch}
            className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md'
          >
            <input
              type='text'
              placeholder='Search your product...'
              className='w-full outline-none pl-2 rounded-xl'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type='submit'
              className='text-lg w-[50px] h-8 bg-blue-700 hover:bg-blue-900 flex items-center justify-center rounded-r-full text-white cursor-pointer'
            >
              <GrSearch />
            </button>
          </form>

          <div className='flex items-center gap-6 relative'>
            <div
              className='text-4xl cursor-pointer text-blue-700 hover:text-blue-900 relative'
              onClick={toggleDropdown}
            >
              <BiUserCircle />
              {dropdownOpen && user && (
                <div className='absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-md z-50'>
                  <div className='flex items-center p-4 border-b border-gray-200'>
                    <BiUserCircle className='text-4xl text-blue-700' />
                    <div className='ml-4'>
                      <p className='text-lg font-semibold text-gray-800'>{user.name}</p>
                      <p className='text-sm text-gray-600'>{user.email}</p>
                    </div>
                  </div>
                  <div className='py-2'>
                    <button
                      onClick={handleLogout}
                      className='block w-full px-4 py-2 text-red-600 hover:bg-gray-100 text-sm text-left'
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className='text-3xl cursor-pointer text-blue-700 hover:text-blue-900 relative'>
              <span onClick={toggleSidebar}>
                <PiShoppingBagFill />
                {totalItems > 0 && (
                  <div className='bg-orange-500 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-2 text-xs'>
                    {totalItems}
                  </div>
                )}
              </span>
            </div>

            <div>
              {!user ? (
                <Link
                  to="/login"
                  className='bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-900 hover:shadow-md text-sm'
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className='bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 text-sm'
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Render CartSidebar */}
        {isSidebarOpen && <CartSidebar toggleSidebar={() => setIsSidebarOpen(false)} />}
      </header>

      {/* Render LoginPrompt */}
      {showLoginPrompt && <LoginPrompt onClose={() => setShowLoginPrompt(false)} />}
    </>
  );
};

export default Header;
