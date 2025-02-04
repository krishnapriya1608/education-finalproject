import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../Styles/login.css'

const AdminAuth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login/Register
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // 'admin' or 'teacher'
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Login request
        const response = await axios.post(
          "http://localhost:5020/api/admin/login",
          formData
        );

        const token = response.data.token;
        localStorage.setItem("token", token); // Store the JWT token in localStorage
        navigate("/admin1"); // Redirect to the dashboard
      } else {
        // Register request
        const response = await axios.post(
          "http://localhost:5020/api/admin/admin/register",
          formData
        );
        setMessage("Registration successful! Check your email for activation.");
        setIsLogin(true); // Switch to login after registration
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Request failed!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <hr className="underline" />

        {/* Toggle between Login and Register */}
        <div className="toggle-buttons">
          <button onClick={() => setIsLogin(true)} className={isLogin ? "active" : ""}>
            Login
          </button>
          <button onClick={() => setIsLogin(false)} className={!isLogin ? "active" : ""}>
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Show name field only in Register */}
          {!isLogin && (
            <div className="input-container">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required={!isLogin}
              />
            </div>
          )}

          {/* Email Field */}
          <div className="input-container">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-btn">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Success/Error Message */}
        {message && <p className="message">{message}</p>}

        {/* Switch between Login/Register */}
        <p className="signup-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <a href="#" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Signup now" : "Login now"}
          </a>
        </p>
      </div>

      {/* Side Banner */}
      <div className="side-banner">
        <p style={{ position: "relative", left: "6%", fontSize: "20px" }}>Admin Side</p>
      </div>
    </div>
  );
};

export default AdminAuth;
