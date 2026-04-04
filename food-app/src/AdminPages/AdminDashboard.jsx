import React, { useContext, useEffect, useState } from 'react';
import { FaUsers, FaUtensils, FaShoppingBag, FaRupeeSign } from 'react-icons/fa';
import { Auth } from '../context/AuthContext';
import { getAdminDashboard } from '../api/JsonServerApi';

const AdminDashboard = () => {
  const { user } = useContext(Auth);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await getAdminDashboard();
console.log(response.data);
      setDashboardData(response.data.data); 
    } catch (error) {
      console.error("Error fetching admin dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <div className="loading">Loading Dashboard...</div>;

  const { 
    totalUsers = 0, 
    totalRestaurants = 0, 
    totalOrders = 0, 
    totalRevenue = 0, 
    recentOrders = [] 
  } = dashboardData || {};

  const stats = [
    { id: 1, title: "Total Users", value: totalUsers, icon: <FaUsers />, color: "#4e73df" },
    { id: 2, title: "Active Restaurants", value: totalRestaurants, icon: <FaUtensils />, color: "#1cc88a" },
    { id: 3, title: "Orders Today", value: totalOrders, icon: <FaShoppingBag />, color: "#36b9cc" },
    { id: 4, title: "Total Revenue", value: `₹${totalRevenue}`, icon: <FaRupeeSign />, color: "#f6c23e" },
  ];

  return (
    <div className="dashboard-wrapper">
      <h1 className="page-title">Dashboard Overview</h1>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className="stat-content">
              <p className="stat-title">{stat.title}</p>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-main-grid">
        <div className="dashboard-card chart-box">
          <h3>Sales Analytics</h3>
          <div className="placeholder-content">
            <p>Chart will be integrated here (using Chart.js or Recharts)</p>
          </div>
        </div>

        <div className="dashboard-card table-box">
          <h3>Recent Orders</h3>
          <table className="recent-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#FE-{order.id}</td>
                    <td>
                      <span className={`badge status-${order.status?.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>₹{order.totalAmount}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No recent orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;