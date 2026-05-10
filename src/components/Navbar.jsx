import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Wrench, User, LogOut, LayoutDashboard, ChevronDown, Home } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [customerDrop, setCustomerDrop] = useState(false);
  const [vendorDrop, setVendorDrop] = useState(false);
  const custRef = useRef(null);
  const vendRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (custRef.current && !custRef.current.contains(e.target)) setCustomerDrop(false);
      if (vendRef.current && !vendRef.current.contains(e.target)) setVendorDrop(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <nav className="mmt-gradient sticky top-0 z-50 shadow-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 bg-mmt-500 rounded flex items-center justify-center">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-extrabold text-white tracking-tight">
              Service<span className="text-mmt-400">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wider px-3 py-2 rounded hover:bg-white/10 transition-all no-underline">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <Link to="/services" className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wider px-3 py-2 rounded hover:bg-white/10 transition-all no-underline">
              <Wrench className="w-3.5 h-3.5" /> Services
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={user?.role === 'customer' ? '/customer/dashboard' : '/vendor/dashboard'}
                  className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wider px-3 py-2 rounded hover:bg-white/10 transition-all no-underline"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                </Link>
                <div className="flex items-center gap-3 ml-3 pl-3 border-l border-white/20">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-mmt-500 flex items-center justify-center text-xs font-bold text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="text-xs">
                      <p className="font-semibold text-white leading-tight">{user?.name}</p>
                      <p className="text-white/60 capitalize text-[10px]">{user?.role}</p>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="flex items-center gap-1 text-white/70 hover:text-mmt-400 text-xs font-semibold transition-colors">
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 ml-3 pl-3 border-l border-white/20">
                <div ref={custRef} className="relative">
                  <button
                    onClick={() => { setCustomerDrop(!customerDrop); setVendorDrop(false); }}
                    className="flex items-center gap-1 text-white/90 hover:text-white text-xs font-semibold uppercase tracking-wider px-3 py-2 rounded hover:bg-white/10 transition-all"
                  >
                    Customer <ChevronDown className="w-3 h-3" />
                  </button>
                  {customerDrop && (
                    <div className="absolute top-full right-0 mt-1 bg-white rounded shadow-search py-1 w-40 z-50">
                      <Link to="/customer/login" onClick={() => setCustomerDrop(false)} className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50 font-medium no-underline">Login</Link>
                      <Link to="/customer/signup" onClick={() => setCustomerDrop(false)} className="block px-4 py-2 text-sm text-navy-700 hover:bg-navy-50 font-medium no-underline">Sign Up</Link>
                    </div>
                  )}
                </div>
                <div ref={vendRef} className="relative">
                  <button
                    onClick={() => { setVendorDrop(!vendorDrop); setCustomerDrop(false); }}
                    className="flex items-center gap-1 bg-mmt-500 hover:bg-mmt-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-all"
                  >
                    Vendor <ChevronDown className="w-3 h-3" />
                  </button>
                  {vendorDrop && (
                    <div className="absolute top-full right-0 mt-1 bg-white rounded shadow-search py-1 w-40 z-50">
                      <Link to="/vendor/login" onClick={() => setVendorDrop(false)} className="block px-4 py-2 text-sm text-navy-700 hover:bg-mmt-50 font-medium no-underline">Login</Link>
                      <Link to="/vendor/signup" onClick={() => setVendorDrop(false)} className="block px-4 py-2 text-sm text-navy-700 hover:bg-mmt-50 font-medium no-underline">Sign Up</Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-700 border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 text-white/80 hover:text-white text-sm font-semibold no-underline">Home</Link>
            <Link to="/services" onClick={() => setMobileOpen(false)} className="block py-2 text-white/80 hover:text-white text-sm font-semibold no-underline">Services</Link>
            {isAuthenticated ? (
              <>
                <Link to={user?.role === 'customer' ? '/customer/dashboard' : '/vendor/dashboard'} onClick={() => setMobileOpen(false)} className="block py-2 text-white/80 hover:text-white text-sm font-semibold no-underline">Dashboard</Link>
                <Link to={user?.role === 'customer' ? '/customer/bookings' : '/vendor/bookings'} onClick={() => setMobileOpen(false)} className="block py-2 text-white/80 hover:text-white text-sm font-semibold no-underline">My Bookings</Link>
                <button onClick={handleLogout} className="block w-full text-left py-2 text-mmt-400 text-sm font-semibold">Logout</button>
              </>
            ) : (
              <>
                <Link to="/customer/login" onClick={() => setMobileOpen(false)} className="block py-2 text-white/80 hover:text-white text-sm font-semibold no-underline">Customer Login</Link>
                <Link to="/customer/signup" onClick={() => setMobileOpen(false)} className="block py-2 text-mmt-400 text-sm font-semibold no-underline">Customer Sign Up</Link>
                <Link to="/vendor/login" onClick={() => setMobileOpen(false)} className="block py-2 text-white/80 hover:text-white text-sm font-semibold no-underline">Vendor Login</Link>
                <Link to="/vendor/signup" onClick={() => setMobileOpen(false)} className="block py-2 text-mmt-400 text-sm font-semibold no-underline">Vendor Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
