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
    <div>
      <h2>Restaurant Orders</h2>
      {orders.map((order) => (
        <div key={order.id} style={{ borderBottom: "1px solid #e5e7eb", padding: "8px 0" }}>
          <strong>#{order.id}</strong> - {order.customerName} - Rs. {order.totalAmount} - {order.status}
        </div>
      ))}
      {orders.length === 0 && <p>No orders available.</p>}
    </div>
  );
};

export default RestaurantOrdersPage;

