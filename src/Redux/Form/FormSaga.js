import { put, takeLatest } from "redux-saga/effects";
import { ACTION } from "../../Assets/ActionType";
import { saveFormAction, clearFormAction } from "./FormAction";

export function* onSaveDataForm({ payload: data }) {
  try {
    const action = { ...data };
    if (action) {
      yield put(saveFormAction(ACTION.SAVE_DATA_FORM_SUCCESS, action));
    } else yield put(saveFormAction(ACTION.SAVE_DATA_FORM_FAIL));
  } catch (error) {
    console.log("Have ERROR save form data");
    yield put(saveFormAction(ACTION.SAVE_DATA_FORM_FAIL));
  }
}

export function* onClearDataForm() {
  yield put(clearFormAction(ACTION.CLEAR_DATA_FORM_SUCCESS));
}

export default function* formSaga() {
  yield takeLatest(ACTION.SAVE_DATA_FORM, onSaveDataForm);
  yield takeLatest(ACTION.CLEAR_DATA_FORM, onClearDataForm);
}
