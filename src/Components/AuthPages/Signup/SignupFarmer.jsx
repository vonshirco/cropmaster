import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { Link as RouterLink } from 'react-router-dom';

const SignupFarmer = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  // const [role, setRole] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://tyktyk.pythonanywhere.com/api/register/', {
        username,
        password,
        repeat_password: repeatPassword,
        email,
        role: 'farmer',
        phone_number: phoneNumber,
        location,
      });

      if (response.status === 201) {
        navigate('/login');
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="signup-container" >
      <h2 style={{ fontSize: 18}}>Hello, Welcome!, create a Farmer's Account</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          placeholder="Repeat your password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="" disabled>Select your role</option>
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
          <option value="extension_officer">Extension Officer</option>
        </select> */}

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        {/* <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        /> */}

      <label htmlFor="location">Location</label>
        <select
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        >
          <option value="" disabled>Select your Region</option>
          <option value="Arusha">Arusha</option>
          <option value="Dar es Salaam">Dar es Salaam</option>
          <option value="Dodoma">Dodoma</option>
          <option value="Geita">Geita</option>
          <option value="Iringa">Iringa</option>
          <option value="Kagera">Kagera</option>
          <option value="Katavi">Katavi</option>
          <option value="Kigoma">Kigoma</option>
          <option value="Kilimanjaro">Kilimanjaro</option>
          <option value="Lindi">Lindi</option>
          <option value="Manyara">Manyara</option>
          <option value="Mara">Mara</option>
          <option value="Mbeya">Mbeya</option>
          <option value="Morogoro">Morogoro</option>
          <option value="Mtwara">Mtwara</option>
          <option value="Mwanza">Mwanza</option>
          <option value="Njombe">Njombe</option>
          <option value="Pwani">Pwani</option>
          <option value="Rukwa">Rukwa</option>
          <option value="Ruvuma">Ruvuma</option>
          <option value="Shinyanga">Shinyanga</option>
          <option value="Simiyu">Simiyu</option>
          <option value="Singida">Singida</option>
          <option value="Songwe">Songwe</option>
          <option value="Tabora">Tabora</option>
          <option value="Tanga">Tanga</option>
        </select>

        <button type="submit" className="btn dark-btn">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <RouterLink to="/login">
        <p style={{ marginTop: '20px', fontSize: '14px' }}>
          Already have an account? <a href="" style={{ color: '#4CAF50' }}>Log In</a>
        </p>
      </RouterLink>
      
      <RouterLink to="/">
        <p style={{ marginTop: '20px', fontSize: '14px' }}>
          Back to <a href="" style={{ color: '#4CAF50' }}>Home</a>
        </p>
      </RouterLink>
      
    </div>
  );
};

export default SignupFarmer;
