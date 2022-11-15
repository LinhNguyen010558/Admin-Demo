import { combineReducers } from "redux";
import Auth from './Auth/reducer'
import userReducer from "./User/reducer"; 

export default combineReducers({
  Auth: Auth, 
  users: userReducer, 
});
