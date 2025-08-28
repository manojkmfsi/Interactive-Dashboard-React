import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="bg-gray-800 dark:bg-gray-950 shadow-lg p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <div className="flex items-center space-x-2">
          <a href="/" className="text-white text-2xl font-bold rounded-lg px-3 py-1 shadow-md">Pokemon Site</a>
        </div>

        {/* Desktop Navigation Links - Visible on medium screens and larger */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" onClick={() => navigate('/')} className="text-white transform hover:scale-105 transition-transform duration-200">Home</a>
          <a href="#" onClick={() => navigate('/favorites')} className="text-white transform hover:scale-105 transition-transform duration-200">Favorites</a>
          <a href="#" onClick={() => navigate('/dashboard')} className="text-white transform hover:scale-105 transition-transform duration-200">Dashboard</a>
          <a href="#" onClick={() => navigate('/about')} className="text-white transform hover:scale-105 transition-transform duration-200">About</a>

        </div>

        {/* Mobile Menu Toggle Button - Visible only on small screens */}
        <button
          className="md:hidden text-gray-200 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-4 6h4"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown - Conditionally rendered with a class based on state */}
      <div className={`md:hidden ${isMenuOpen ? '' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-2 mt-2">
          <a href="#" onClick={() => navigate('/')} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors duration-200">Home</a>
          <a href="#" onClick={() => navigate('/favorites')} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors duration-200">Favorites</a>
          <a href="#" onClick={() => navigate('/dashboard')} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors duration-200">Dashboard</a>
          <a href="#" onClick={() => navigate('/about')} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors duration-200">About</a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
