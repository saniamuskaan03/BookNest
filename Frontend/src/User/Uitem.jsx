import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Unavbar from './Unavbar';

const Uitem = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4000/item/${id}`)
      .then((resp) => {
        setItem(resp.data);
      })
      .catch(() => {
        console.log("Did not get data");
      });
  }, [id]);

  return (
    <div>
      <Unavbar />
      <br />
      {item && (
        <div>
          <div style={{ display: "flex", justifyContent: "center", height: "450px" }}>
            <img
              src={`http://localhost:4000/${item.itemImage}`}
              alt={`${item.title} Image`}
              style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
            />
          </div>

          <h1 className='text-center mt-4'> {item.title} - #{item._id.slice(3, 7)}</h1>

          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
            <div style={{ width: '38%', marginLeft: "150px" }}>
              <h2 style={{ color: "grey" }}><strong>Description</strong></h2>
              <hr style={{ height: "3px", backgroundColor: "black" }} />
              <p style={{ fontSize: "20px" }}>{item.description}</p>
            </div>
            <div style={{ marginRight: '300px' }}>
              <h2 style={{ color: "grey" }}><strong>Info</strong></h2>
              <hr style={{ height: "3px", backgroundColor: "black" }} />
              <p style={{ fontSize: "20px" }}>Title: {item.title}</p>
              <p style={{ fontSize: "20px" }}>Author: {item.author}</p>
              <p style={{ fontSize: "20px" }}>Genre: {item.genre}</p>
              <p style={{ fontSize: "20px" }}>Price: ${item.price}</p>
              <p style={{ fontSize: "20px" }}>Seller: {item.userName}</p>
            </div>
          </div>

          {/* Buy Now Button Centered */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <Link to={`/orderitem/${item._id}`} style={{ textDecoration: 'none' }}>
              <button
                style={{
                  backgroundColor: '#1e3a8a',
                  color: 'white',
                  fontSize: '18px',
                  padding: '12px 30px',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer',
                }}
              >
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Uitem;
