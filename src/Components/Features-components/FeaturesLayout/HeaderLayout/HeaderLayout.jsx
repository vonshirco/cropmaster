import React from 'react'
import './HeaderLayout.css'
import {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify} from 'react-icons/bs'

const HeaderLayout = ({OpenSidebar}) => {
  return (
       <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            <a href="/Profile">
                <BsPersonCircle className='icon'/>
            </a>
        </div>
    </header>
  )
}

export default HeaderLayout