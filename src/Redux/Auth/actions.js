const DOCUMENT = 'AUTH_';

const actions = {
    LOGIN: DOCUMENT + 'LOGIN',
    LOGIN_SUCCESS: DOCUMENT + 'LOGIN_SUCCESS',
    LOGOUT: DOCUMENT + 'LOGOUT', 
    ACTION_FAILURE: DOCUMENT + 'ACTION_FAILURE',
    CLEAR_DATA: DOCUMENT + 'CLEAR_DATA',

    loginAction: (data) => {
        return ({
            type: actions.LOGIN,
            payload: data
        })
    },

    loginSuccess: (data) =>{
        return ({
            type: actions.LOGIN_SUCCESS,
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
    },

    clearData:() =>{
        return ({
            type: actions.CLEAR_DATA
        });
    },
}
export default actions