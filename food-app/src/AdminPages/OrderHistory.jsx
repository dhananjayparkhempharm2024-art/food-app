import React, { useEffect, useState } from 'react';
import { FaHistory, FaSearch, FaBoxOpen, FaCheckCircle, FaTruck, FaClock } from 'react-icons/fa';
import { getAdminOrders } from '../api/JsonServerApi'; // Add this to your API file
import toast from 'react-hot-toast';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const fetchOrders = async () => {
    try {
      const response = await getAdminOrders();
      setOrders(response.data.data || []);
    } catch (error) {
      toast.error("Could not load order history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = filterStatus === "ALL" 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  if (loading) return <div className="loading-spinner">Loading History...</div>;

  return (
    <div className="order-history-wrapper">
      <header className="page-header">
        <div className="header-title">
          <FaHistory className="header-icon" />
          <h1>Global Order History</h1>
        </div>

        <div className="filter-group">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="ALL">All Orders</option>
            <option value="PENDING">Pending</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </header>

      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Restaurant</th>
              <th>Amount</th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td><span className="order-id">#FE-{order.id}</span></td>
                  <td>{order.customerName || "User-" + order.customerId}</td>
                  <td>{order.restaurantName}</td>
                  <td className="amount-cell">₹{order.totalAmount}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    <span className={`status-tag ${order.status.toLowerCase()}`}>
                      {order.status === 'DELIVERED' && <FaCheckCircle />}
                      {order.status === 'PENDING' && <FaClock />}
                      {order.status === 'OUT_FOR_DELIVERY' && <FaTruck />}
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-orders">
                  <FaBoxOpen size={40} />
                  <p>No orders found for this criteria.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;