import { all } from "redux-saga/effects";
import authSaga from './Auth/saga'

import userSaga from "./User/userSaga";
import loginSaga from "./Login/loginSaga";
import formSaga from "./Form/FormSaga";
import userEditNoteSaga from "./User/noteSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),


    userSaga(), 
    formSaga(), 
    userEditNoteSaga(), 
    loginSaga()]);
}
