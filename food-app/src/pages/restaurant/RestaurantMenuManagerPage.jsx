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
    <div>
      <h2>Menu Management</h2>
      <form onSubmit={handleCreate} style={{ display: "grid", gap: 8, maxWidth: 460, marginBottom: 20 }}>
        <input placeholder="Dish name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Price" type="number" min="1" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <button type="submit">Add Dish</button>
      </form>

      {items.map((item) => (
        <div key={item.id} style={{ borderBottom: "1px solid #e5e7eb", padding: "8px 0" }}>
          <strong>{item.name}</strong> - Rs. {item.price} - {item.available ? "Available" : "Unavailable"}
          <button style={{ marginLeft: 10 }} onClick={() => toggleAvailability(item)}>
            {item.available ? "Mark Unavailable" : "Mark Available"}
          </button>
          <button style={{ marginLeft: 10 }} onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenuManagerPage;

