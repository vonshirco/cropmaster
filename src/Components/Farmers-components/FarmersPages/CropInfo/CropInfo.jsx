/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CropInfo.css';

const CropInfo = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editCropId, setEditCropId] = useState(null);
  const [newCrop, setNewCrop] = useState({
    name: '',
    category: '',
    planting_requirements: '',
    irrigation_schedule: '',
    fertilizer_recommendations: '',
    pest_management: '',
    harvesting_techniques: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

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
      const formData = new FormData();
      formData.append('name', newCrop.name);
      formData.append('category', newCrop.category);
      formData.append('planting_requirements', newCrop.planting_requirements);
      formData.append('irrigation_schedule', newCrop.irrigation_schedule);
      formData.append('fertilizer_recommendations', newCrop.fertilizer_recommendations);
      formData.append('pest_management', newCrop.pest_management);
      formData.append('harvesting_techniques', newCrop.harvesting_techniques);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const token = localStorage.getItem('token');
      const response = await axios.post('https://tyktyk.pythonanywhere.com/cropinfo/crops/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        },
      });
      setCrops([...crops, response.data]);
      setNewCrop({
        name: '',
        category: '',
        planting_requirements: '',
        irrigation_schedule: '',
        fertilizer_recommendations: '',
        pest_management: '',
        harvesting_techniques: ''
      });
      setSelectedFile(null);
      setShowAddForm(false);
    } catch (error) {
      setError(error);
      console.error('Error adding crop:', error);
    }
  };

  const handleEditCrop = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newCrop.name);
      formData.append('category', newCrop.category);
      formData.append('planting_requirements', newCrop.planting_requirements);
      formData.append('irrigation_schedule', newCrop.irrigation_schedule);
      formData.append('fertilizer_recommendations', newCrop.fertilizer_recommendations);
      formData.append('pest_management', newCrop.pest_management);
      formData.append('harvesting_techniques', newCrop.harvesting_techniques);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
  
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://tyktyk.pythonanywhere.com/cropinfo/crops/${editCropId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        },
      });
      const updatedCrops = crops.map(crop => (crop.id === editCropId ? response.data : crop));
      setCrops(updatedCrops);
      setEditCropId(null);
      setNewCrop({
        name: '',
        category: '',
        planting_requirements: '',
        irrigation_schedule: '',
        fertilizer_recommendations: '',
        pest_management: '',
        harvesting_techniques: ''
      });
      setSelectedFile(null);
    } catch (error) {
      setError(error);
      console.error('Error updating crop:', error);
    }
  };

  const handleDeleteCrop = async (cropId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://tyktyk.pythonanywhere.com/cropinfo/crops/${cropId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const updatedCrops = crops.filter(crop => crop.id !== cropId);
      setCrops(updatedCrops);
    } catch (error) {
      setError(error);
      console.error('Error deleting crop:', error);
    }
  };

  const handleEditClick = (crop) => {
    setEditCropId(crop.id);
    setNewCrop({
      name: crop.name,
      category: crop.category,
      planting_requirements: crop.planting_requirements,
      irrigation_schedule: crop.irrigation_schedule,
      fertilizer_recommendations: crop.fertilizer_recommendations,
      pest_management: crop.pest_management,
      harvesting_techniques: crop.harvesting_techniques,
    });
    setShowAddForm(true);
  };

  return (
    <div className='crop-container'>
      <h1>Crop Information</h1>
      <div className='form-container'>
        <button className="add-crop-btn" onClick={() => setShowAddForm(true)}>Add Crop</button>
        {showAddForm && (
          <div className="dialog">
            <div className="dialog-content">
              <h2>{editCropId ? 'Edit Crop' : 'Add Crop'}</h2>
              <form onSubmit={editCropId ? handleEditCrop : handleAddCrop}>
                <label htmlFor="name">Name:</label>
                <input
                  type='text'
                  id="name"
                  placeholder='Enter crop name'
                  value={newCrop.name}
                  onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
                  required
                />
                <label htmlFor="category">Category:</label>
                <input
                  type='text'
                  id="category"
                  placeholder='Enter category'
                  value={newCrop.category}
                  onChange={(e) => setNewCrop({ ...newCrop, category: e.target.value })}
                  required
                />
                <label htmlFor="planting_requirements">Planting Requirements:</label>
                <textarea
                  id="planting_requirements"
                  placeholder='Enter planting requirements'
                  value={newCrop.planting_requirements}
                  onChange={(e) => setNewCrop({ ...newCrop, planting_requirements: e.target.value })}
                  style={{ minHeight: '40px' }}
                  required
                ></textarea>
                <label htmlFor="irrigation_schedule">Irrigation Schedule:</label>
                <textarea
                  id="irrigation_schedule"
                  placeholder='Enter irrigation schedule'
                  value={newCrop.irrigation_schedule}
                  onChange={(e) => setNewCrop({ ...newCrop, irrigation_schedule: e.target.value })}
                  style={{ minHeight: '40px' }}
                  required
                ></textarea>
                <label htmlFor="fertilizer_recommendations">Fertilizer Recommendations:</label>
                <textarea
                  id="fertilizer_recommendations"
                  placeholder='Enter fertilizer recommendations'
                  value={newCrop.fertilizer_recommendations}
                  onChange={(e) => setNewCrop({ ...newCrop, fertilizer_recommendations: e.target.value })}
                  style={{ minHeight: '40px' }}
                  required
                ></textarea>
                <label htmlFor="pest_management">Pest Management:</label>
                <textarea
                  id="pest_management"
                  placeholder='Enter pest management techniques'
                  value={newCrop.pest_management}
                  onChange={(e) => setNewCrop({ ...newCrop, pest_management: e.target.value })}
                  style={{ minHeight: '40px' }}
                  required
                ></textarea>
                <label htmlFor="harvesting_techniques">Harvesting Techniques:</label>
                <textarea
                  id="harvesting_techniques"
                  placeholder='Enter harvesting techniques'
                  value={newCrop.harvesting_techniques}
                  onChange={(e) => setNewCrop({ ...newCrop, harvesting_techniques: e.target.value })}
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
                    {editCropId ? 'Update Crop' : 'Add Crop'}
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
      <div className='crop-cards'>
        {crops.map((crop) => (
          <div key={crop.id} className="crop-card">
                <h2>{crop.name}</h2>
                {crop.image && <img src={crop.image} alt={crop.name} />}
                <div style={{display:"flex", flexDirection:"column", alignItems:"start", justifyContent:"flex-start"}}>
                <p><strong>Category:</strong> {crop.category}</p>
                <p><strong>Planting Requirements:</strong> {crop.planting_requirements}</p>
                <p><strong>Irrigation Schedule:</strong> {crop.irrigation_schedule}</p>
                <p><strong>Fertilizer Recommendations:</strong> {crop.fertilizer_recommendations}</p>
                <p><strong>Pest Management:</strong> {crop.pest_management}</p>
                <p><strong>Harvesting Techniques:</strong> {crop.harvesting_techniques}</p>
                <p><strong>Total Rating:</strong> {crop.total_rating}</p>
                <p><strong>Total Ratings Count:</strong> {crop.total_ratings_count}</p>
                <div className="button-container bg-black">
                  <button className="edit-btn" onClick={() => handleEditClick(crop)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteCrop(crop.id)}>Delete</button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropInfo;
