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
    <div className="cart-container">
  <div className="cart-header">
    <h2>My Cart</h2>
    {cart.items.length > 0 && (
      <button className="clear-btn" onClick={handleClear}>Clear Cart</button>
    )}
  </div>

  {cart.items.length === 0 ? (
    <p className="empty-msg">Your cart is feeling a bit light...</p>
  ) : (
    cart.items.map((item) => (
      <div key={item.id} className="cart-item">
        <div className="item-info">
          <span className="item-name">{item.menuItem?.name}</span>
          <span className="item-meta">Qty: {item.quantity} • Rs. {item.lineTotal}</span>
        </div>
        <button className="remove-btn" onClick={() => handleRemove(item.id)}>
          Remove
        </button>
      </div>
    ))
  )}

  {cart.items.length > 0 && (
    <>
      <div className="cart-summary">
        <span className="total-label">Grand Total: </span>
        <span className="total-price">Rs. {total.toFixed(2)}</span>
      </div>
      
      <div className="cart-actions">
        <Link to="/checkout" className="checkout-link">
          Proceed to Checkout
        </Link>
      </div>
    </>
  )}
</div>
  );
};

export default CustomerCartPage;

