import React from 'react'
import { Link } from 'react-router-dom'
import  expImage7 from '../../../assets/images/expert7.jpeg';
import { useMainContext } from '../../../../../../../../ context'
const SingleChat = ({expert}) => {
   
    if(!expert){
        return null;
    }
    const {userData, token} = useMainContext()

  return (
    <Link to={`/farmers/Consultations/messages/${userData.id}_${expert.id}/`}>
    <div className='flex items-center my-3'>
                    <img src={expImage7} alt={expert.username} className='rounded-full w-14 h-14' />
                    <div className='ml-3'>
                    <h1 className='font-semibold'>Dr.{expert.username}</h1>

                    </div>
    </div>
    </Link>
  )
}

export default SingleChat