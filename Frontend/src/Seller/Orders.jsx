import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Snavbar from './Snavbar';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [sellerId, setSellerId] = useState(null);

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData && userData.id) {
        setSellerId(userData.id);
      } else {
        console.warn("No user found in localStorage");
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (sellerId) {
      axios
        .get(`http://localhost:4000/getsellerorders/${sellerId}`)
        .then((response) => setOrders(response.data))
        .catch((error) => console.error('Error fetching orders: ', error));
    }
  }, [sellerId]);

  const calculateStatus = (Delivery) => {
    const currentDate = new Date();
    const deliveryDate = new Date(Delivery);
    return deliveryDate >= currentDate ? 'On the Way' : 'Delivered';
  };

  return (
    <div>
      <Snavbar />
      <br />
      <h3 className="text-3xl font-semibold mb-4 text-center">Orders Received</h3>

      <div>
        {orders.length === 0 ? (
          <p className="text-center">No orders received yet.</p>
        ) : (
          orders.map((item) => {
            const status = calculateStatus(item.Delivery);
            return (
              <Card
                key={item._id}
                className="mb-4 mx-auto"
                style={{ width: '90%', padding: '15px', backgroundColor: '#f8f9fa' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '10px' }}>
                  <img
                    src={`http://localhost:4000/${item.itemImage}`}
                    alt="Book"
                    style={{ height: '80px', objectFit: 'cover' }}
                  />
                  <div><strong>Product:</strong><p>{item.booktitle}</p></div>
                  <div><strong>Order ID:</strong><p>{item._id.slice(0, 10)}</p></div>
                  <div><strong>Customer:</strong><p>{item.userName}</p></div>
                  <div><strong>Address:</strong><p>{item.flatno}, {item.city}, {item.state} ({item.pincode})</p></div>
                  <div><strong>Booking:</strong><p>{new Date(item.BookingDate).toLocaleDateString()}</p></div>
                  <div><strong>Delivery:</strong><p>{new Date(item.Delivery).toLocaleDateString()}</p></div>
                  <div><strong>Warranty:</strong><p>1 year</p></div>
                  <div><strong>Price:</strong><p>₹{item.totalamount}</p></div>
                  <div><strong>Status:</strong><p>{status}</p></div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Orders;
