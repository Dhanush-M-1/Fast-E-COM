import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent group-hover:opacity-80">
              Fast-E-COM
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-text-muted hover:text-text font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-text-muted hover:text-text font-medium transition-colors"
            >
              Products
            </Link>
            <Link to="/admin/orders" className="text-primary hover:text-primary-light font-medium transition-colors text-sm border border-primary/30 px-3 py-1 rounded-full">
              Admin Dashboard
            </Link>
            <Link to="/cart" className="relative text-text-muted hover:text-text transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-surface text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-text-muted">{user.email}</span>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 text-sm rounded-lg bg-danger/20 text-danger hover:bg-danger/30 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium text-sm"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-text-muted hover:text-text cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block py-2 text-text-muted hover:text-text">Home</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)} className="block py-2 text-text-muted hover:text-text">Products</Link>
            <Link to="/admin/orders" onClick={() => setMenuOpen(false)} className="block py-2 text-primary font-bold">Admin Dashboard</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="block py-2 text-text-muted hover:text-text">
              Cart {itemCount > 0 && `(${itemCount})`}
            </Link>
            {user ? (
              <button onClick={() => { logout(); setMenuOpen(false); }} className="block py-2 text-danger cursor-pointer">Logout</button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block py-2 text-primary-light">Sign In</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
