import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/JsonServerApi';
import { Auth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  let { loginUser } = useContext(Auth);
  const [isLoading, setIsLoading] = useState(false);

  let [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  })

  let handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  }

  const handleReset = () => { // Added reset logic
    setUserDetails({ email: "", password: "" });
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(userDetails)
      const response = await login(userDetails);
      console.log(response.data);

      const token = response.data.token || response.data.data;

      loginUser(token);

      toast.success("Login successful!");
      navigate('/');
    } catch (err) {
      console.log(err)
      toast.error("Login failed: " + (err.response?.data?.message || "Server Error"));
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        {/* Left Side: Image */}
        <div className="login-image">
          {/* You can replace this with your actual logo or food image */}
          <img src="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=1170" alt="Login Visual" />
          <div className="image-overlay">
            <h2>FoodExpress</h2>
            <p>Freshness delivered to your doorstep.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <form onSubmit={handleLogin} className="login-form">
          <h2>Welcome Back</h2>
          <div className="form-group">
            <label>email</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              autoComplete='auto'
            />
          </div>
          <div className="form-group">
            <label>password</label>
            <input
              type="password"
              name="password"
              value={userDetails.password}
              onChange={handleChange}
              autoComplete='auto'
            />
          </div>
          <div className="button-group">
            <button type="submit" disabled={isLoading} className="login-btn">
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <button type="button" onClick={handleReset} className="reset-btn">
              Reset
            </button>
          </div>

          <div className="register-link">
            <p>Don't have an account? <span onClick={() => navigate('/signup')}>Register here</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};



export default Login;