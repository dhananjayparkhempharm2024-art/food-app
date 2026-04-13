import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { checkout } from "../../api/JsonServerApi";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const placeOrder = async (event) => {
    event.preventDefault();
    try {
      await checkout({ deliveryAddress, paymentMode: "PAY_ON_DELIVERY" });
      toast.success("Order placed successfully");
      navigate("/orders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout failed");
    }
  };

  return (
// ... inside the component return
<form onSubmit={placeOrder} className="checkout-container">
  <h2>Checkout</h2>
  
  <textarea
    placeholder="Enter delivery address..."
    value={deliveryAddress}
    onChange={(e) => setDeliveryAddress(e.target.value)}
    required
  />
  
  <div className="payment-section">
    <label>Payment Method</label>
    <input value="Pay On Delivery" disabled />
  </div>
  
  <button type="submit" className="place-order-btn">
    Place Order
  </button>
</form>
  );
};

export default CheckoutPage;

