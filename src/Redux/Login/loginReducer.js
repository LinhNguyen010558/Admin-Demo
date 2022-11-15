import { ACTION } from "../../Assets/ActionType";

const initialState = {
  loadingPage: false,
  isLoggedIn: false,
  user: undefined,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    //Login user
    case ACTION.USER_LOGIN:
      return { ...state, loadingPage: true };
    case ACTION.USER_LOGIN_SUCCESS:
      console.log("state user", action.payload);
      return { isLoggedIn: true, user: action.payload, loadingPage: false };
    case ACTION.USER_LOGIN_FAIL:
      return { ...state, loadingPage: false };

    /// lout out
    case ACTION.USER_LOGOUT:
      return { ...state, loadingPage: true };
    case ACTION.USER_LOGOUT_SUCCESS:
      return { isLoggedIn: false, user: undefined, loadingPage: false };

    /// check login
    case ACTION.CHECK_LOGIN:
      return { ...state, loadingPage: false };

    default:
      return state;
  }
};

export const selectAuth = (state) => state.login.isLoggedIn;
export default LoginReducer;
