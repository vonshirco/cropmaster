import { useState } from 'react'
import HeaderLayout from '../../FeaturesLayout/HeaderLayout/HeaderLayout'
import SideBarLayout from '../../FeaturesLayout/SideBarLayout/SideBarLayout'
import Articles from '../../Articles/Articles'

const ArticlesPageLy = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className="user-body">
        <div className='grid-container'>
            <HeaderLayout OpenSidebar={OpenSidebar}/>
            <SideBarLayout openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <Articles/>
        </div>
    </div>
    
  )
}

export default ArticlesPageLy