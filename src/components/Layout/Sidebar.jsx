import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUserRole } from '../../utils/auth';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const userRole = getUserRole();

  const isActive = (path) => location.pathname === path;

  // Main navigation items
  const mainMenuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/reports', label: 'Reports', icon: '📄' },
  ];

  // Add privileged routes based on user role
  if (userRole === 'super' || userRole === 'privileged') {
    mainMenuItems.push({ path: '/users', label: 'Users', icon: '👥' });
  }

  // Report categories
  const reportCategories = [
    { path: '/reports/all', label: 'All Reports', icon: '📋' },
    { path: '/reports/completed', label: 'Completed', icon: '✅' },
    { path: '/reports/pending', label: 'Pending', icon: '⏳' },
    { path: '/reports/drafts', label: 'Drafts', icon: '📝' },
  ];

  // Additional menu items
  const additionalItems = [
    { path: '/archive', label: 'Archive', icon: '🗄️' },
    { path: '/trash', label: 'Trash', icon: '🗑️' },
  ];

  return (
    <aside className="sidebar">
      {/* Main Navigation */}
      <nav className="sidebar-nav">
        {mainMenuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item sidebar-link ${isActive(item.path) ? 'active' : ''}`}
          >
            <span className="nav-icon sidebar-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-divider"></div>

      {/* Report Categories */}
      <h3 className="sidebar-title">Categories</h3>
      <ul className="sidebar-menu">
        {reportCategories.map((item) => (
          <li key={item.path} className="sidebar-menu-item">
            <Link 
              to={item.path} 
              className={`sidebar-link nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="sidebar-icon nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-divider"></div>

      {/* Additional Menu Items */}
      <ul className="sidebar-menu">
        {additionalItems.map((item) => (
          <li key={item.path} className="sidebar-menu-item">
            <Link 
              to={item.path} 
              className={`sidebar-link nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="sidebar-icon nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;