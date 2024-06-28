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
    const data = {
          name: newCrop.name,
          category: newCrop.category,
          description: [{
            planting_requirements: newCrop.planting_requirements,
            irrigation_schedule: newCrop.irrigation_schedule,
            fertilizer_recommendations: newCrop.fertilizer_recommendations,
            pest_management: newCrop.pest_management,
            harvesting_techniques: newCrop.harvesting_techniques,
            }],
          image: null
        };
      console.log(data);
    try {
      const formData = new FormData();
      for (const key in newCrop) {
        formData.append(key, newCrop[key]);
      }
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
  
      // Debugging log
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
  
      const token = localStorage.getItem('token');
      const response = await axios.post('https://tyktyk.pythonanywhere.com/cropinfo/crops/', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      console.log(response)
  
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
  
  
  // console.log(crops.map(crop => crop.slug))
  const handleEditCrop = async (e) => {
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

      const data = {
        name: newCrop.name,
        category: newCrop.category,
        description: [{
          planting_requirements: newCrop.planting_requirements,
          irrigation_schedule: newCrop.irrigation_schedule,
          fertilizer_recommendations: newCrop.fertilizer_recommendations,
          pest_management: newCrop.pest_management,
          harvesting_techniques: newCrop.harvesting_techniques,
          }],
      };

      console.log(data)
  
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://tyktyk.pythonanywhere.com/cropinfo/crops/${editCropId}/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      const updatedCrops = crops.map(crop => (crop.slug === editCropId ? response.data : crop));
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
      const updatedCrops = crops.filter(crop => crop.slug !== cropId);
      setCrops(updatedCrops);
    } catch (error) {
      setError(error);
      console.error('Error deleting crop:', error);
    }
  };

  const handleEditClick = (crop) => {
    setEditCropId(crop.slug);
    setNewCrop({
      name: crop.name,
      category: crop.category,
      planting_requirements: crop.description[0].planting_requirements,
      irrigation_schedule: crop.description[0].irrigation_schedule,
      fertilizer_recommendations: crop.description[0].fertilizer_recommendations,
      pest_management: crop.description[0].pest_management,
      harvesting_techniques: crop.description[0].harvesting_techniques,
    });
    setShowAddForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCrop((prevCrop) => {
      const updatedCrop = {
        ...prevCrop,
        [name]: value,
      };
      return updatedCrop;
    });
  };

  return (
    <div className='crop-container'>
      <h1>Crop Information</h1>
      <div className='form-container'>
        <button className="add-crop-btn" onClick={() => setShowAddForm(true)}>Add Crop</button>
        {showAddForm && (
          <div className="dialog">
            <div className="dialog-content md:w-[40vw]">
              <h2>{editCropId ? 'Edit Crop' : 'Add Crop'}</h2>
              <form onSubmit={editCropId ? handleEditCrop : handleAddCrop} className='h-[60vh] overflow-y-auto md:p-2'>
              <label htmlFor="name">Name:</label>
              <input
                type='text'
                id="name"
                name="name"
                placeholder='Enter crop name'
                value={newCrop.name}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="category">Category:</label>
              <input
                type='text'
                id="category"
                name="category"
                placeholder='Enter category'
                value={newCrop.category}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="planting_requirements">Planting Requirements:</label>
              <textarea
                id="planting_requirements"
                name="planting_requirements"
                placeholder='Enter planting requirements'
                value={newCrop.planting_requirements}
                onChange={handleInputChange}
                style={{ minHeight: '40px' }}
                required
              ></textarea>
              <label htmlFor="irrigation_schedule">Irrigation Schedule:</label>
              <textarea
                id="irrigation_schedule"
                name="irrigation_schedule"
                placeholder='Enter irrigation schedule'
                value={newCrop.irrigation_schedule}
                onChange={handleInputChange}
                style={{ minHeight: '40px' }}
                required
              ></textarea>
              <label htmlFor="fertilizer_recommendations">Fertilizer Recommendations:</label>
              <textarea
                id="fertilizer_recommendations"
                name="fertilizer_recommendations"
                placeholder='Enter fertilizer recommendations'
                value={newCrop.fertilizer_recommendations}
                onChange={handleInputChange}
                style={{ minHeight: '40px' }}
                required
              ></textarea>
              <label htmlFor="pest_management">Pest Management:</label>
              <textarea
                id="pest_management"
                name="pest_management"
                placeholder='Enter pest management techniques'
                value={newCrop.pest_management}
                onChange={handleInputChange}
                style={{ minHeight: '40px' }}
                required
              ></textarea>
              <label htmlFor="harvesting_techniques">Harvesting Techniques:</label>
              <textarea
                id="harvesting_techniques"
                name="harvesting_techniques"
                placeholder='Enter harvesting techniques'
                value={newCrop.harvesting_techniques}
                onChange={handleInputChange}
                style={{ minHeight: '40px' }}
                required
              ></textarea>
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
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
        {/* {error && <div>Error: {error.message}</div>} */}
      </div>
      <div className='crop-cards flex flex-wrap justify-start'>
        {crops.map((crop) => (
          <div key={crop.id} className="crop-card hover:scale-105 text-left transition h-[500px] overflow-y-auto ease-in-out duration-500 cursor-pointer">
                <h2 className='text-green-600 font-bold text-center uppercase'>{crop.name}</h2>
                {/* {crop.image && <img src={crop.image} alt={crop.name} />} */}
                <div style={{display:"flex", flexDirection:"column", alignItems:"start", justifyContent:"flex-start",}}>
                <p><strong>Category:</strong> {crop.category}</p>
                <p><strong>Planting Requirements:</strong> {crop.description[0].planting_requirements}</p>
                <p><strong>Irrigation Schedule:</strong> {crop.description[0].irrigation_schedule}</p>
                <p><strong>Fertilizer Recommendations:</strong> {crop.description[0].fertilizer_recommendations}</p>
                <p><strong>Pest Management:</strong> {crop.description[0].pest_management}</p>
                <p><strong>Harvesting Techniques:</strong> {crop.description[0].harvesting_techniques}</p>
                <p><strong>Total Rating:</strong> {crop.description[0].total_rating}</p>
                <p><strong>Total Ratings Count:</strong> {crop.description[0].total_ratings_count}</p>
                <div className="button-container w-full flex justify-between">
                  <button className="edit-btn" onClick={() => handleEditClick(crop)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteCrop(crop.slug)}>Delete</button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropInfo;
