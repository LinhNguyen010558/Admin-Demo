import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/Login/LoginPage";
import Users from "../Pages/Users";
import PrivateRouter from "./PrivateRouter";

const WebRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/Users"
          element={
            <PrivateRouter>
              <Users></Users>
            </PrivateRouter>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default WebRouter;
