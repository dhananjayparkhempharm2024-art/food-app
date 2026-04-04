import React, { useContext } from 'react';
import { FaSearch, FaBell, FaUserCircle, FaBars } from 'react-icons/fa';
import { Auth } from '../../context/AuthContext';
const AdminNavbar = ({ toggleSidebar }) => {
  const { user, logoutUser } = useContext(Auth);

  return (
    <nav className="admin-navbar">
      <div className="nav-left">
        <div className="breadcrumbs">
          <span>Admin</span> / <strong>Dashboard</strong>
        </div>
      </div>

      <div className="nav-center">
        <div className="admin-search">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search orders, users, restaurants..." />
        </div>
      </div>

      <div className="nav-right">
        <div className="icon-badge">
          <FaBell />
          <span className="dot"></span>
        </div>

        <div className="admin-profile">
          <div className="profile-info">
            <span className="admin-name">{user?.username || "Admin"}</span>
            <span className="admin-role">System Admin</span>
          </div>
          <FaUserCircle className="profile-avatar" />

          {/* Add a logout button or dropdown here */}
          <button onClick={logoutUser} className="admin-logout-btn">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;