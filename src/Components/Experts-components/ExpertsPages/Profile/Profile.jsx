import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://tyktyk.pythonanywhere.com/api/user-details/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="profile-container">
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">Error: {error.message}</div>}
      {!loading && !error && (
        <div className="profile-card">
          <h1>Profile: {user.first_name} {user.last_name}</h1>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Phone Number:</strong> {user.phone_number}</p>
          <p><strong>Location:</strong> {user.location}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
