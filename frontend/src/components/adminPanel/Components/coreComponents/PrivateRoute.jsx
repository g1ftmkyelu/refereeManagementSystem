import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getToken } from "../../utils/helperFunctions";

const PrivateRoute = () => {
  const  token  = getToken();
  const navigate=useNavigate();
  
  useEffect(()=>{

    if(token){
      navigate('/users')
    
    }else(
      navigate('/login')
     
    )
    
  },token)

  return <Outlet /> ;
};

export default PrivateRoute;
