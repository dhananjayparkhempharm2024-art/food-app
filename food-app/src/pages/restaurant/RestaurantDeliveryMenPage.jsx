import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addDeliveryMan, getDeliveryMen, getMyRestaurant } from "../../api/JsonServerApi";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  phone: ""
};

const RestaurantDeliveryMenPage = () => {
  const [restaurantId, setRestaurantId] = useState(null);
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [form, setForm] = useState(initialForm);

  const load = async (id) => {
    const response = await getDeliveryMen(id);
    setDeliveryMen(response.data || []);
  };

  useEffect(() => {
    const run = async () => {
      const restaurantResponse = await getMyRestaurant();
      const id = restaurantResponse.data?.id;
      setRestaurantId(id);
      await load(id);
    };
    run();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!restaurantId) {
      return;
    }
    try {
      await addDeliveryMan(restaurantId, form);
      toast.success("Delivery man added");
      setForm(initialForm);
      await load(restaurantId);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to add delivery man");
    }
  };

  return (
    <div>
      <h2>Delivery Men</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 420, marginBottom: 20 }}>
        <input placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
        <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        <button type="submit">Add Delivery Man</button>
      </form>

      {deliveryMen.map((man) => (
        <div key={man.id} style={{ borderBottom: "1px solid #e5e7eb", padding: "8px 0" }}>
          {man.fullName} - {man.email} - {man.phone}
        </div>
      ))}
    </div>
  );
};

export default RestaurantDeliveryMenPage;

