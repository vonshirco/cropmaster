import React from 'react'
import SideNavigation from './Features-components/SideNavigation/SideNavigation'; 
import Welcome from './Features-components/Welcome/Welcome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const UsersPage = () => {
  return (
    <div>
        <SideNavigation>
        <Routes>
          <Route path='/' element={<Welcome />}/>
        </Routes>
        </SideNavigation>
    </div>
  )
}

export default UsersPage