import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload(); // Reload to reset App state
  };

  return (
    <div className="app-container">
      <div className="auth-card">
        <h1 className="auth-title">SkillSync Dashboard</h1>
        <p>Welcome Back!</p>
        <button onClick={() => navigate('/test-selection')}>Start a New Test</button>
        <button onClick={() => navigate('/results')}>View Past Results</button>
        <div style={{ marginTop: '20px' }}>
          <h3>Quick Stats</h3>
          <p>Tests Taken: 0 (TBD)</p>
          <p>Avg Score: N/A (TBD)</p>
          <p>Best Field: N/A (TBD)</p>
        </div>
        <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;