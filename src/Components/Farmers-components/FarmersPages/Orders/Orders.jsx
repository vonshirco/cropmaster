import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State for new product inputs
  const [newProduct, setNewProduct] = useState({
    product: '',
    quantity: '',
    description: ''
  });

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

  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://tyktyk.pythonanywhere.com/orders/',
        {
          product: newProduct.product,
          quantity: parseInt(newProduct.quantity),
          description: newProduct.description
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      setOrders([...orders, response.data]); // Update orders with the newly added product
      closeDialog();
    } catch (error) {
      setError(error);
    }
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    // Reset new product inputs
    setNewProduct({
      product: '',
      quantity: '',
      description: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  return (
    <div className='orders-container'>
      <h1>List of Orders</h1>
      <button className="add-product-btn" onClick={openDialog}>Add Product</button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div className='order-cards'>
        {orders.map((order) => (
          <div key={order.id} className='order-card'>
            <h3>{order.product_name}</h3>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Description:</strong> {order.description}</p>
            <p><strong>Total Cost:</strong> <span style={{ color: '#32CD32' }}>${parseFloat(order.total_cost).toFixed(2)}</span></p>
            <button className='edit-product-btn'>Edit Product</button>
          </div>
        ))}
      </div>

      {/* Dialog for adding a new product */}
      {isDialogOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <h2>Add Product to Order</h2>
            <form className="add-product-form" onSubmit={handleAddProduct}>
              <label htmlFor="product">Product ID:</label>
              <input
                type="text"
                id="product"
                name="product"
                value={newProduct.product}
                onChange={handleChange}
                required
              />
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleChange}
                required
              />
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                required
              ></textarea>
              {error && <div className="error-message">Error: {error.message}</div>}
              <div className="button-container">
                <button type="button" className="cancel-btn" onClick={closeDialog}>
                  Cancel
                </button>
                <button type="submit" className="add-btn">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
