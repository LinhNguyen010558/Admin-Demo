import { put, select, takeLatest } from "redux-saga/effects";
import { ACTION } from "../../Assets/ActionType";
import {
  UserAction,
  ActionPagin,
  ActionType,
  getUser,
  addListUsers,
} from "./action";
import {
  selectUsers,
  selectListAddUser,
  selectNoteNewUsers,
} from "./userReducer";

export function* onDeleteUser({ payload: data }) {
  try {
    const action = { ...data };
    if (action) {
      const user = action;
      const users = yield select(selectUsers);
      const newUsers = users.filter((u) => u.userId !== user.userId);
      yield put(UserAction(ACTION.DELETE_USERS_SUCCESS, newUsers));
    } else yield put(ActionType(ACTION.DELETE_USERS_FAIL));
  } catch (error) {
    console.log("Error DELETE user");
    yield put(ActionType(ACTION.DELETE_USERS_FAIL));
  }
}

export function* onAddUser({ payload: data }) {
  try {
    const action = { ...data };
    if (action) {
      const user = action;
      const Users = yield select(selectUsers);
      let newUser = [...Users];
      newUser.push(user);

      yield put(UserAction(ACTION.ADD_USERS_SUCCESS, newUser));
    } else yield put(ActionType(ACTION.ADD_USERS_FAIL));
  } catch (error) {
    console.log("Error ADD user");
    yield put(ActionType(ACTION.ADD_USERS_FAIL));
  }
}

export function* onUpdateUser({ payload: data }) {
  try {
    const action = { ...data };
    if (action) {
      const user = { ...action };
      const Users = yield select(selectUsers);
      let newUser = [...Users];

      let objindex = newUser.findIndex((obj) => obj.userId === user.userId);

      console.log("newuser bf", newUser[objindex], objindex);

      newUser[objindex] = user;
      console.log("newuser af", newUser[objindex]);

      yield put(UserAction(ACTION.UPDATE_USERS_SUCCESS, newUser));
    } else yield put(ActionType(ACTION.UPDATE_USERS_FAIL));
  } catch (error) {
    console.log("Error UPPDATE user");
    yield put(ActionType(ACTION.UPDATE_USERS_FAIL));
  }
}

export function* onGetUsersPagin({ payload2: data }) {
  try {
    const action = { ...data };
    if (action) {
      const Users = yield select(selectUsers);
      let fakeuser = [...Users];
      let TotalUsers = fakeuser.length;
      let newusers = [];
      let totalPage = Math.floor(TotalUsers / 10) + 1;
      let newAction;

      if (TotalUsers <= 10) {
        let i = 0;
        for (i; i < TotalUsers; i++) {
          newusers.push(fakeuser[i]);
        }

        newAction = {
          ...action,
          total: totalPage,
          dataShow: [...newusers],
          totalUsers: TotalUsers,
        };

        yield put(ActionPagin(ACTION.GET_DATA_USERS_SUCCESS, newAction));
      } else {
        if (action.curr === totalPage) {
          let i = (action.curr - 1) * 10;
          for (i; i < TotalUsers; i++) {
            newusers.push(fakeuser[i]);
          }

          newAction = {
            ...action,
            total: totalPage,
            dataShow: [...newusers],
            totalUsers: TotalUsers,
          };

          yield put(ActionPagin(ACTION.GET_DATA_USERS_SUCCESS, newAction));
        } else {
          if (action.curr === 1) {
            let i = 0;
            for (i; i < 10; i++) {
              newusers.push(fakeuser[i]);
            }

            newAction = {
              ...action,
              total: totalPage,

              dataShow: [...newusers],
              totalUsers: TotalUsers,
            };

            yield put(ActionPagin(ACTION.GET_DATA_USERS_SUCCESS, newAction));
          } else {
            let i = (action.curr - 1) * 10;
            for (i; i < (action.curr - 1) * 10 + 10; i++) {
              newusers.push(fakeuser[i]);
            }

            newAction = {
              ...action,
              total: totalPage,

              dataShow: [...newusers],
              totalUsers: TotalUsers,
            };

            yield put(ActionPagin(ACTION.GET_DATA_USERS_SUCCESS, newAction));
          }
        }
      }
    }
    yield put(ActionType(ACTION.GET_DATA_USERS_FAIL));
  } catch (error) {
    console.log("Error get data with pagin");
    yield put(ActionType(ACTION.GET_DATA_USERS_FAIL));
  }
}

///get user by id
export function* onGetUserById({ payload3: data }) {
  try {
    const action = { ...data };
    if (action) {
      const Users = yield select(selectUsers);
      let fakeUsers = [...Users];

      let objindex = fakeUsers.findIndex((obj) => obj.userId === action.userId);
      if (objindex && objindex !== -1) {
        let newUser = { ...fakeUsers[objindex] };
        yield put(getUser(ACTION.GET_USER_ID_SUCCESS, newUser));
      }
    }
    yield put(ActionType(ACTION.GET_USER_ID_FAIL));
  } catch (error) {
    console.log("Error get data by id");
    yield put(ActionType(ACTION.GET_USER_ID_FAIL));
  }
}

///add list user
export function* onAddListUser({ payload4: data }) {
  try {
    const action = { ...data };

    if (action) {
      const ListUsers = yield select(selectListAddUser);

      let newUsers = [];
      if (ListUsers) newUsers = [...ListUsers];

      newUsers.push({ ...action });

      yield put(addListUsers(ACTION.ADD_LIST_USERS_SUCCESS, newUsers));
    }

    yield put(ActionType(ACTION.ADD_LIST_USERS_FAIL));
  } catch (error) {
    console.log("Error add list userdata");
    yield put(ActionType(ACTION.ADD_LIST_USERS_FAIL));
  }
}

///delete user in List
export function* onDeleteUserInList({ payload4: data }) {
  try {
    const action = { ...data };
    if (action) {
      const Users = yield select(selectListAddUser);
      console.log("list user", Users);
      console.log("user", action);
      if (Users) {
        let fakeUsers = [...Users];
        const newUsers = fakeUsers.filter((u) => u.userId !== action.userId);
        yield put(addListUsers(ACTION.DELETE_USER_IN_LIST_SUCCESS, newUsers));
      }
    }

    yield put(addListUsers(ACTION.DELETE_USER_IN_LIST_FAIL));
  } catch (error) {
    console.log("Error delete list userdata");
    yield put(ActionType(ACTION.DELETE_USER_IN_LIST_FAIL));
  }
}

///add new note for user
export function* onAddNewNote({ payload: data }) {
  try {
    const action = { ...data };
    if (action) {
      const Note = yield select(selectNoteNewUsers);
      let newNote = [];
      if (Note) {
        let fakeNote = [...Note];
        let id = fakeNote.slice(-1)[0].ID + 1;
        let note = { ...action, ID: id };
        fakeNote.push({ ...note });

        yield put(UserAction(ACTION.ADD_NEW_NOTE_SUCCESS, fakeNote));
      } else {
        newNote.push({ ...action, ID: 1 });
        yield put(UserAction(ACTION.ADD_NEW_NOTE_SUCCESS, newNote));
      }
    }
    yield put(ActionType(ACTION.ADD_NEW_NOTE_FAIL));
  } catch (error) {
    console.log("Error add new note for user");
    yield put(ActionType(ACTION.ADD_NEW_NOTE_FAIL));
  }
}

export function* onCLearAddNewNote() {
  yield put(ActionType(ACTION.DELETE_ALL_NOTE_SUCCESS));
}

export function* onDeleteNote({ payload: data }) {
  try {
    const action = { ...data };

    console.log("action: ", action);
    const Note = yield select(selectNoteNewUsers);

    console.log("Note: ", Note);
    const newNotes = [...Note].filter((u) => u.ID !== action.ID);

    console.log("newNote: ", newNotes);
    yield put(UserAction(ACTION.DELETE_ONE_NOTE_SUCCESS, newNotes));
  } catch (error) {
    console.log("Error delete note for new user");
    yield put(ActionType(ACTION.DELETE_ONE_NOTE_FAIL));
  }
}

export default function* userSaga() {
  yield takeLatest(ACTION.DELETE_USERS, onDeleteUser);
  yield takeLatest(ACTION.ADD_USERS, onAddUser);
  yield takeLatest(ACTION.GET_DATA_USERS, onGetUsersPagin);
  yield takeLatest(ACTION.UPDATE_USERS, onUpdateUser);
  yield takeLatest(ACTION.ADD_LIST_USERS, onAddListUser);
  yield takeLatest(ACTION.GET_USER_ID, onGetUserById);
  yield takeLatest(ACTION.DELETE_USER_IN_LIST, onDeleteUserInList);
  yield takeLatest(ACTION.ADD_NEW_NOTE, onAddNewNote);
  yield takeLatest(ACTION.DELETE_ALL_NOTE, onCLearAddNewNote);
  yield takeLatest(ACTION.DELETE_ONE_NOTE, onDeleteNote);
}
