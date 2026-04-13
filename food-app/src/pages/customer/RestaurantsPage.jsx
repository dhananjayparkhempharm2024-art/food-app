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
    <div className="restaurants-container">
      <h2 className="restaurants-header">Explore Restaurants</h2>

      <div className="restaurants-grid">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <h3 className="restaurant-name">{restaurant.name}</h3>

            <p className="restaurant-description">
              {restaurant.description}
            </p>

            <p className="restaurant-address">
              📍 {restaurant.address}
            </p>

            <Link
              to={`/restaurants/${restaurant.id}`}
              className="view-menu-link"
            >
              View Menu
            </Link>
          </div>
        ))}
      </div>

      {restaurants.length === 0 && (
        <p style={{ textAlign: 'center', color: '#9ca3af', marginTop: '3rem' }}>
          Searching for nearby kitchens...
        </p>
      )}
    </div>
  );
};
export default RestaurantsPage;

