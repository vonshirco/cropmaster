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
        const response = await axios.get('https://tyktyk.pythonanywhere.com/products/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://tyktyk.pythonanywhere.com/products/', newProduct, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: '', description: '' });
      setShowAddForm(false);
    } catch (error) {
      setError(error);
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://tyktyk.pythonanywhere.com/products/${editProductId}/`, newProduct, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      const updatedProducts = products.map(product => (product.id === editProductId ? response.data : product));
      setProducts(updatedProducts);
      setEditProductId(null);
      setNewProduct({ name: '', price: '', description: '' });
    } catch (error) {
      setError(error);
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://tyktyk.pythonanywhere.com/products/${productId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      setError(error);
      console.error('Error deleting product:', error);
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
    <div className="market-products-container">
      <h1 className='heading'>Market Products</h1>
      <div className="form-container">
        <button className="add-product-btn" onClick={() => setShowAddForm(true)}>Add Product</button>
        {showAddForm && (
          <div className="dialog">
            <div className="dialog-content">
              <h2>{editProductId ? 'Edit Product' : 'Add Product'}</h2>
              <form onSubmit={editProductId ? handleEditProduct : handleAddProduct}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Enter product price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter product description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
                <div className="button-container">
                  <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="add-btn">
                    {editProductId ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
              {error && <div className="error-message">Error: {error.message}</div>}
            </div>
          </div>
        )}
        {loading && <div>Loading...</div>}
      </div>
      <div className="product-cards">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">Price: ${product.price}</p>
            <p className="product-description">{product.description}</p>
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
