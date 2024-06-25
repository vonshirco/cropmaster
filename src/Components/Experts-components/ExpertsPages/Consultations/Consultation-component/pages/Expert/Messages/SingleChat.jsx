import React from 'react'
import { Link } from 'react-router-dom'
import expImage7 from '../../../assets/images/expert7.jpeg';
const SingleChat = ({user, expert_id}) => {

    if(!user){
        return null;
    }

  return (
    <Link to={`/experts/Consultations/messages/${user.user_id}_${expert_id}/`}>
    <div className='flex items-center my-3'>
                    <img src={expImage7} alt={user.username} className='rounded-full w-14 h-14' />
                    <div className='ml-3'>
                    <h1 className='font-semibold'>{user.username}</h1>

                    </div>
    </div>
    </Link>
  )
}

export default SingleChat