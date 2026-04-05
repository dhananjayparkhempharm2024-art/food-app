import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Auth } from "../../context/AuthContext";

const UserNavbar = () => {
  const { logoutUser, user } = useContext(Auth);
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? { fontWeight: 700 } : undefined);

  return (
	<nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid #e5e7eb" }}>
	  <h3 style={{ margin: 0 }}>FoodExpress</h3>
	  <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
		<Link to="/" style={isActive("/")}>Restaurants</Link>
		<Link to="/cart" style={isActive("/cart")}>Cart</Link>
		<Link to="/orders" style={isActive("/orders")}>My Orders</Link>
		<span style={{ fontSize: 12, color: "#6b7280" }}>{user?.sub || user?.username}</span>
		<button onClick={logoutUser}>Logout</button>
	  </div>
	</nav>
  );
};

export default UserNavbar;

