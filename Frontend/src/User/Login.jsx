// src/User/Login.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/login", { email, password });

      if (res.data.Status === "Success") {
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("userName", res.data.user.name);
         localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/uhome");
      } else {
        alert("Login failed. Please check credentials.");
      }
    } catch (err) {
      console.error("User login error:", err);
      alert("Server error during login");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">User Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="userEmail" className="form-label">Email address</label>
            <input
              type="email"
              id="userEmail"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userPassword" className="form-label">Password</label>
            <input
              type="password"
              id="userPassword"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
        </form>

        <div className="text-center">
          <p className="mb-1">Don’t have a user account?</p>
          <Link to="/signup" className="btn btn-outline-info btn-sm mb-2">User Signup</Link>

          <hr />

          <p className="mb-1">Login as Admin or Seller:</p>
          <div className="d-flex justify-content-between">
            <Link to="/alogin" className="btn btn-outline-dark btn-sm">Admin Login</Link>
            <Link to="/slogin" className="btn btn-outline-success btn-sm">Seller Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
