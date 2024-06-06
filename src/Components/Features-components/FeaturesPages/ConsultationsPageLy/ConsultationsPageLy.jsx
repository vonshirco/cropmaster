import { useState } from 'react'
import HeaderLayout from '../../FeaturesLayout/HeaderLayout/HeaderLayout'
import SideBarLayout from '../../FeaturesLayout/SideBarLayout/SideBarLayout'
import Consultations from '../../Consultations/Consultations'

const ConsultationsPageLy = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className="user-body">
        <div className='grid-container'>
            <HeaderLayout OpenSidebar={OpenSidebar}/>
            <SideBarLayout openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <Consultations/>
        </div>
    </div>
    
  )
}

export default ConsultationsPageLy