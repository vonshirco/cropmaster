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
            {/* <LuFlower2 className='side_icon_header'/>*/} <a href="/"><h3 className='side-logo'>CROPMASTER</h3> </a>
        </div>
        <span className='side_icon side_close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebarlayout-list'>
        <li className='sidebarlayout-list-item'>
          <a href="/CropInfo">
            <GiButterflyFlower className='icon'/> Crops
          </a>
        </li>
        <li className='sidebarlayout-list-item'>
          <a href="/MarketingOpportunity">
            <BsListCheck className='icon'/> Markert
          </a>
        </li>
        <li className='sidebarlayout-list-item'>
          <a href="/Forum">
            <MdOutlineForum className='icon'/> Forum
          </a>
        </li>
        
        <li className='sidebarlayout-list-item'>
          <a href="/Articles">
            <GrArticle className='icon'/> Seek Advice
          </a>
        </li>
        <li className='sidebarlayout-list-item'>
          <a href="/admin">
            <MdDashboard className='icon'/> Analytics
          </a>
        </li>
      </ul>
   </aside>
  )
}

export default SideBarLayout