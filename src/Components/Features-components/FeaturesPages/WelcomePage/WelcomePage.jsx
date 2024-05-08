import { useState } from 'react'
import './WelcomePage.css'
import HeaderLayout from '../../FeaturesLayout/HeaderLayout/HeaderLayout'
import SideBarLayout from '../../FeaturesLayout/SideBarLayout/SideBarLayout'
import HomeLayout from '../../FeaturesLayout/HomeLayout/HomeLayout'

const WelcomePage = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className="user-body">
        <div className='grid-container'>
            <HeaderLayout OpenSidebar={OpenSidebar}/>
            <SideBarLayout openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <HomeLayout />
        </div>
    </div>
    
  )
}

export default WelcomePage