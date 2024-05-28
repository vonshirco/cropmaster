import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './Components/LandingPage';
import UsersPage from './Components/UsersPage';
import Login from './Components/Pages/Login/Login';
import Signup from './Components/Pages/Signup/Signup';
import AdminPage from './Components/AdminPage';

import CropInfoPage from './Components/Features-components/FeaturesPages/CropInfoPage/CropInfoPage'
import MarketingOpportunityPage from './Components/Features-components/FeaturesPages/CropInfoPage/CropInfoPage'
import MarketPage from './Components/Features-components/FeaturesPages/MarketPage';
import ForumPageLy from './Components/Features-components/FeaturesPages/ForumPageLy/ForumPageLy';
import ArticlesPageLy from './Components/Features-components/FeaturesPages/ArticlesPageLy/ArticlesPageLy'
import ProfilePageLy from './Components/Features-components/FeaturesPages/ProfilePageLy /ProfilePageLy';

import Profile from './Components/Features-components/Profile/Profile';


const App = () => {
  return (
     <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path='/users-page' element={<UsersPage />}/>
          <Route path='/CropInfo' element={<CropInfoPage />}/>
          <Route path='/MarketingOpportunity' element={<MarketPage />}/>
          <Route path='/Forum' element={<ForumPageLy />}/>
          <Route path='/Articles' element={<ArticlesPageLy />}/>
          <Route path='/Profile' element={<ProfilePageLy />}/>
          
          <Route path='/admin' element={<AdminPage/>}/>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </div>
  );
}

export default App