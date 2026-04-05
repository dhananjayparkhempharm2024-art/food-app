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
    <div>
      <h2>Restaurant Menu</h2>
      <div style={{ display: "grid", gap: 10 }}>
        {menu.map((item) => (
          <div key={item.id} style={{ border: "1px solid #e5e7eb", padding: 12, borderRadius: 8 }}>
            <h4 style={{ margin: 0 }}>{item.name}</h4>
            <p style={{ margin: "6px 0" }}>{item.description}</p>
            <p style={{ margin: "6px 0" }}>Price: Rs. {item.price}</p>
            <button disabled={!item.available} onClick={() => handleAdd(item.id)}>
              {item.available ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenuPage;

