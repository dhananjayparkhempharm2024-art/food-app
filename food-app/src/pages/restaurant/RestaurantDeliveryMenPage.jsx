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
    <div className="delivery-mgmt-container">
      <h2 className="delivery-title">Delivery Personnel</h2>

      <div className="onboarding-card">
        <h3>Register New Delivery Partner</h3>
        <form onSubmit={handleSubmit} className="delivery-form">
          <input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />
          <input
            placeholder="Email Address"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            placeholder="Secure Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <button type="submit" className="add-staff-btn">Add Delivery Man</button>
        </form>
      </div>

      <div className="staff-list">
        {deliveryMen.map((man) => (
          <div key={man.id} className="staff-row">
            <div className="staff-info">
              <span className="staff-name">{man.fullName}</span>
              <div className="staff-contact">
                <span>{man.email}</span>
                <span className="phone-badge">{man.phone}</span>
              </div>
            </div>
          </div>
        ))}
        {deliveryMen.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem', color: '#a0aec0' }}>
            No delivery personnel registered yet.
          </p>
        )}
      </div>
    </div>
  );
};
export default RestaurantDeliveryMenPage;

