import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt, FaQuestionCircle, FaPlusCircle, FaEdit, FaTrash,
  FaSyncAlt, FaChartBar, FaUsers, FaUserShield, FaSignOutAlt
} from 'react-icons/fa';
import '../components/Sidebar.css';

export default function Sidebar({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const [faqOpen, setFaqOpen] = useState(false); // toggle submenu

  return (
    <>
      {/* ☰ Toggle Button */}
      <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">ChatEase</div>

        <nav className="sidebar-links">
          <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
            <FaTachometerAlt /> Dashboard
          </Link>

          
          <Link to="/faq-add"><FaPlusCircle /> Add FAQ</Link>
          <Link to="/faq-edit"><FaEdit /> Edit FAQ</Link>
          <Link to="/faq-delete"><FaTrash /> Delete FAQ</Link>

          <Link to="/synonym-editor"><FaSyncAlt /> Synonyms</Link>
          <Link to="/logs"><FaChartBar /> Logs</Link>
          <Link to="/queries"><FaUsers /> Queries</Link>
          <Link to="/" className="logout-link"><FaSignOutAlt /> Logout</Link>
        </nav>

        {/* Dark Mode Toggle */}
        <div className="sidebar-footer">
          <span className="mode-toggle-label"></span>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(prev => !prev)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </aside>
    </>
  );
}
