import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addMenuItem,
  deleteMenuItem,
  getMyRestaurant,
  getRestaurantMenu,
  updateMenuItem
} from "../../api/JsonServerApi";

const initialForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  available: true
};

const RestaurantMenuManagerPage = () => {
  const [restaurantId, setRestaurantId] = useState(null);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);

  const loadMenu = async (id) => {
    const response = await getRestaurantMenu(id);
    setItems(response.data || []);
  };

  useEffect(() => {
    const run = async () => {
      const restaurantResponse = await getMyRestaurant();
      const id = restaurantResponse.data?.id;
      setRestaurantId(id);
      await loadMenu(id);
    };
    run();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!restaurantId) {
      return;
    }
    try {
      await addMenuItem(restaurantId, { ...form, price: Number(form.price) });
      toast.success("Menu item added");
      setForm(initialForm);
      await loadMenu(restaurantId);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to add menu item");
    }
  };

  const toggleAvailability = async (item) => {
    if (!restaurantId) {
      return;
    }
    await updateMenuItem(restaurantId, item.id, {
      name: item.name,
      description: item.description,
      price: Number(item.price),
      category: item.category,
      available: !item.available
    });
    await loadMenu(restaurantId);
  };

  const handleDelete = async (itemId) => {
    if (!restaurantId) {
      return;
    }
    await deleteMenuItem(restaurantId, itemId);
    await loadMenu(restaurantId);
  };
return (
    <div className="menu-manager-container">
      <h2 className="manager-title">Menu Management</h2>
      
      <form onSubmit={handleCreate} className="add-item-form">
        <input 
          placeholder="Dish name" 
          value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
          required 
        />
        <input 
          placeholder="Category (e.g. Starter)" 
          value={form.category} 
          onChange={(e) => setForm({ ...form, category: e.target.value })} 
        />
        <input 
          placeholder="Price" 
          type="number" 
          value={form.price} 
          onChange={(e) => setForm({ ...form, price: e.target.value })} 
          required 
        />
        <input 
          placeholder="Short description" 
          value={form.description} 
          onChange={(e) => setForm({ ...form, description: e.target.value })} 
        />
        <button type="submit">Add to Menu</button>
      </form>

      <div className="inventory-list">
        {items.map((item) => (
          <div key={item.id} className="inventory-item">
            <div className="item-main-info">
              <div className="item-name-row">
                <div className={`status-indicator ${item.available ? 'status-online' : 'status-offline'}`} />
                <strong>{item.name}</strong>
              </div>
              <span className="item-price-tag">Rs. {item.price} • {item.category}</span>
            </div>
            
            <div className="item-actions">
              <button className="action-btn toggle-btn" onClick={() => toggleAvailability(item)}>
                {item.available ? "Disable" : "Enable"}
              </button>
              <button className="action-btn delete-btn" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {items.length === 0 && <p className="no-orders-msg">Your menu is empty.</p>}
    </div>
  );
};
export default RestaurantMenuManagerPage;

