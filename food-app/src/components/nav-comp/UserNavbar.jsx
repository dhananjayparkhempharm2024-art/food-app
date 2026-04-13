import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Auth } from "../../context/AuthContext";
import "./UserNav.css"

const UserNavbar = () => {
	const { logoutUser, user } = useContext(Auth);
	const location = useLocation();


	const getLinkClass = (path) =>
		location.pathname === path ? "user-nav-item active" : "user-nav-item";

	return (
		<nav className="user-navbar">
			<h3 className="brand-logo">FoodExpress</h3>

			<div className="user-nav-links">
				<Link to="/" className={getLinkClass("/")}>Restaurants</Link>
				<Link to="/cart" className={getLinkClass("/cart")}>Cart</Link>
				<Link to="/orders" className={getLinkClass("/orders")}>My Orders</Link>

				{user && (
					<span className="user-profile-tag">
						Hi, {user.sub || user.username}
					</span>
				)}

				<button className="user-logout-btn" onClick={logoutUser}>
					Logout
				</button>
			</div>
		</nav>
	);
};

export default UserNavbar;

