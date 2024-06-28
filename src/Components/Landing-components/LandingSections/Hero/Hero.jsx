/* eslint-disable no-unused-vars */
import React from 'react'
import './Hero.css'
// import dark_arrow from '../../../../assets/dark-arrow.png'
import white_arrow from '../../../../assets/white-arrow.png'
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';

const Hero = () => {
  return (
    <div className='hero ' id='hero'>
        <div className='hero-text'>
            <h1>Transforming Agriculture with CropMaster.</h1>
            <p>CropMaster offers essential crop information, marketing opportunities, and expert knowledge, revolutionizing farming practices. Join us for an enhanced farming experience</p>
             <Link to='features' spy={true} smooth={true} duration={500} className='btn'>Explore More  </Link> {/*<img src={white_arrow} alt=''/> */}
            {/* <a href="/users-page" className="btn">Explore More</a> */}
        </div>
    </div>
  )
}

export default Hero