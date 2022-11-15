import { all } from "redux-saga/effects";
import authSaga from './Auth/saga'
import userSaga from "./User/saga"; 

export default function* rootSaga() {
  yield all([
    authSaga(), 
    userSaga()
  ]);
}
