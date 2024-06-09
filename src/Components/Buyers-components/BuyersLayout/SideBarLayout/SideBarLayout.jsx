import React, { useEffect } from 'react'
import './SideBarLayout.css'
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs'
import {LuFlower2} from 'react-icons/lu'
import { GiButterflyFlower } from "react-icons/gi";
import { MdOutlineForum, MdDashboard } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { Link } from 'react-router-dom';

const SideBarLayout = ({ openSidebarToggle, OpenSidebar }) => {

  return (
   <aside id='sidebarlayout' className={openSidebarToggle ? "sidebarlayout-responsive" : ""}>
      <div className="sidebarlayout-title">
        <div className="sidebarlayout-brand">
          <Link to='/'><h3 className='side-logo'>CROPMASTER</h3></Link>
        </div>
        <span className='side_icon side_close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebarlayout-list'>

        <li className='sidebarlayout-list-item'>
          <Link to='/'><GiButterflyFlower className='icon'/> Crops Information</Link>
        </li>

        <li className='sidebarlayout-list-item'>
          <Link to='/MarketProducts'><BsListCheck className='icon'/> Markert Products</Link>
        </li>

        <li className='sidebarlayout-list-item'>
          <Link to='/OrderProducts'><BsListCheck className='icon'/> Orders Products</Link>
        </li>

        <li className='sidebarlayout-list-item'>
          <Link to='/Forum'><MdOutlineForum className='icon'/> Forum Discussions</Link>
        </li>
        
        <li className='sidebarlayout-list-item'>
          <Link to='/Consultations'> <GrArticle className='icon'/> Consultations</Link>
        </li>

        <li className='sidebarlayout-list-item'>
          <Link to='/admin'><MdDashboard className='icon'/> Analytics</Link>
        </li>
      </ul>
   </aside>
  )
}

export default SideBarLayout