import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './Admin-comp/AdminSidebar';
import AdminNavbar from './Admin-comp/AdminNavbar';
import './Admin.css';
const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="admin-container">
      {/* Sidebar - Pass state to handle collapsing */}
      <AdminSidebar isOpen={isSidebarOpen} />

      <div className={`admin-main ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
        {/* Navbar - Pass toggle function for the hamburger icon */}
        <AdminNavbar toggleSidebar={toggleSidebar} />


        {/* Dynamic Content Area */}
        <main className="admin-content">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;