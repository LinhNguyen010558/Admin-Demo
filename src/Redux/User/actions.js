const DOCUMENT = 'USER_MANAGERMENT_';

const actions = {
    GET_DATA_USERS: DOCUMENT + 'GET_DATA_USERS',
    GET_DATA_USERS_SUCCESS: DOCUMENT + 'GET_DATA_USERS_SUCCESS',
    EDIT: DOCUMENT + 'EDIT',
    EDIT_SUCCESS: DOCUMENT + 'EDIT_SUCCESS',

    MODAL: DOCUMENT + 'MODAL',

    ACTION_FAILURE: DOCUMENT + 'ACTION_FAILURE',
    CLEAR_DATA: DOCUMENT + 'CLEAR_DATA',

    getDataUser: (data) =>{
        return ({
            type: actions.GET_DATA_USERS,
            payload: data
        })
    },

    getDataUserSuccess: (data) =>{
        return ({
            type: actions.GET_DATA_USERS_SUCCESS,
            payload: data
        })
    },

    actionModal:(data) =>{
        return ({
            type: actions.MODAL,
            payload: data
        })
    },

    editData: (data, actionName = 'Add') => {
        return ({
            type: actions.EDIT,
            payload: { data, actionName }
        })
    },
    editDataSuccess: (data) => {
        return ({
            type: actions.EDIT_SUCCESS,
            payload: data
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