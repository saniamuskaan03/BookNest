import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css"; // Keep your existing styling

const Slogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/slogin", {
        email,
        password,
      });

      const res = response.data;

      if (res.success) {
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);
        navigate("/shome");
      } else {
        alert(res.message || "Login failed");
      }
    } catch (error) {
      console.error("Seller login error:", error);
      alert("An error occurred during seller login.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Seller Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/ssignup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Slogin;
