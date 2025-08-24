// src/pages/AdminHome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import DailyUserChart from '../components/DailyUserChart';
import IntentAccuracyChart from '../components/IntentAccuracyChart';
import QueryTypeChart from '../components/QueryTypeChart';
import HourlyTrafficChart from '../components/HourlyTrafficChart';
import './AdminHome.css';

import kaumudiImg from './kaumudi.jpg';
import harshitaImg from './harshita.jpg';
import komalImg from './komal1.jpg';
import lakshitaImg from './lakshita.jpg';

const features = [
  { name: "📋 FAQ Editor", route: "/faq-editor", desc: "Manage frequently asked questions and their answers to improve bot accuracy." },
  { name: "📝 Synonym Editor", route: "/synonym-editor", desc: "Manage keyword variations to improve natural query matching." },
  { name: "📨 Message Logs", route: "/logs", desc: "View all user queries, detected intents, and unmatched messages." },
  { name: "📂 Query Repository", route: "/queries", desc: "Track all admin-generated questions and their responses." },
  { name: "🔐 Role Manager", route: "/roles", desc: "Assign or remove access permissions to users." },
  { name: "📊 Analytics", route: "/analytics", desc: "Review key performance data to optimize the bot's responses." }
];

export default function AdminHome({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  return (
    <div className="admin-home-container">
      <TopNav darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="page-header">
        <h1 className="admin-home-title">Welcome Admin</h1>
        <p className="breadcrumb">Home &gt; Dashboard </p>
      </div><br />

      <div className="section" id="dashboard-section">
        <h2 className="section-title">🚀 Dashboard Features</h2>
        <div className="admin-home-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" onClick={() => navigate(feature.route)}>
              <div className="feature-header">
                <h2 className="feature-title">{feature.name}</h2>
              </div>
              <p className="feature-desc">{feature.desc}</p>
              <div className="progress-bar"></div>
            </div>
          ))}
        </div>
      </div><br /><br /><br /><br /><br />

      <div className="section" id="analytics-section">
        <h2 className="section-title">📊 Analytics & Graphs</h2>
        <div className="graphs-grid">
          <div className="graph-box">
            <h4>📅 Daily User Activity</h4>
            <DailyUserChart />
          </div>
          <div className="graph-box">
            <h4>🎯 Intent Accuracy</h4>
            <IntentAccuracyChart />
          </div>
          <div className="graph-box">
            <h4>📚 Query Types</h4>
            <QueryTypeChart />
          </div>
          <div className="graph-box">
            <h4>⏰ Hourly Traffic</h4>
            <HourlyTrafficChart />
          </div>
        </div>
      </div><br /><br /><br /><br /><br />

      <div className="section" id="makers-section">
        <h2 className="section-title">👩‍💻 About the Makers</h2>
        <div className="makers-row">
          {[{ name: "Kaumudi Mishra", role: "Full Stack Developer", img: kaumudiImg },
            { name: "Harshita Sharma", role: "Full Stack Developer", img: harshitaImg },
            { name: "Komal", role: "Full Stack Developer", img: komalImg },
            { name: "Lakshita Sharma", role: "Full Stack Developer", img: lakshitaImg }
          ].map((member, idx) => (
            <div key={idx} className="maker-card">
              <div className="maker-photo">
                <img src={member.img || "https://via.placeholder.com/100"} alt={member.name} className="maker-img"/>
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div><br /><br /><br />
      </div>
    </div>
  );
}
