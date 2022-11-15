import actions from './actions'

const initialState = {
    loading: false,
    isLoggedIn: false, 
    token: null,
    user: null,
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
       case actions.LOGIN:
            return {
                ...state,
                loading: true, 
                isLoggedIn: false
            }
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false, 
                isLoggedIn: true,
                token: action.payload.token,
                user: action.payload.user
            }
        case actions.ACTION_FAILURE:
            return {
                ...state,
                loading: false,
                isLoggedIn: false
            }
        case actions.CLEAR_DATA:
            return {
                ...initialState,
             }
  
  
      default:
        return {
          ...state,
        }
    }
  }
  
  export default AuthReducer