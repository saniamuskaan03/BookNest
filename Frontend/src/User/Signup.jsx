// src/User/Signup.jsx

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/signup", { name, email, password });

      if (res.data === "  Account Created") {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert(res.data || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Server error during signup");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">User Signup</h3>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 mb-3">Signup</button>
        </form>

        <div className="text-center">
          <p className="mb-1">Already have a user account?</p>
          <Link to="/login" className="btn btn-outline-primary btn-sm mb-2">User Login</Link>

          <hr />

          <p className="mb-1">Signup/Login as:</p>
          <div className="d-flex justify-content-between">
            <Link to="/slogin" className="btn btn-outline-success btn-sm">Seller Login</Link>
            <Link to="/alogin" className="btn btn-outline-dark btn-sm">Admin Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
