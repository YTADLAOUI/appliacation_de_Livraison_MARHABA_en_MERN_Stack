import React from 'react'
import { Navigate } from 'react-router-dom'

const MiddlewareLogOut = ({children}) => {
      const logout=!! JSON.parse(localStorage.getItem('token'))
      if( !logout){
        return children
      }else{
        return <Navigate to="/restaurants"/>
      }
}

export default MiddlewareLogOut