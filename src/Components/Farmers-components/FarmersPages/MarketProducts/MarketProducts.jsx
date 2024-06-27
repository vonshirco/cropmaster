import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MarketProducts.css';

const MarketProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debugging: check token value
        const response = await axios.get('https://tyktyk.pythonanywhere.com/market/products/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log('Response data:', response.data); // Debugging: check response data
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error('Error fetching products:', error); // Debugging: log error
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('category', newProduct.category);
      formData.append('price', newProduct.price);
      formData.append('description', newProduct.description);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const token = localStorage.getItem('token');
      const response = await axios.post('https://tyktyk.pythonanywhere.com/market/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        },
      });
      setProducts([...products, response.data]);
      setNewProduct({
        name: '',
        category: '',
        price: '',
        description: ''
      });
      setSelectedFile(null);
      setShowAddForm(false);
    } catch (error) {
      setError(error);
      console.error('Error adding product:', error);
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
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      setError(error);
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className='market-container'>
      <h1>Market Products</h1>
      <div className='form-container'>
        <button className="add-product-btn" onClick={() => setShowAddForm(true)}>Add Product</button>
        {showAddForm && (
          <div className="dialog">
            <div className="dialog-content">
              <h2>Add Product</h2>
              <form onSubmit={handleAddProduct}>
                <label htmlFor="name">Name:</label>
                <input
                  type='text'
                  id="name"
                  placeholder='Enter product name'
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />
                <label htmlFor="category">Category:</label>
                <input
                  type='text'
                  id="category"
                  placeholder='Enter category'
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  required
                />
                <label htmlFor="price">Price:</label>
                <input
                  type='text'
                  id="price"
                  placeholder='Enter price'
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                />
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  placeholder='Enter description'
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  style={{ minHeight: '40px' }}
                  required
                ></textarea>
                <label htmlFor="image">Image:</label>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  accept=".jpg, .jpeg, .png"
                />  
                <div className="button-container">
                  <button type='button' className='cancel-btn' onClick={() => setShowAddForm(false)}>
                    Cancel
                  </button>
                  <button type='submit' className='add-btn'>
                    Add Product
                  </button>
                </div>
              </form>
              {error && <div className="error-message">Error: {error.message}</div>}
            </div>
          </div>
        )}
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
      </div>
      <div className='product-cards'>
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            {product.image && <img src={product.image} alt={product.name} />}
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> ${product.price}</p>
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
