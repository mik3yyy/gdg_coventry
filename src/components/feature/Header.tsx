

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const { user, signOut, currentView, switchView } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showViewSwitcher, setShowViewSwitcher] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
      setIsMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleViewSwitch = (view: 'admin' | 'member') => {
    switchView(view);
    setShowViewSwitcher(false);

    if (view === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  // Check if user has permission to access current admin section
  const hasPermissionForCurrentSection = () => {
    if (!user || user.role !== "admin") return false
    console.log("Checking permissions for user:", user.permissions)
    const path = location.pathname
    if (path.includes("/admin/organizers")) {
      return user.permissions?.includes("all") || user.admin_type === "lead"
    }
    if (path.includes("/admin/events")) {
      return user.permissions?.includes("events") || user.permissions?.includes("all")
    }
    if (path.includes("/admin/projects")) {
      return user.permissions?.includes("projects") || user.permissions?.includes("all")
    }
    if (path.includes("/admin/resources")) {
      return user.permissions?.includes("resources") || user.permissions?.includes("all")
    }

    return true // fallback for general admin access
  }

  // Redirect if user doesn't have permission
  if (location.pathname.startsWith('/admin') && !hasPermissionForCurrentSection()) {
    navigate('/dashboard');
    return null;
  }

  const navigation = [
    { name: 'Home', href: '/' },
    // { name: 'Events', href: '/events' },
    { name: 'Projects', href: '/projects' },
    { name: 'Community', href: '/community' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];
  const logoCertificatePath = '/main_logo.png';  // The path starts from the root of the public folder

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 bg-[#4285F4] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div> */}
            <img src={logoCertificatePath} alt="Logo" className="w-7 h-7 object-contain" />

            <span className="text-xl font-bold text-gray-900">GDG Coventry</span>
          </Link>

          {/* Desktop Navigation - Always show */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* View Switcher for Admins */}
                {user?.role === 'admin' && (
                  <div className="relative">
                    <button
                      onClick={() => setShowViewSwitcher(!showViewSwitcher)}
                      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                    >
                      <span>{currentView === 'admin' ? 'Admin View' : 'Member View'}</span>
                      <i className="ri-arrow-down-s-line"></i>
                    </button>

                    {showViewSwitcher && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        <button
                          onClick={() => handleViewSwitch('admin')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        >
                          <i className="ri-admin-line"></i>
                          <span>View as Admin</span>
                        </button>
                        <button
                          onClick={() => handleViewSwitch('member')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        >
                          <i className="ri-user-line"></i>
                          <span>View as Member</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* User Avatar and Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={user?.photo || 'https://readdy.ai/api/search-image?query=default%20user%20avatar%20placeholder%20with%20neutral%20background&width=40&height=40&seq=default-avatar&orientation=squarish'}
                      alt={user?.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                      {user?.name || 'User'}
                    </span>
                    <i className="ri-arrow-down-s-line text-gray-400"></i>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <i className="ri-dashboard-line mr-2"></i>
                        Dashboard
                      </Link>
                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <i className="ri-user-line mr-2"></i>
                        Profile
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <i className="ri-logout-box-line mr-2"></i>
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link
                to="/auth/signin"
                className="bg-[#4285F4] text-white px-4 py-2 rounded-lg hover:bg-[#3367D6] transition-colors whitespace-nowrap"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl text-gray-700`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {/* Always show navigation items */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-[#4285F4] transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {user && (
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 py-2">
                    <img
                      src={user?.photo || 'https://readdy.ai/api/search-image?query=default%20user%20avatar%20placeholder%20with%20neutral%20background&width=40&height=40&seq=default-avatar&orientation=squarish'}
                      alt={user?.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-700">{user?.name || 'User'}</span>
                  </div>

                  {/* Dashboard Link */}
                  <Link
                    to="/dashboard"
                    className="block text-gray-700 hover:text-[#4285F4] transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  {/* View Switcher for Admin */}
                  {user?.role === 'admin' && (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          handleViewSwitch('admin');
                          setIsMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${currentView === 'admin' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        <i className="ri-admin-line mr-2"></i>
                        View as Admin
                      </button>
                      <button
                        onClick={() => {
                          handleViewSwitch('member');
                          setIsMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${currentView === 'member' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        <i className="ri-user-line mr-2"></i>
                        View as Member
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="text-left text-[#EA4335] hover:text-[#d93025] transition-colors duration-200 font-medium"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/auth/signin"
                    className="inline-block bg-[#4285F4] text-white px-4 py-2 rounded-lg hover:bg-[#3367D6] transition-colors duration-200 font-medium whitespace-nowrap"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

