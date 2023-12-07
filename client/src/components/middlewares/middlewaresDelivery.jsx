import React from 'react'
import { Navigate } from 'react-router-dom'

const middlewaresDelivery = ({children}) => {
const Delivery=  JSON.parse(localStorage.getItem('token'))?.role
if(Delivery=="delivery"){return children}
else{
  return <Navigate to="/restaurants"/>
}
}

export default middlewaresDelivery