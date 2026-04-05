import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Auth } from "../../context/AuthContext";

const RestaurantNavbar = () => {
  const { logoutUser } = useContext(Auth);
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? { fontWeight: 700 } : undefined);

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid #e5e7eb" }}>
      <h3 style={{ margin: 0 }}>Restaurant Panel</h3>
      <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
        <Link to="/" style={isActive("/")}>Overview</Link>
        <Link to="/menu" style={isActive("/menu")}>Menu</Link>
        <Link to="/orders" style={isActive("/orders")}>Orders</Link>
        <Link to="/delivery-men" style={isActive("/delivery-men")}>Delivery Men</Link>
        <button onClick={logoutUser}>Logout</button>
      </div>
    </nav>
  );
};

export default RestaurantNavbar;

