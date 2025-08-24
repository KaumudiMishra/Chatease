// src/components/TopNav.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopNav.css';
import NotificationBell from './NotificationBell';

export default function TopNav({ darkMode, setDarkMode }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleSuggestionClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setShowSuggestions(false);
  };

  return (
    <header className="topnav">
      <div className="topnav-left">
        <div
          className="topnav-search-container"
          onClick={() => setShowSuggestions(!showSuggestions)}
        >
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search Sections..."
            className="topnav-search"
            readOnly
          />
          {showSuggestions && (
            <div className="search-suggestions">
              <div onClick={() => handleSuggestionClick('dashboard-section')}>
                🚀 Dashboard Features
              </div>
              <div onClick={() => handleSuggestionClick('analytics-section')}>
                📊 Analytics
              </div>
              <div onClick={() => handleSuggestionClick('makers-section')}>
                👩‍💻 About the Makers
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="topnav-right">
        {/* 🔔 Notification Bell */}
        <NotificationBell />

        {/* ⚙️ Settings */}
        <div
          className="topnav-icon"
          title="Settings"
          onClick={() => navigate('/settings')}
        >
          ⚙️
        </div>

        {/* 🌙 / ☀️ Toggle */}
        <button
          className="topnav-icon"
          title="Toggle Dark Mode"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '🌙' : '☀️'}
        </button>

        {/* 👤 Profile */}
        <div
          className="topnav-icon avatar"
          title="Profile"
          onClick={() => navigate('/profile')}
        >
          👤
        </div>
      </div>
    </header>
  );
}
