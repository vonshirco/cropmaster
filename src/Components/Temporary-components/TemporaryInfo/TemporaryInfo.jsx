import React, { useState, useEffect } from 'react';
import './TemporaryInfo.css';

const cropCategories = ['All', 'Crops', 'Fruits', 'Vegetables'];

const TemporaryInfo = () => {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await fetch('https://tyktyk.pythonanywhere.com/cropinfo/crops/', {
          headers: {
            'Accept': 'application/json',
            'X-CSRFToken': 'aZbybQ6HTlJUO0mHBHIiiP1oiSDgVT7pVABNi3ao01XphkH0JgKxTVk5Q1jioV0P'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch crop data');
        }
        const data = await response.json();
        setCrops(data);
        setFilteredCrops(data);
        setError(null);
      } catch (error) {
        setError('Error fetching crop data');
        console.error('Error fetching crop data:', error);
      }
    };

    fetchCrops();
  }, []);

  const handleCropCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    const filtered = crops.filter(crop => crop.category === category || category === 'All');
    setFilteredCrops(filtered);
  };

  return (
    <div className='crop-container'>
      <h1>Crop Information</h1>
      <div className='category-filter'>
        <select value={selectedCategory} onChange={handleCropCategoryChange}>
          {cropCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {error && <p>{error}</p>}
      <div className='crop-cards'>
        {filteredCrops.map((crop) => (
          <div key={crop.id} className='crop-card'>
            <img src={crop.image} alt={crop.name} />
            <h2>{crop.name}</h2>
            <p>{crop.description}</p>
            <span>{crop.state}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemporaryInfo;
