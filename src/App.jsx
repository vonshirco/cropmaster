import React from 'react';
import LandingPage from './Components/LandingPage';
import Login from './Components/Pages/Login/Login';
import Signup from './Components/Pages/Signup/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
     <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </div>
  );
}

export default App