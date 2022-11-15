import { ACTION } from "../../Assets/ActionType";
import ListUsers from "../../Assets/data";

for (var i = 3; i < 8; i++) {
  ListUsers.push({
    userId: i + 1,
    userName: `James Moba ${i + 10}`,
    age: 21,
    email: `${i + 10}@gmail.com`,
    password: "123456",
    notes: [],
  });
}

const initialState = {
  loadingPage: false,
  page: {
    dataShow: [],
    curr: 1,
    total: 1,
    totalUsers: 0,
  },
  userID: undefined,
  data: ListUsers,
  newNote: undefined,
  listAddData: undefined,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    ///add user
    case ACTION.ADD_USERS:
      return { ...state, loadingPage: true };
    case ACTION.ADD_USERS_SUCCESS:
      return { ...state, data: action.payload, loadingPage: false };
    case ACTION.ADD_USERS_FAIL:
      return { ...state, loadingPage: false };

    ///delete user
    case ACTION.DELETE_USERS:
      return { ...state, loadingPage: true };
    case ACTION.DELETE_USERS_SUCCESS:
      return { ...state, data: action.payload, loadingPage: false }; 

    //update user
    case ACTION.UPDATE_USERS:
      return { ...state, loadingPage: true };
    case ACTION.UPDATE_USERS_SUCCESS:
      return { ...state, data: action.payload, loadingPage: false }; 

    ///get data user
    case ACTION.GET_DATA_USERS:
      return { ...state, loadingPage: true };
    case ACTION.GET_DATA_USERS_SUCCESS:
      return {
        ...state,
        loadingPage: false,
        page: action.payload2,
      };

    ///get user by id
    case ACTION.GET_USER_ID:
      return { ...state, loadingPage: true };
    case ACTION.GET_USER_ID_SUCCESS:
      return { ...state, userID: action.payload3, loadingPage: false };
    case ACTION.GET_DATA_USERS_FAIL:
      return { ...state, loadingPage: false };

    ///ADD list user
    case ACTION.ADD_LIST_USERS:
      return { ...state, loadingPage: true };
    case ACTION.ADD_LIST_USERS_SUCCESS:
      return { ...state, listAddData: action.payload4, loadingPage: false };
    case ACTION.ADD_LIST_USERS_FAIL:
      return { ...state, loadingPage: false };

    ///Delete Users in list user
    case ACTION.DELETE_USER_IN_LIST:
      return { ...state, loadingPage: true };
    case ACTION.DELETE_USER_IN_LIST_SUCCESS:
      return { ...state, loadingPage: false, listAddData: action.payload4 };
    case ACTION.DELETE_USER_IN_LIST_FAIL:
      return { ...state, loadingPage: false };

    ///Add new note for user
    case ACTION.ADD_NEW_NOTE:
      return { ...state, loadingPage: true };
    case ACTION.ADD_NEW_NOTE_SUCCESS:
      return { ...state, loadingPage: false, newNote: action.payload };

    ///DELETE_ALL_NOTE:
    case ACTION.DELETE_ALL_NOTE:
      return { ...state, loadingPage: true };
    case ACTION.DELETE_ALL_NOTE_SUCCESS:
      return { ...state, loadingPage: false, newNote: undefined };
    case ACTION.DELETE_ONE_NOTE_FAIL:
      return { ...state, loadingPage: false };

    /// delete one note of new user
    case ACTION.DELETE_ONE_NOTE:
      return { ...state, loadingPage: true };
    case ACTION.DELETE_ONE_NOTE_SUCCESS:
      return { ...state, loadingPage: false, newNote: action.payload }; 

    ///add note of user:
    case ACTION.ADD_NEW_NOTE_FOR_USER:
      return { ...state, loadingPage: true };
    case ACTION.ADD_NEW_NOTE_FOR_USER_SUCCESS:
      return { ...state, data: action.payload, loadingPage: false };
    case ACTION.ADD_NEW_NOTE_FOR_USER_FAIL:
      return { ...state, loadingPage: false };

    ///delete note of user
    case ACTION.DELETE_NOTE_FOR_USER:
      return { ...state, loadingPage: true };
    case ACTION.DELETE_NOTE_FOR_USER_SUCCESS:
      return { ...state, data: action.payload, loadingPage: false };
    case ACTION.DELETE_NOTE_FOR_USER_FAIL:
      return { ...state, loadingPage: false };

    default:
      return state;
  }
};

export const slectNumberUsers = (state) => {
  let Num = [...state.users.data].length;
  return Num;
};

export const selectUserById = (state) => state.users.userID;
export const selectNoteNewUsers = (state) => state.users.newNote;

export const selectListAddUser = (state) => state.users.listAddData;
export const selectUsers = (state) => state.users.data;
export const selectPagin = (state) => state.users.page;
export default userReducer;
