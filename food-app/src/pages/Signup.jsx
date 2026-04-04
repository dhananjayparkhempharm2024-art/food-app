import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/JsonServerApi'; // Ensure this handles the dynamic endpoints
import { FaEye, FaEyeSlash, FaUser, FaStore } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Signup = () => {
    const [role, setRole] = useState("CUSTOMER"); // Toggle state
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        restaurantName: "",
        description: "",
        address: "",
        cuisineType: "",
        restaurantPhone: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

  /*  const handleSubmit = async (e) => {
        e.preventDefault();

        if (userData.password !== userData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        // Prepare the payload based on the role
        const payload = {
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
        };

        if (role === "RESTAURANT") {
            payload.restaurantName = userData.restaurantName;
            payload.description = userData.description;
            payload.address = userData.address;
            payload.cuisineType = userData.cuisineType;
            payload.restaurantPhone = userData.restaurantPhone;
        }
        console.log(payload)
        try {
            // Adjust the endpoint dynamically based on the role
            const endpoint = `/auth/register/${role.toLowerCase()}`;
            const response = await register(endpoint, payload);

            if (response.data) {
                toast.success(`${role} registered successfully! Please login.`);
                navigate("/login");
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
            toast.error("Registration failed: " + (error.response?.data?.message || "Server Error"));
        }
    };*/const handleSubmit = async (e) => {
        e.preventDefault();

        if (userData.password !== userData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const payload = {
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
        };

        if (role === "RESTAURANT") {
            payload.restaurantName = userData.restaurantName;
            payload.description = userData.description;
            payload.address = userData.address;
            payload.cuisineType = userData.cuisineType;
            payload.restaurantPhone = userData.restaurantPhone;
        }

        try {
            const endpoint = `/api/auth/register/${role.toLowerCase()}`;

            const response = await register(endpoint, payload);

            if (response.status === 200 || response.status === 201) {
                toast.success(`${role} registered successfully! Please login.`);
                navigate("/login");
            } else {
                toast.error("Registration failed: " + (response.data?.message || "Check your details"));
            }

        } catch (error) {
            console.error("Signup Error:", error);

            const errorMessage = error.response?.data?.message || "Server Error. Please try again.";
            toast.error("Registration failed: " + errorMessage);


        }
    };

    return (
        <div className="signup-page-wrapper">
            <div className="signup-card">

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-header">
                        <h2>Create Account</h2>
                        <p>Join FoodExpress as a {role.toLowerCase()}!</p>
                    </div>

                    {/* Role Selection Toggle */}
                    <div className="role-selector">
                        <div
                            className={`role-option ${role === "CUSTOMER" ? "active" : ""}`}
                            onClick={() => setRole("CUSTOMER")}
                        >
                            <FaUser /> Customer
                        </div>
                        <div
                            className={`role-option ${role === "RESTAURANT" ? "active" : ""}`}
                            onClick={() => setRole("RESTAURANT")}
                        >
                            <FaStore /> Restaurant
                        </div>
                    </div>

                    {/* Common Fields */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" name="fullName" required value={userData.fullName} onChange={handleChange} placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" required value={userData.email} onChange={handleChange} placeholder="john@example.com" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Personal Phone</label>
                            <input type="text" name="phone" value={userData.phone} onChange={handleChange} placeholder="9876543210" />
                        </div>
                    </div>

                    {/* Conditionally Render Restaurant Fields */}
                    {role === "RESTAURANT" && (
                        <div className="restaurant-fields-animation">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Restaurant Name</label>
                                    <input type="text" name="restaurantName" required onChange={handleChange} placeholder="Pizza Palace" />
                                </div>
                                <div className="form-group">
                                    <label>Cuisine Type</label>
                                    <input type="text" name="cuisineType" onChange={handleChange} placeholder="Italian, Mexican" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" name="address" onChange={handleChange} placeholder="123 Foodie Street, Bangalore" />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Restaurant Contact</label>
                                    <input type="text" name="restaurantPhone" onChange={handleChange} placeholder="080-123456" />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text" name="description" onChange={handleChange} placeholder="Best pizza in town" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Password Fields */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password" required onChange={handleChange}
                                    autoComplete='new-password'
                                />
                                <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Confirm</label>
                            <div className="input-wrapper">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword" required onChange={handleChange}
                                    autoComplete='new-password'
                                />
                                <span className="toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="signup-btn">Register as {role.toLowerCase()}</button>

                    <div className="login-prompt">
                        Already have an account? <span onClick={() => navigate("/login")}>Login here</span>
                    </div>
                </form>

                <div className="signup-image">
                    <img src={role === "CUSTOMER" ? "https://images.unsplash.com/photo-1512621776951-a57141f2eefd" : "https://images.unsplash.com/photo-1555396273-367ea4eb4db5"} alt="Visual" />
                    <div className="image-overlay">
                        <h2>{role === "CUSTOMER" ? "Fresh Food" : "Grow Business"}</h2>
                        <p>{role === "CUSTOMER" ? "Delivered to your door." : "Partner with FoodExpress."}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;