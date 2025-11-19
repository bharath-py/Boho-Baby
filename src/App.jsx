import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import LoginPage from './Pages/LoginPage';
import DashboardPage from './Pages/DashboardPage';
import ReportsPage from './Pages/ReportsPage';
import { isAuthenticated } from './utils/auth';
import './App.css';


// Demo/Welcome component (original Vite boilerplate)
function WelcomePage() {
  const [count, setCount] = useState(0);


  return (
    <div className="welcome-container">
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div style={{ marginTop: '2rem' }}>
        <a href="/login" style={{ 
          padding: '10px 20px', 
          background: '#2196F3', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '6px',
          display: 'inline-block'
        }}>
          Go to Login →
        </a>
      </div>
    </div>
  );
}


// Private Route Protection
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}


// Main App Component with Routing
function App() {
  return (
    <Router>
      <Routes>
        {/* Original Vite Demo Page */}
        <Route path="/demo" element={<WelcomePage />} />
        
        {/* Authentication Route */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Reports Routes */}
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <ReportsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports/all"
          element={
            <PrivateRoute>
              <ReportsPage filter="all" />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports/completed"
          element={
            <PrivateRoute>
              <ReportsPage filter="completed" />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports/pending"
          element={
            <PrivateRoute>
              <ReportsPage filter="pending" />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports/drafts"
          element={
            <PrivateRoute>
              <ReportsPage filter="drafts" />
            </PrivateRoute>
          }
        />
        
        {/* Default Route - Redirect to Login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}


export default App;
