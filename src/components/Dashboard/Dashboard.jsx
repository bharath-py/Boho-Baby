import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalReports: 0,
    completedReports: 0,
    pendingReports: 0,
  });

  useEffect(() => {
    // TODO: Fetch dashboard data from API
    // For now, using mock data
    setStats({
      totalReports: 24,
      completedReports: 18,
      pendingReports: 6,
    });
  }, []);

  return (
    <div className="dashboard-content">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Reports</h3>
          <p className="stat-number">{stats.totalReports}</p>
        </div>
        
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number">{stats.completedReports}</p>
        </div>
        
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-number">{stats.pendingReports}</p>
        </div>
      </div>
      
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <p>No recent activity</p>
      </div>
    </div>
  );
};

export default Dashboard;
