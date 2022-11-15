import { combineReducers } from "redux";
import userReducer from "./User/userReducer";
import LoginReducer from "./Login/loginReducer";
import FormDataReducer from "./Form/FormReducer";
import FormUpdateDataReducer from "./Form/UpdateFormReducer";

export default combineReducers({
  users: userReducer,
  login: LoginReducer,
  forms: FormDataReducer,
  formUpdate: FormUpdateDataReducer,
});
