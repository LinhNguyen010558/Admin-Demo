const DOCUMENT = 'AUTH_';

const actions = {
    LOGIN: DOCUMENT + 'LOGIN',
    LOGIN_SUCCESS: DOCUMENT + 'LOGIN_SUCCESS',
    LOGOUT: DOCUMENT + 'LOGOUT',

    ACTION_FAILURE: DOCUMENT + 'ACTION_FAILURE',

    loginAction: (data) => {
        return ({
            type: actions.LOGIN,
            payload: data
        })
    },

    logoutAction: () =>{
        return ({
            type: actions.LOGOUT,
        })
    },

    actionFailure: () =>{
        return ({
            type: actions.ACTION_FAILURE
        })
    }
}
export default actions