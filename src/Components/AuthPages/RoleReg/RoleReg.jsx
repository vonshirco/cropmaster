import React from 'react'
import './RoleReg.css'
import { Link as RouterLink } from 'react-router-dom';

const RoleReg = () => {
  return (
    <div className='role' >
        <div className='role-text'>
            <h1>Welcome to CropMaster</h1>
            <p>Your all-in-one platform for accessing crop information, market opportunities, forum discussions, consultations, and more</p>
            
            <div className="button-container">
                <RouterLink to="/signup-farmer" className='role-btn'>
                    <a href="">I'm a Farmer seeking crop information and market access, and want to participate in discussions</a>
                </RouterLink>
                <RouterLink to="/signup-buyer" className="role-btn" style={{ background: '#8c8e01'}}>
                    <a href="" >I'm a Buyer looking to purchase crops, get crop information and market insights</a>
                </RouterLink>
                <RouterLink to="/signup-expert" className="role-btn" style={{ background: '#398d74'}}>
                    <a href="">I'm an Expert providing consultations, advice on crops, and want to participate in discussions</a>
                </RouterLink>
            </div>

            <RouterLink to="/"><a href="" className="back-home-btn">Back Home</a></RouterLink>
        </div>
        
    </div>
  )
}

export default RoleReg