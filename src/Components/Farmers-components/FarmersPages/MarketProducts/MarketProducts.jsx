import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MarketProducts.css';

const MarketProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className='market-container'>
      <h1>Products Available in the Marketplace</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div className='product-cards'>
        {products.map((product) => (
          <div key={product.id} className='product-card'>
            <img className="product-image" src={product.image} alt={product.product_name} />
            <div className="product-info">
              <h3 className="product-name">{product.product_name}</h3>
              <p className="product-price" style={{ color: '#32CD32' }}>${parseFloat(product.price).toFixed(2)}</p>
              <p className="product-description">{product.description}</p>
              <p className={`availability ${product.available ? 'available' : ''}`}>
                {product.available ? 'Available' : 'Out of Stock'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketProducts;
