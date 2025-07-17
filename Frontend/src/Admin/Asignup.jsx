import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

const Asignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/asignup", {
        name,
        email,
        password,
      });

      if (response.data === "Already have an account") {
        alert("Account already exists. Please login.");
        navigate("/alogin");
      } else {
        alert("Account created successfully!");
        navigate("/alogin");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Signup</h2>
        <form onSubmit={handleSignup}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            className="login-input"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Sign Up</button>
        </form>
        <p className="signup-link">Already have an admin account?</p>
        <button className="alt-button" onClick={() => navigate("/alogin")}>Admin Login</button>
        <hr />
        <p>Login as Seller or User:</p>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button className="alt-button" onClick={() => navigate("/slogin")}>Seller Login</button>
          <button className="alt-button" onClick={() => navigate("/login")}>User Login</button>
        </div>
      </div>
    </div>
  );
};

export default Asignup;
