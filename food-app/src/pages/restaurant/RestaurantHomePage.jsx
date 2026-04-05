import { useEffect, useState } from "react";
import { getMyRestaurant, getRestaurantTransactions } from "../../api/JsonServerApi";

const RestaurantHomePage = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const run = async () => {
      const [restaurantRes, summaryRes] = await Promise.all([
        getMyRestaurant(),
        getRestaurantTransactions()
      ]);
      setRestaurant(restaurantRes.data);
      setSummary(summaryRes.data);
    };
    run();
  }, []);

  return (
    <div>
      <h2>Restaurant Overview</h2>
      {restaurant && (
        <div style={{ marginBottom: 16 }}>
          <h3>{restaurant.name}</h3>
          <p>Status: {restaurant.status}</p>
          <p>{restaurant.address}</p>
        </div>
      )}
      {summary && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(120px,1fr))", gap: 10 }}>
          <div>Total Orders: {summary.totalOrders}</div>
          <div>Delivered: {summary.deliveredOrders}</div>
          <div>Active: {summary.activeOrders}</div>
          <div>Revenue: Rs. {summary.totalRevenue}</div>
        </div>
      )}
    </div>
  );
};

export default RestaurantHomePage;

