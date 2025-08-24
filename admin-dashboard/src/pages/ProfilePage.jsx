import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import './ProfilePage.css';
import Breadcrumb from '../components/Breadcrumb';

export default function ProfilePage({ darkMode, setDarkMode }) {
  const [adminData, setAdminData] = useState({});
  const [loginTime, setLoginTime] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('adminProfile'));
    const time = localStorage.getItem('adminLoginTime');

    if (data) setAdminData(data);
    if (time) setLoginTime(time);
  }, []);

  return (
    <div className="admin-dashboard">
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="admin-home-container">
        <TopNav darkMode={darkMode} setDarkMode={setDarkMode} />
        <Breadcrumb current="Profile" />

        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-avatar">👤</div>
            <h2>{adminData.name || 'Admin Name'}</h2>
            <p className="email">{adminData.email || 'admin@example.com'}</p>

            <div className="profile-info">
              <p><strong>Role:</strong> Super Admin</p>
              <p><strong>Status:</strong> Active</p>
              <p><strong>Password:</strong> ******</p>
            </div>

            <div className="profile-extra">
              <h4>About</h4>
              <p>
                This is your admin profile. You can manage all the chatbot settings and monitor logs,
                queries, synonyms, and performance analytics from the dashboard.
              </p>

              <h4>Last Login</h4>
              <p>{loginTime || 'Unknown'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
