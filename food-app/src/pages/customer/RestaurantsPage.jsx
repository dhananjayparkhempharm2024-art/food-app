import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRestaurants } from "../../api/JsonServerApi";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const run = async () => {
      const response = await getRestaurants();
      setRestaurants(response.data || []);
    };
    run();
  }, []);

  return (
    <div>
      <h2>Available Restaurants</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} style={{ border: "1px solid #e5e7eb", padding: 12, borderRadius: 8 }}>
            <h3 style={{ margin: 0 }}>{restaurant.name}</h3>
            <p style={{ margin: "8px 0" }}>{restaurant.description}</p>
            <p style={{ margin: "8px 0", color: "#6b7280" }}>{restaurant.address}</p>
            <Link to={`/restaurants/${restaurant.id}`}>View Menu</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsPage;

