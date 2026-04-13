import { useEffect, useState } from "react";
import { getMyOrders } from "../../api/JsonServerApi";

const CustomerOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const run = async () => {
      const response = await getMyOrders();
      setOrders(response.data || []);
    };
    run();
  }, []);

  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>
      
      {orders.length === 0 && (
        <div className="empty-orders">
          <p>You haven't placed any orders yet. Time to eat!</p>
        </div>
      )}

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <span className="order-id">Order #{order.id}</span>
            <span className="order-date">
              {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}
            </span>
          </div>

          <div className="order-detail">
            <span className="label">Status</span>
            <span className={`status-badge status-${order.status}`}>
              {order.status}
            </span>
          </div>

          <div className="order-detail">
            <span className="label">Total Amount</span>
            <span className="value">Rs. {order.totalAmount}</span>
          </div>

          <div className="order-detail">
            <span className="label">Payment</span>
            <span className="value">{order.paymentMode}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CustomerOrdersPage;

