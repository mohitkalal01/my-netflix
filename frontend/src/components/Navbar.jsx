import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import { UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { debounce } from 'lodash'; // Will be used for debouncing

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      } else {
        navigate('/'); // Navigate to home if search query is empty
      }
    }, 300),
    [navigate]
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'TV Shows', path: '/tv-shows' },
    { name: 'Movies', path: '/movies' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-brand-black' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-8">
            <Link to="/">
              <h1 className="text-2xl font-bold text-brand-red">MY-NETFLIX</h1>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-brand-light ${
                      isActive ? 'text-brand-light' : 'text-brand-gray'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-300 w-32 md:w-48"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {user ? (
              <div className="relative group">
                <Link to="/profile">
                  <UserCircleIcon className="h-8 w-8 text-brand-light group-hover:text-brand-red transition-colors" />
                </Link>
                <div className="absolute top-full right-0 mt-2 w-48 bg-brand-dark rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-brand-light hover:bg-brand-gray/20"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-brand-light hover:bg-brand-gray/20"
                  >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-brand-red text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;