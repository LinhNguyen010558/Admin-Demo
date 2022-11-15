import { put, takeLatest } from "redux-saga/effects";
import { ACTION } from "../../Assets/ActionType";
import { LoginAction, LogOutAction } from "./action";
import { auth } from "../../Assets/data";

export function* Login({ payload: data }) {
  try {
    const { email, password } = data;
    console.log("Loggin :", email);
    if (email === auth.USERNAME && password === auth.PASSWORD) {
      yield put(LoginAction(ACTION.USER_LOGIN_SUCCESS, email));
    } else {
      yield put(LoginAction(ACTION.USER_LOGIN_FAIL));
    }
  } catch (error) {
    console.log("Have ERROR Login");
    yield put(LoginAction(ACTION.USER_LOGIN_FAIL));
  }
}

export function* LogOut() {
  try {
    yield put(LogOutAction(ACTION.USER_LOGOUT_SUCCESS));
  } catch (error) {
    console.log("Have ERROR LogOut");
  }
}

export default function* userSaga() {
  yield takeLatest(ACTION.USER_LOGIN, Login);
  yield takeLatest(ACTION.USER_LOGOUT, LogOut);
}
