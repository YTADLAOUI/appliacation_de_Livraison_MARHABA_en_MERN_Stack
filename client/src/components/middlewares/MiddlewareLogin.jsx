import React from 'react'
import { Navigate } from 'react-router-dom';


  const MiddlewareLogin = ({children}) => {
    const isAuthenticated = !! JSON.parse(localStorage.getItem('token'))?.role;
    if (isAuthenticated){ return children}
    else {
     return <Navigate to="/login"/>
    }

}


export default MiddlewareLogin