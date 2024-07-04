/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MarketProducts.css';

const MarketProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://tyktyk.pythonanywhere.com/market/products/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const data = {
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://tyktyk.pythonanywhere.com/market/products/', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      setProducts([...products, response.data]);
      setNewProduct({
        name: '',
        price: '',
        description: '',
      });
      setShowAddForm(false);
    } catch (error) {
      setError('Error adding product');
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const data = {
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://tyktyk.pythonanywhere.com/market/products/${editProductId}/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      const updatedProducts = products.map((product) =>
        product.id === editProductId ? response.data : product
      );
      setProducts(updatedProducts);
      setEditProductId(null);
      setNewProduct({
        name: '',
        price: '',
        description: '',
      });
      setShowAddForm(false);
    } catch (error) {
      setError('Error updating product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://tyktyk.pythonanywhere.com/market/products/${productId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      setError('Error deleting product');
    }
  };

  const handleEditClick = (product) => {
    setEditProductId(product.id);
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description,
    });
    setShowAddForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className='market-products-container'>
      <h1 className='heading'>Market Products</h1>
      <div className='form-container'>
        <button className="add-product-btn" onClick={() => setShowAddForm(true)}>Add Product</button>
        {showAddForm && (
          <div className="dialog">
            <div className="dialog-content">
              <h2>{editProductId ? 'Edit Product' : 'Add Product'}</h2>
              <form onSubmit={editProductId ? handleEditProduct : handleAddProduct}>
                <label htmlFor="name">Name:</label>
                <input
                  type='text'
                  id="name"
                  name="name"
                  placeholder='Enter product name'
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="price">Price:</label>
                <input
                  type='text'
                  id="price"
                  name="price"
                  placeholder='Enter product price'
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder='Enter product description'
                  value={newProduct.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
                <div className="button-container">
                  <button type='button' className='cancel-btn' onClick={() => setShowAddForm(false)}>
                    Cancel
                  </button>
                  <button type='submit' className='add-btn'>
                    {editProductId ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>

              {error && <div className="error-message">Error: {error}</div>}
            </div>
          </div>
        )}
        {loading && <div>Loading...</div>}
      </div>
      <div className='product-list'>
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p><strong>Price:</strong> {product.price}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <div className="button-container">
              <button className="edit-btn" onClick={() => handleEditClick(product)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketProducts;
