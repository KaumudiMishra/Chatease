// src/pages/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import './SettingsPage.css';
import Breadcrumb from '../components/Breadcrumb';
export default function SettingsPage({ darkMode, setDarkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Load data from localStorage (simulate backend)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('adminProfile'));
    if (saved) setFormData(saved);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    localStorage.setItem('adminProfile', JSON.stringify(formData));
    alert('Changes saved successfully!');
  };

  return (
    <div className="admin-dashboard">
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="admin-home-container">
        <TopNav darkMode={darkMode} setDarkMode={setDarkMode} />
        <Breadcrumb current="Settings" />
        <div className="settings-page">
  <div className="settings-card">
    <h1 className="settings-title">⚙️ Settings</h1>

    <div className="settings-section">
      <label>Full Name</label>
      <input name="name" value={formData.name} onChange={handleChange} />
    </div>
    <div className="settings-section">
      <label>Email</label>
      <input name="email" value={formData.email} onChange={handleChange} />
    </div>
    <div className="settings-section">
      <label>Password</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} />
    </div>
    <button className="save-btn" onClick={handleSave}>💾 Save Changes</button>
  </div>
</div>

      </div>
    </div>
  );
}
