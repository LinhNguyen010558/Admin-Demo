import { all } from "redux-saga/effects";

import userSaga from "./User/userSaga";
import loginSaga from "./Login/loginSaga";
import formSaga from "./Form/FormSaga";
import userEditNoteSaga from "./User/noteSaga";

export default function* rootSaga() {
  yield all([userSaga(), formSaga(), userEditNoteSaga(), loginSaga()]);
}
