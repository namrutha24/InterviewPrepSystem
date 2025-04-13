import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function TestSelection() {
  const navigate = useNavigate();
  const [field, setField] = useState('');
  const [company, setCompany] = useState('');
  const [mode, setMode] = useState('');

  const handleStartTest = () => {
    if (field && company && mode) {
      navigate('/test', { state: { field, company, mode } });
    } else {
      alert('Please select all options');
    }
  };

  return (
    <div className="app-container">
      <div className="auth-card">
        <h1 className="auth-title">Select Your Test - SkillSync</h1>
        <div>
          <h3>Field</h3>
          <select value={field} onChange={(e) => setField(e.target.value)}>
            <option value="">Select Field</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Product Management">Product Management</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>
        <div>
          <h3>Company</h3>
          <select value={company} onChange={(e) => setCompany(e.target.value)}>
            <option value="">Select Company</option>
            <option value="Google">Google</option>
            <option value="Amazon">Amazon</option>
            <option value="Microsoft">Microsoft</option>
          </select>
        </div>
        <div>
          <h3>Mode</h3>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="">Select Mode</option>
            <option value="Practice">Practice</option>
            <option value="Timed">Timed</option>
            <option value="Mock Interview">Mock Interview</option>
          </select>
        </div>
        <button onClick={handleStartTest} style={{ marginTop: '20px' }}>Start Test</button>
        <button onClick={() => navigate('/')} style={{ marginTop: '10px' }}>Back to Dashboard</button>
        <button onClick={() => { localStorage.removeItem('token'); window.location.reload(); }} style={{ marginTop: '10px' }}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default TestSelection;