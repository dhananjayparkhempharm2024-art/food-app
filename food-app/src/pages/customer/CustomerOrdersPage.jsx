import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMyOrders } from "../../api/JsonServerApi";

const CustomerOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const run = async () => {
      try {
        const response = await getMyOrders();
        const payload = response.data?.data ?? response.data;
        setOrders(Array.isArray(payload) ? payload : []);
      } catch (error) {
        setOrders([]);
        toast.error(error.response?.data?.message || "Unable to load orders");
      }
    };
    run();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid #e5e7eb", marginBottom: 10, padding: 12, borderRadius: 8 }}>
          <div>Order #{order.id}</div>
          <div>Status: {order.status}</div>
          <div>Amount: Rs. {order.totalAmount}</div>
          <div>Payment: {order.paymentMode}</div>
          <div>Date: {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}</div>
        </div>
      ))}
    </div>
  );
};

export default CustomerOrdersPage;

