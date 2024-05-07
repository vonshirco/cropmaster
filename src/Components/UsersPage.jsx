import React from 'react'
import SideNavigation from './Features-components/SideNavigation/SideNavigation'; 
import Home from './Features-components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const UsersPage = () => {
  return (
    <div>
        <SideNavigation>
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
        </SideNavigation>
    </div>
  )
}

export default UsersPage