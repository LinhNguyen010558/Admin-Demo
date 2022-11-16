import React from "react"; 
import { Navigate } from "react-router-dom";   
import { checkToken } from '../helper/ActionLogin';

const PrivateRouter = ({ children }) => { 
  const token = checkToken();  

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRouter;
