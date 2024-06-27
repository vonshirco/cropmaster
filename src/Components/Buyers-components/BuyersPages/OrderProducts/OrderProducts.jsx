import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderProducts.css';

const OrderProducts = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://tyktyk.pythonanywhere.com/orders/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setOrders(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className='orders-container'>
      <h1>List of Orders</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div className='order-cards'>
        {orders.map((order) => (
          <div key={order.id} className='order-card'>
            <h3>{order.product_name}</h3>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Description:</strong> {order.description}</p>
            <p><strong>Total Cost:</strong> <span style={{ color: '#32CD32' }}>${parseFloat(order.total_cost).toFixed(2)}</span></p>
            <button className='add-to-cart-btn'>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderProducts;
