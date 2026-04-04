import React from 'react';
import { NavLink } from 'react-router-dom';
// Replace your line 3 with this:
import {
    FaThLarge,       // Replacement for FaLayout
    FaUsers,
    FaUtensils,
    FaRegClipboard,  // Replacement for FaClipboardList
    FaPercent,
    FaCog,
    FaSignOutAlt
} from 'react-icons/fa';
import { MdOutlineRateReview } from 'react-icons/md';

const AdminSidebar = ({ isOpen }) => {
    const menuItems = [
        {
            name: "Dashboard",
            // path: "/", // Corresponds to { path: '/', element: <AdminDash /> } in your routes
            icon: <FaThLarge />
        },
        {
            name: "User Management",
            path: "/users",
            icon: <FaUsers />
        },
        {
            name: "Restaurant Requests",
            path: "/approvals",
            icon: <FaUtensils />
        },
        {
            name: "Order History",
            path: "/orders",
            icon: <FaRegClipboard />
        },
        {
            name: "Coupons & Offers",
            path: "/coupons",
            icon: <FaPercent />
        },
        {
            name: "Reviews & Feedback",
            path: "/reviews",
            icon: <MdOutlineRateReview />
        },
        {
            name: "System Settings",
            path: "/settings",
            icon: <FaCog />
        }
    ];

    return (
        <div className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header">
                <h2 className="logo-text">Food<span>Express</span></h2>
                <span className="logo-icon">FE</span>
            </div>

            <nav className="sidebar-menu">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
                            // end={item.path === '/'} // Ensures Dashboard is only active on exact '/'
                            >
                                <span className="icon">{item.icon}</span>
                                <span className="title">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <div className="logout-wrapper">
                    <FaSignOutAlt className="logout-icon" />
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;