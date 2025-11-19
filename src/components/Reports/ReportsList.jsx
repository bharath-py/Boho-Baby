import React, { useState, useEffect } from 'react';
import { fetchReports } from '../../services/api';
import './ReportsList.css';

const ReportsList = ({ filter = 'all', onCreateNew }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadReports();
  }, [filter]);

  const loadReports = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchReports();
      console.log('API Response:', data); // Debug log
      
      // Handle paginated response from Django REST Framework
      let reportsArray = [];
      if (Array.isArray(data)) {
        reportsArray = data;
      } else if (data && Array.isArray(data.results)) {
        reportsArray = data.results;
      } else {
        console.error('API did not return an array:', data);
        setReports([]);
        setError('Invalid data format from server');
        return;
      }
      
      // Filter reports based on the filter prop
      const filtered = filter === 'all' 
        ? reportsArray 
        : reportsArray.filter(report => report.status === filter);
      setReports(filtered);
    } catch (error) {
      console.error('Failed to load reports:', error);
      setReports([]);
      setError(error.message || 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const getFilterTitle = () => {
    switch(filter) {
      case 'completed': return 'Completed Reports';
      case 'pending': return 'Pending Reports';
      case 'drafts': return 'Draft Reports';
      case 'archived': return 'Archived Reports';
      case 'trash': return 'Trash';
      default: return 'All Reports';
    }
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>{getFilterTitle()}</h1>
        <button className="btn btn-primary" onClick={onCreateNew}>
          + Create New Report
        </button>
      </div>

      {loading ? (
        <p>Loading reports...</p>
      ) : error ? (
        <div className="error-state">
          <p style={{ color: 'red' }}>Error: {error}</p>
          <p>The reports API endpoint may not be configured yet.</p>
          <button className="btn btn-primary" onClick={onCreateNew}>
            + Create New Report
          </button>
        </div>
      ) : reports.length === 0 ? (
        <div className="empty-state">
          <p>No reports found. Create your first report!</p>
          <button className="btn btn-primary" onClick={onCreateNew}>
            + Create New Report
          </button>
        </div>
      ) : (
        <div className="reports-grid">
          {reports.map((report) => (
            <div key={report.id} className="report-card">
              <h3>{report.title}</h3>
              <p>{report.description}</p>
              <span className="report-date">
                {new Date(report.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsList;