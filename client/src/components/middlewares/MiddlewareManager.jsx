import React from 'react'
import { Navigate } from 'react-router-dom'

const MiddlewareManager = ({children}) => {
      const isManager= JSON.parse(localStorage.getItem('token'))?.role
      if(isManager=="manager") { return children}
      else {
       return <Navigate to="/permition"/>
      }
}

export default MiddlewareManager