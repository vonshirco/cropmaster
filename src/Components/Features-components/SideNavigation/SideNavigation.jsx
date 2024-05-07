import React, { useState } from 'react';
import './SideNavigation.css'
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
          path:"/Profile",
          name:"Profile",
          icon:<FaUserAlt/>
        },
        {
            path:"/CropInfo",
            name:"Crops",
            icon:<FaTh/>
        },
        {
            path:"/MarketingOpportunity",
            name:"Marketing",
            icon:<FaShoppingBag/>
        },
        {
            path:"/Forum",
            name:"Forum",
            icon:<FaCommentAlt/>
        },
        {
            path:"/Articles",
            name:"Articles",
            icon:<FaRegChartBar/>
        }
        
    ]
    return (
      <div>
        <h1>Header Comes here</h1>
        <div className="side-container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
        <h1>Footer</h1>
      </div>
    );
};

export default Sidebar;