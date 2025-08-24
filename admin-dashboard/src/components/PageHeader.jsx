// src/components/PageHeader.jsx
import React from 'react';
import './PageHeader.css';

export default function PageHeader({ icon, title, subtitle }) {
  return (
    <div className="page-header">
      <h2 className="page-title">
        {icon} {title}
      </h2>
      <p className="page-subtitle">{subtitle}</p>
    </div>
  );
}
