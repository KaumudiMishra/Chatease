import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function Layout({ darkMode, setDarkMode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div>
      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    <div
  className={`main-content ${sidebarOpen ? '' : 'expanded'}`}
  style={{ marginLeft: sidebarOpen ? '250px' : '60px' }}
>
  <Outlet />
</div>

    </div>
  );
}