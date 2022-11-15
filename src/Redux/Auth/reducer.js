import actions from './actions'

const initialState = {
    loading: false,
    isLoggedIn: false, 
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
                isLoggedIn: true
            }
        case actions.ACTION_FAILURE:
            return {
                ...state,
                loading: false,
                isLoggedIn: false
            }
  
  
      default:
        return {
          ...state,
        }
    }
  }
  
  export default AuthReducer