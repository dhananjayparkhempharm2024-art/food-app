import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { addToCart, getRestaurantMenu } from "../../api/JsonServerApi";

const RestaurantMenuPage = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const run = async () => {
      const response = await getRestaurantMenu(id);
      setMenu(response.data || []);
    };
    run();
  }, [id]);

  const handleAdd = async (menuItemId) => {
    try {
      await addToCart({ menuItemId, quantity: 1 });
      toast.success("Added to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to add item");
    }
  };
return (
    <div className="menu-container">
      <h2 className="menu-header">Restaurant Menu</h2>
      <div className="menu-grid">
        {menu.map((item) => (
          <div 
            key={item.id} 
            className={`menu-item-card ${!item.available ? 'out-of-stock-card' : ''}`}
          >
            <div>
              <h4 className="menu-item-name">{item.name}</h4>
              <p className="menu-item-description">{item.description}</p>
            </div>
            
            <div className="menu-item-footer">
              <span className="menu-item-price">Rs. {item.price}</span>
              <button 
                className="add-btn"
                disabled={!item.available} 
                onClick={() => handleAdd(item.id)}
              >
                {item.available ? "Add to Cart" : "Sold Out"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RestaurantMenuPage;

