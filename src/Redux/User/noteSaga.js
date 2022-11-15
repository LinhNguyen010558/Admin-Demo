import { put, select, takeLatest } from "redux-saga/effects";
import { ACTION } from "../../Assets/ActionType";
import {
  UserAction, 
  ActionType, 
} from "./action";
import {
  selectUsers, 
} from "./userReducer";

/// add new node for user
export function* onAddNewNote({ payload: data }) {
  try {
    const action = { ...data };
    const Users = yield select(selectUsers);
    let fakeUsers = [...Users];

    let objIndex = fakeUsers.findIndex((obj) => obj.userId === action.userId);

    if (objIndex !== -1) {
      let newNote;

      if (!fakeUsers[objIndex].notes[0]) {
        newNote = {
          ID: 1,
          content: { ...action }.content,
        };
      } else {
        let id = fakeUsers[objIndex].notes.slice(-1)[0].ID + 1;

        newNote = {
          ID: id,
          content: { ...action }.content,
        };
      }

      fakeUsers[objIndex].notes.push({ ...newNote });

      console.log("after update", fakeUsers);
      yield put(UserAction(ACTION.ADD_NEW_NOTE_FOR_USER_SUCCESS, fakeUsers));
    }

    yield put(ActionType(ACTION.ADD_NEW_NOTE_FOR_USER_FAIL));
  } catch (error) {
    console.log("Error add note for  user");
    yield put(ActionType(ACTION.ADD_NEW_NOTE_FOR_USER_FAIL));
  }
}

///delete note for user
export function* onDeleteNote({ payload: data }) {
  try {
    const action = { ...data };
    let note = { ...action.note };
    const Users = yield select(selectUsers);
    let fakeUsers = [...Users];

    let objIndex = fakeUsers.findIndex((obj) => obj.userId === action.userId);

    let newNotes = [...fakeUsers[objIndex].notes].filter(
      (u) => u.ID !== note.ID
    );

    fakeUsers[objIndex] = { ...fakeUsers[objIndex], notes: newNotes };

    console.log("user in dex", fakeUsers[objIndex], fakeUsers);
    yield put(UserAction(ACTION.DELETE_NOTE_FOR_USER_SUCCESS, fakeUsers));
  } catch (error) {
    console.log("Error delete note for  user");
    yield put(ActionType(ACTION.DELETE_NOTE_FOR_USER_FAIL));
  }
}

export default function* userEditNoteSaga() {
  yield takeLatest(ACTION.ADD_NEW_NOTE_FOR_USER, onAddNewNote);
  yield takeLatest(ACTION.DELETE_NOTE_FOR_USER, onDeleteNote);
}
