import { useState } from 'react'
import './AdminPage.css'
import Header from './Admin-components/Header/Header'
import SideBar from './Admin-components/SideBar/SideBar'
import Home from './Admin-components/Home/Home'


const AdminPage = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className="admin-body">
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar}/>
            <SideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <Home />
        </div>
    </div>
    
  )
}

export default AdminPage