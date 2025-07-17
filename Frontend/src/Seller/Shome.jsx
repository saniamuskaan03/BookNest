// src/Seller/Shome.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Snavbar from './Snavbar';
import Footer from '../Componenets/Footer';

function Shome() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const sellerId = localStorage.getItem('sellerId');
  const sellerName = localStorage.getItem('sellerName');

  useEffect(() => {
    if (sellerId) {
      axios.get(`http://localhost:4000/getitem/${sellerId}`)
        .then((response) => setItems(response.data))
        .catch((error) => console.error('Error fetching items:', error));

      axios.get(`http://localhost:4000/getsellerorders/${sellerId}`)
        .then((response) => setOrders(response.data))
        .catch((error) => console.error('Error fetching orders:', error));
    }
  }, [sellerId]);

  const totalItems = items.length;
  const totalOrders = orders.length;

  const chartData = [
    { name: 'Items', value: totalItems },
    { name: 'Orders', value: totalOrders },
  ];

  return (
    <div>
      <Snavbar />
      <br />
      <h3 className="text-3xl font-semibold mb-4 text-center">Welcome, {sellerName}!</h3>
      
      <Card body style={{ backgroundColor: "wheat", width: "80%", margin: "0 auto", marginTop: "20px", height: "580px" }}>
        <div className="d-flex justify-content-around">
          <Link to="/myproducts" style={{ textDecoration: "none" }}>
            <div className="w-64 h-32 bg-success rounded-lg shadow p-3 text-white text-center">
              <h5>Items</h5>
              <p className="h4">{totalItems}</p>
            </div>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <div className="w-64 h-32 bg-warning rounded-lg shadow p-3 text-white text-center">
              <h5>Total Orders</h5>
              <p className="h4">{totalOrders}</p>
            </div>
          </Link>
        </div>

        <div style={{ marginTop: "80px", textAlign: "center" }}>
          <BarChart width={400} height={300} data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" barSize={50} />
          </BarChart>
        </div>
      </Card>
      <br />
      <Footer />
    </div>
  );
}

export default Shome;
