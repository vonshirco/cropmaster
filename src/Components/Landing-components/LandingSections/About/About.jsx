import React from 'react'
import './About.css'
import about_img from '../../../../assets/about.jpg'
// import play_icon from '../../../../assets/play-icon.png'

const About = () => {
  return (
    <div className='about' id='about'>
        <div className="about-left">
            <img src={about_img} className='about-img' />
            {/* <img src={play_icon} className='play-icon' /> */}
        </div>
        <div className="about-right">
            <h3>About CropMaster</h3>
            <h2>Revolutionizing Agriculture for a Sustainable Future</h2>
            <p>Empowering farmers with comprehensive crop information, 
              marketing tools, and expert knowledge, CropMaster is transforming agriculture. </p>
            <p>Revolutionizing farming practices for a sustainable future, CropMaster provides 
              innovative solutions to enhance crop management and market access.</p>
            <p>With CropMaster, farmers can access real-time data and personalized 
              recommendations, optimizing their operations for increased efficiency and profitability.</p>
        </div>
    </div>
  )
}

export default About