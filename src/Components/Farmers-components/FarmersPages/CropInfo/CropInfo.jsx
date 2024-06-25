import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CropInfo.css';

const CropInfo = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCrop, setNewCrop] = useState({
    name: '',
    category: '',
    description: {
      planting_requirements: '',
      irrigation_schedule: '',
      fertilizer_recommendations: '',
      pest_management: '',
      harvesting_techniques: ''
    }
  });

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://tyktyk.pythonanywhere.com/cropinfo/crops/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setCrops(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  const handleAddCrop = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://tyktyk.pythonanywhere.com/cropinfo/crops/', newCrop, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setCrops([...crops, response.data]);
      setNewCrop({
        name: '',
        category: '',
        description: {
          planting_requirements: '',
          irrigation_schedule: '',
          fertilizer_recommendations: '',
          pest_management: '',
          harvesting_techniques: ''
        }
      });
      setShowAddForm(false);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className='crop-container'>
      <h1>Crop Information</h1>
      <button onClick={() => setShowAddForm(true)}>Add Crop</button>
      {showAddForm && (
        <form onSubmit={handleAddCrop}>
          <input
            type='text'
            placeholder='Name'
            value={newCrop.name}
            onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
          />
          <input
            type='text'
            placeholder='Category'
            value={newCrop.category}
            onChange={(e) => setNewCrop({ ...newCrop, category: e.target.value })}
          />
          <input
            type='text'
            placeholder='Planting Requirements'
            value={newCrop.description.planting_requirements}
            onChange={(e) => setNewCrop({ ...newCrop, description: { ...newCrop.description, planting_requirements: e.target.value } })}
          />
          <input
            type='text'
            placeholder='Irrigation Schedule'
            value={newCrop.description.irrigation_schedule}
            onChange={(e) => setNewCrop({ ...newCrop, description: { ...newCrop.description, irrigation_schedule: e.target.value } })}
          />
          <input
            type='text'
            placeholder='Fertilizer Recommendations'
            value={newCrop.description.fertilizer_recommendations}
            onChange={(e) => setNewCrop({ ...newCrop, description: { ...newCrop.description, fertilizer_recommendations: e.target.value } })}
          />
          <input
            type='text'
            placeholder='Pest Management'
            value={newCrop.description.pest_management}
            onChange={(e) => setNewCrop({ ...newCrop, description: { ...newCrop.description, pest_management: e.target.value } })}
          />
          <input
            type='text'
            placeholder='Harvesting Techniques'
            value={newCrop.description.harvesting_techniques}
            onChange={(e) => setNewCrop({ ...newCrop, description: { ...newCrop.description, harvesting_techniques: e.target.value } })}
          />
          <button type='submit'>Submit</button>
        </form>
      )}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div className='crop-cards'>
        {crops.map((crop) => (
          <div key={crop.id} className="crop-card">
            <h2>{crop.name}</h2>
            <img src={crop.image} alt={crop.name} />
            <p><strong>Category:</strong> {crop.category}</p>
            <p><strong>Planting Requirements:</strong> {crop.description.planting_requirements}</p>
            <p><strong>Irrigation Schedule:</strong> {crop.description.irrigation_schedule}</p>
            <p><strong>Fertilizer Recommendations:</strong> {crop.description.fertilizer_recommendations}</p>
            <p><strong>Pest Management:</strong> {crop.description.pest_management}</p>
            <p><strong>Harvesting Techniques:</strong> {crop.description.harvesting_techniques}</p>
            <p><strong>Total Rating:</strong> {crop.total_rating}</p>
            <p><strong>Total Ratings Count:</strong> {crop.total_ratings_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropInfo;
