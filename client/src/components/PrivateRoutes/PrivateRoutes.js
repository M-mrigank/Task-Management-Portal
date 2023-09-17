import React from 'react'
import { Navigate } from 'react-router-dom';

function PrivateRoutes  ({isLoggedIn, children}) {
    console.log(isLoggedIn);
  if(isLoggedIn){
    return children;
  }
  else{
    return <Navigate to='/'/>
  }
}

export default PrivateRoutes
