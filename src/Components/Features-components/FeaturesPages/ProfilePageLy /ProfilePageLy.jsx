import { useState } from 'react'
import HeaderLayout from '../../FeaturesLayout/HeaderLayout/HeaderLayout'
import SideBarLayout from '../../FeaturesLayout/SideBarLayout/SideBarLayout'
import Profile from '../../Profile/Profile'

const ProfilePageLy = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className="user-body">
        <div className='grid-container'>
            <HeaderLayout OpenSidebar={OpenSidebar}/>
            <SideBarLayout openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <Profile/>
        </div>
    </div>
    
  )
}

export default ProfilePageLy