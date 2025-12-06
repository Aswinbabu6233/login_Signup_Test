import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="error-message">Please log in to access this page.</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome, {user.name}! 👋</h1>
          <p className="welcome-subtitle">You have successfully logged in</p>
        </div>

        <div className="user-info">
          <div className="info-card">
            <h3>Account Information</h3>
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{user.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">User ID:</span>
              <span className="info-value">{user.id}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-features">
          <h3>Features</h3>
          <ul className="features-list">
            <li>✅ Secure JWT Authentication</li>
            <li>✅ Password Hashing with bcryptjs</li>
            <li>✅ MongoDB Database Integration</li>
            <li>✅ Automated Welcome Email System</li>
            <li>✅ Automatically save user data in Excel</li>
            <li>✅ Protected Routes & Endpoints</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
