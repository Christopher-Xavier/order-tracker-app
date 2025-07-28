import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useLogout from './useLogout';
import './NavBar.css';

const NavBar = ({ isAuthenticated, userRole, userAvatarUrl }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout();

  const toggleMenu = () => setMobileMenuOpen(prev => !prev);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="logo">MyApp</span>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>

        {isAuthenticated && (
          <>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
            {userRole === 'admin' && <li><NavLink to="/admin">Admin</NavLink></li>}
            <li><button onClick={handleLogout}>Logout</button></li>
            {userAvatarUrl && (
              <li><img src={userAvatarUrl} alt="avatar" className="avatar" /></li>
            )}
          </>
        )}

        {!isAuthenticated && (
          <li><NavLink to="/login">Login</NavLink></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
