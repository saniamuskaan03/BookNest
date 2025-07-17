import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Alogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/alogin", { email, password });

      if (res.data.Status === "Success") {
        navigate("/ahome");
      } else {
        alert("Login failed. Please check credentials.");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      alert("Server error during login");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Admin Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
        </form>

        {/* 🔗 Navigation links */}
        <div className="text-center">
          <p className="mb-1">Don’t have an admin account?</p>
          <Link to="/asignup" className="btn btn-outline-primary btn-sm mb-2">Admin Signup</Link>

          <hr />

          <p className="mb-1">Login as Seller or User:</p>
          <div className="d-flex justify-content-between">
            <Link to="/slogin" className="btn btn-outline-success btn-sm">Seller Login</Link>
            <Link to="/login" className="btn btn-outline-info btn-sm">User Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alogin;
