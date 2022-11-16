import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../Pages/Login/LoginPage";
import Users from "../Container/Users/index";
import PrivateRouter from "./PrivateRouter";
import Loader from '../Pages/spin/index'
import Page404 from '../Pages/404/index'; 
import { checkToken } from '../helper/ActionLogin';

const WebRouter = () => {
  const token = checkToken(); 
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={
            token ? <Navigate to="/" /> :
              <LoginPage />
          } />
          <Route
            path="/"
            element={
              <PrivateRouter>
                <Users></Users>
              </PrivateRouter>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
export default WebRouter;
