import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Auth } from "../../context/AuthContext";
import "./ResNav.css"

const RestaurantNavbar = () => {
  const { logoutUser } = useContext(Auth);
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? { fontWeight: 700 } : undefined);
const getNavLinkClass = (path) => 
    location.pathname === path ? "nav-item active" : "nav-item";

  return (
    <nav className="admin-navbar">
      <h3 className="admin-logo">Restaurant Panel</h3>
      
      <div className="admin-nav-links">
        <Link to="/" className={getNavLinkClass("/")}>Overview</Link>
        <Link to="/menu" className={getNavLinkClass("/menu")}>Menu</Link>
        <Link to="/orders" className={getNavLinkClass("/orders")}>Orders</Link>
        <Link to="/delivery-men" className={getNavLinkClass("/delivery-men")}>Delivery Men</Link>
        
        <button className="logout-btn" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </nav>
  );
};  

export default RestaurantNavbar;

