// App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import AdminHome from './pages/AdminHome';
import FAQEditor from './pages/FAQEditor';
import SynonymEditor from './pages/SynonymEditor';
import MessageLog from './pages/MessageLog';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import EditFAQ from './pages/EditFAQ';
import DeleteFAQ from './pages/DeleteFAQ';
import Queries from './pages/Queries';
import Roles from './pages/Roles';
import Analytics from './pages/Analytics';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';

function AppContent() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={<Login darkMode={darkMode} setDarkMode={setDarkMode} />}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword darkMode={darkMode} setDarkMode={setDarkMode} />}
      />

      {/* Protected Routes under Layout */}
      <Route
        element={
          <ProtectedRoute>
            <Layout darkMode={darkMode} setDarkMode={setDarkMode} />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<AdminHome darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/faq-add" element={<FAQEditor />} />
        <Route path="/faq-edit" element={<EditFAQ />} />
        <Route path="/faq-delete" element={<DeleteFAQ />} />
        <Route path="/synonym-editor" element={<SynonymEditor />} />
        <Route path="/logs" element={<MessageLog />} />
        <Route path="/queries" element={<Queries />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
