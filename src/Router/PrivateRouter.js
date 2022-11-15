import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuth } from "../Redux/Login/loginReducer";

const PrivateRouter = ({ children }) => {
  const isLoggedIn = useSelector(selectAuth);

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRouter;
