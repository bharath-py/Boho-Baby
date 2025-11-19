import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import ReportsList from '../components/Reports/ReportsList';
import ReportEditor from '../components/Reports/ReportEditor';
import './ReportsPage.css';

const ReportsPage = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleCreateNew = () => {
    setSelectedReport(null);
    setIsCreating(true);
  };

  const handleClose = () => {
    setIsCreating(false);
    setSelectedReport(null);
  };

  return (
    <div className="app-layout" style={{ minHeight: '100vh' }}>
      <Header />
      <div className="app-content" style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: 'var(--spacing-xl)',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'var(--spacing-xl)',
      }}>
        <Sidebar />
        <main className="main-content">
          {isCreating || selectedReport ? (
            <ReportEditor report={selectedReport} onClose={handleClose} />
          ) : (
            <ReportsList onCreateNew={handleCreateNew} />
          )}
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;