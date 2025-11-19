import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout, getUserRole } from '../../utils/auth';
import './Header.css';
import logo from '../../assets/bohologo.jpg';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = getUserRole();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar app-header">
      <div className="navbar-container header-content">
        <Link to="/dashboard" className="navbar-logo header-logo">
          <h2>
  <img 
    src={logo} 
    alt="Logo" 
    style={{ 
      height: '70px', 
      width: 'auto', 
      marginRight: '10px',
      verticalAlign: 'middle'
    }} 
  />
  Boho Reports
</h2>
        </Link>
        
        <button 
          className="navbar-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        
        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/dashboard" 
              className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/reports" 
              className={`navbar-link ${isActive('/reports') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Reports
            </Link>
          </li>
          <li>
            <Link 
              to="/analytics" 
              className={`navbar-link ${isActive('/analytics') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Analytics
            </Link>
          </li>
          <li>
            <Link 
              to="/settings" 
              className={`navbar-link ${isActive('/settings') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Settings
            </Link>
          </li>
        </ul>
        
        <div className="navbar-actions header-actions">
          <span className="user-role">{userRole}</span>
          <div className="navbar-user">
            👤 {userRole || 'User'}
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;