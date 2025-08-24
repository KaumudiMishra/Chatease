// src/layouts/AdminLayout.jsx
import { Link } from "react-router-dom";
import "./AdminLayout.css";


export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-header">🤖 Admin Hub</div>
        <nav className="sidebar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/faq-editor">FAQs</Link>
          <Link to="/synonym-editor">Synonyms</Link>
          <Link to="/logs">Logs</Link>
          <Link to="/queries">Query Repo</Link>
          <Link to="/roles">Roles</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/" className="logout-link">Logout</Link>
        </nav>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
