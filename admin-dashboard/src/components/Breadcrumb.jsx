// src/components/Breadcrumb.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Breadcrumb.css';

export default function Breadcrumb({ current }) {
  const navigate = useNavigate();

  return (
    <div className="breadcrumb-container">
      <span className="breadcrumb-link" onClick={() => navigate('/dashboard')}>Home</span>
      <span className="breadcrumb-separator">›</span>
      <span className="breadcrumb-link" onClick={() => navigate('/dashboard')}>Dashboard</span>
      <span className="breadcrumb-separator">›</span>
      <span className="breadcrumb-current">{current}</span>
    </div>
  );
}
