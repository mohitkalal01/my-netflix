import { useState, useEffect, useContext, useCallback, ChangeEvent } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import { UserCircleIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { debounce } from 'lodash';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      } else {
        navigate('/');
      }
    }, 300),
    [navigate]
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'TV Shows', path: '/tv-shows' },
    { name: 'Movies', path: '/movies' },
    ...(user ? [{ name: 'My List', path: '/my-list' }] : []),
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-brand-black' : 'bg-gradient-to-b from-black/80 to-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4 md:space-x-8">
              <Link to="/" className="flex-shrink-0">
                <h1 className="text-xl md:text-2xl font-bold text-brand-red">MY-NETFLIX</h1>
              </Link>

              {/* Desktop Nav Links - Hidden on mobile */}
              <div className="hidden lg:flex items-center space-x-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors hover:text-brand-light ${isActive ? 'text-brand-light' : 'text-brand-gray'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right Side - Search & Profile */}
            <div className="flex items-center space-x-3 md:space-x-4">
              {/* Search - Hidden on mobile (use bottom nav search) */}
              <div className="hidden md:block relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-full bg-gray-800/80 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:bg-gray-800 transition-all duration-300 w-40 lg:w-48"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>

              {/* User Menu */}
              {user ? (
                <div className="relative group">
                  <Link to="/profile" className="touch-target flex items-center justify-center">
                    <UserCircleIcon className="h-7 w-7 md:h-8 md:w-8 text-brand-light group-hover:text-brand-red transition-colors" />
                  </Link>
                  {/* Desktop Dropdown */}
                  <div className="hidden md:block absolute top-full right-0 mt-2 w-48 bg-brand-dark rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
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
                  className="bg-brand-red text-white px-3 py-1.5 md:px-4 md:py-2 rounded text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* Mobile Menu Button - Tablet only */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hidden sm:block md:hidden touch-target"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6 text-white" />
                ) : (
                  <Bars3Icon className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Menu Dropdown */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-brand-black border-t border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 text-base font-medium ${isActive ? 'text-brand-light' : 'text-brand-gray'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              {user && (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center py-2 text-base font-medium text-brand-gray"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
};

export default Navbar;