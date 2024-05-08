import { useState } from 'react'
import './UsersDashboard.css'
import Header from '../FeaturesLayout/HeaderLayout/HeaderLayout'
import SideBar from '../FeaturesLayout/SideBarLayout/SideBarLayout'
import Home from '../FeaturesLayout/HomeLayout/HomeLayout'

const UsersDashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className="user-body">
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar}/>
            <SideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <Home />
        </div>
    </div>
    
  )
}

export default UsersDashboard