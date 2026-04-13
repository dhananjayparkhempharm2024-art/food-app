import { useEffect, useState } from "react";
import { getRestaurantOrders } from "../../api/JsonServerApi";

const RestaurantOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const run = async () => {
      const response = await getRestaurantOrders();
      setOrders(response.data || []);
    };
    run();
  }, []);
return (
    <div className="orders-mgmt-container">
      <h2 className="orders-mgmt-title">Order Management</h2>
      
      {orders.length > 0 ? (
        <>
          <div className="orders-list-header">
            <span>ID</span>
            <span>Customer</span>
            <span>Total</span>
            <span>Status</span>
          </div>
          
          {orders.map((order) => (
            <div key={order.id} className="order-row">
              <span className="order-id-cell">#{order.id}</span>
              <span className="customer-name-cell">{order.customerName}</span>
              <span className="amount-cell">Rs. {order.totalAmount}</span>
              <div className="status-cell">
                <span className={`status-pill status-${order.status}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="no-orders-msg">
          <p>No orders currently in the queue.</p>
        </div>
      )}
    </div>
  );
};
export default RestaurantOrdersPage;

