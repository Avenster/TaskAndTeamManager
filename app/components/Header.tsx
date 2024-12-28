import React, { useState, useEffect } from 'react';
import { 
  Search, Github, Sun, Bell, Menu, X, User,
  Plus, Calendar, BarChart2, Settings
} from 'lucide-react';
import { Link, useNavigate, useLocation } from '@remix-run/react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/auth');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Calendar', path: '/calendar' },
    { name: 'Analytics', path: '/analytics' },
  ];

  return (
    <header className="w-full max-w-7xl bg-black border-b border-l border-r border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <svg
                  className="relative w-8 h-8 text-cyan-500 transform group-hover:scale-110 transition duration-200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3.5 5.5L5 7l2.5-2.5m3.5 0L5 10.5m8-5.5L7 11m7.5-5.5L9 11m7.5-5.5L11 11m7.5-5.5L13 11" />
                </svg>
              </div>
              <span className="ml-2 text-white font-bold text-lg">TaskFlow</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-white bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                className="px-3 py-1.5 text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:opacity-90 transition-opacity flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                New Task
              </button>
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-white/5 rounded-lg px-3 py-1.5 border border-white/10">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="bg-transparent border-none text-gray-300 focus:outline-none focus:ring-0 pl-2 pr-4 w-48 text-sm"
              />
              <span className="text-gray-500 text-sm">⌘K</span>
            </div>

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full"></span>
                </button>

                {/* Theme Toggle */}
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Sun className="w-5 h-5" />
                </button>

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-medium">
                      {user?.username?.[0]?.toUpperCase()}
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-black border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-sm text-white font-medium">{user?.username}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5">
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              {showMobileMenu ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm ${
                    location.pathname === link.path
                      ? 'text-white bg-gradient-to-r from-cyan-500/10 to-blue-500/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;