import React from 'react'
// import SideNavigation from './Features-components/SideNavigation/SideNavigation'; 
// import Welcome from './Features-components/Welcome/Welcome';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersDashboard from './Features-components/UsersDashboard/UsersDashboard'

const UsersPage = () => {
  return (
    <div>
        {/* <SideNavigation>
        <Routes>
          <Route path='/' element={<Welcome />}/>
        </Routes>
        </SideNavigation> */}
        <UsersDashboard />
    </div>
  )
}

export default UsersPage