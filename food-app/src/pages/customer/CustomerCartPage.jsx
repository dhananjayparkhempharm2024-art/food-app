import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { clearCart, getCart, removeCartItem } from "../../api/JsonServerApi";

const CustomerCartPage = () => {
  const [cart, setCart] = useState({ items: [] });

  const loadCart = async () => {
    const response = await getCart();
    setCart(response.data || { items: [] });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (cartItemId) => {
    await removeCartItem(cartItemId);
    await loadCart();
  };

  const handleClear = async () => {
    try {
      await clearCart();
      toast.success("Cart cleared");
      await loadCart();
    } catch {
      toast.error("Unable to clear cart");
    }
  };

  const total = (cart.items || []).reduce((sum, item) => sum + Number(item.lineTotal || 0), 0);

  return (
    <div>
      <h2>My Cart</h2>
      {(cart.items || []).length === 0 && <p>Your cart is empty.</p>}
      {(cart.items || []).map((item) => (
        <div key={item.id} style={{ borderBottom: "1px solid #e5e7eb", padding: "8px 0" }}>
          <strong>{item.menuItem?.name}</strong> x {item.quantity} - Rs. {item.lineTotal}
          <button style={{ marginLeft: 10 }} onClick={() => handleRemove(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: Rs. {total.toFixed(2)}</h3>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={handleClear}>Clear Cart</button>
        <Link to="/checkout">Proceed to Checkout</Link>
      </div>
    </div>
  );
};

export default CustomerCartPage;

