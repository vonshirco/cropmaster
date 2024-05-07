import React from 'react';
import LandingPage from './Components/LandingPage';
import UsersPage from './Components/UsersPage';
import Login from './Components/Pages/Login/Login';
import Signup from './Components/Pages/Signup/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Forum from './Components/Features-components/Forum/Forum';
import CropInfo from './Components/Features-components/CropInfo/CropInfo';
import Profile from './Components/Features-components/Profile/Profile';
import Articles from './Components/Features-components/Articles/Articles';
import MarketingOpportunity from './Components/Features-components/MarketingOpportunity/MarketingOpportunity';

const App = () => {
  return (
     <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path='/users-page' element={<UsersPage />}/>
          <Route path='/CropInfo' element={<CropInfo />}/>
          <Route path='/Forum' element={<Forum />}/>
          <Route path='/Profile' element={<Profile />}/>
          <Route path='/Articles' element={<Articles />}/>
          <Route path='/MarketingOpportunity' element={<MarketingOpportunity />}/>


          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </div>
  );
}

export default App