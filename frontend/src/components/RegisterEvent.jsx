import React from 'react'
import { useParams } from 'react-router-dom';

const RegisterEvent = () => {
    const { eventId } = useParams(); 
//    useParams
   
    
  return (
    <div>
      <h1>This is the register page of eventId:{eventId}</h1>
    </div>
  )
}

export default RegisterEvent
