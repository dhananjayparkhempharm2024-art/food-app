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
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard Overview</h2>
      
      {restaurant && (
        <div className="restaurant-info-card">
          <h3 className="res-name">{restaurant.name}</h3>
          <span className="res-status">{restaurant.status}</span>
          <p className="res-address">📍 {restaurant.address}</p>
        </div>
      )}

      {summary && (
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total Orders</span>
            <span className="stat-value">{summary.totalOrders}</span>
          </div>
          
          <div className="stat-card">
            <span className="stat-label">Delivered</span>
            <span className="stat-value">{summary.deliveredOrders}</span>
          </div>
          
          <div className="stat-card">
            <span className="stat-label">Active</span>
            <span className="stat-value">{summary.activeOrders}</span>
          </div>
          
          <div className="stat-card">
            <span className="stat-label">Total Revenue</span>
            <span className="stat-value stat-revenue">Rs. {summary.totalRevenue}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default RestaurantHomePage;

