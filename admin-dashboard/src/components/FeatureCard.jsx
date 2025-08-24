// src/components/FeatureCard.jsx
import React from 'react';
import './FeatureCard.css';

export default function FeatureCard({ icon, label, onClick }) {
  return (
    <div className="feature-card" onClick={onClick}>
      <div className="icon">{icon}</div>
      <h3>{label}</h3>
    </div>
  );
}
