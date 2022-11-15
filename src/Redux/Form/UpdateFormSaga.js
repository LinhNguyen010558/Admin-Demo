import { put, takeLatest, select } from "redux-saga/effects";
import { ACTION } from "../../Assets/ActionType";
import { saveFormAction, clearFormAction } from "./FormAction";
import { selectFormUpdateData } from "./UpdateFormReducer";

export function* onSaveFormUpdateData({ payload: data }) {
  try {
    const action = { ...data };
    if (action) {
      const stateData = yield select(selectFormUpdateData);
      if (stateData.userId) {
        const newState = { ...stateData, ...action };
        yield put(
          saveFormAction(ACTION.SAVE_UPDATE_FORM_DATA_SUCCESS, newState)
        );
      }
      console.log("check state in sage: ", action);
      yield put(saveFormAction(ACTION.SAVE_UPDATE_FORM_DATA_SUCCESS, action));
    }
    yield put(saveFormAction(ACTION.SAVE_UPDATE_FORM_DATA_FAIL));
  } catch (error) {
    console.log("Have ERROR save form data");
    yield put(saveFormAction(ACTION.SAVE_UPDATE_FORM_DATA_FAIL));
  }
}

// export function* onClearDataForm() {
// }

export default function* formUpdateSaga() {
  yield takeLatest(ACTION.SAVE_UPDATE_FORM_DATA, onSaveFormUpdateData);
}
