import { combineReducers } from "redux";
import Auth from './Auth/reducer'

import userReducer from "./User/userReducer";
import LoginReducer from "./Login/loginReducer";
import FormDataReducer from "./Form/FormReducer";
import FormUpdateDataReducer from "./Form/UpdateFormReducer";


export default combineReducers({
  Auth: Auth,

  users: userReducer,
  login: LoginReducer,
  forms: FormDataReducer,
  formUpdate: FormUpdateDataReducer,
});
