import React from 'react'
import './SideBarLayout.css'
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs'
import {LuFlower2} from 'react-icons/lu'
import { GiButterflyFlower } from "react-icons/gi";
import { MdOutlineForum, MdDashboard } from "react-icons/md";
import { GrArticle } from "react-icons/gr";

const SideBarLayout = ({openSidebarToggle, OpenSidebar}) => {
  return (
   <aside id='sidebarlayout' className={openSidebarToggle ? "sidebarlayout-responsive" : ""}>
      <div className="sidebarlayout-title">
        <div className="sidebarlayout-brand">
            {/* <LuFlower2 className='side_icon_header'/>*/} <h3 className='side-logo'>CROP MASTER</h3> 
        </div>
        <span className='side_icon side_close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebarlayout-list'>
        <li className='sidebarlayout-list-item'>
          <a href="">
            <GiButterflyFlower className='icon'/> Crops
          </a>
        </li>
        <li className='sidebarlayout-list-item'>
          <a href="">
            <BsListCheck className='icon'/> Markert
          </a>
        </li>
        <li className='sidebarlayout-list-item'>
          <a href="">
            <MdOutlineForum className='icon'/> Forum
          </a>
        </li>
        
        <li className='sidebarlayout-list-item'>
          <a href="">
            <GrArticle className='icon'/> Articles
          </a>
        </li>
        <li className='sidebarlayout-list-item'>
          <a href="">
            <MdDashboard className='icon'/> Dashboard
          </a>
        </li>
      </ul>
   </aside>
  )
}

export default SideBarLayout