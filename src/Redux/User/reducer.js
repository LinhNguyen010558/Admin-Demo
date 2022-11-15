import actions from './actions'
import ListUsers from "../../Assets/data";

const initialState = {
    loading: false,
    page: 1,
    limit: 10,
    listData: [],
    count: 0,
    success: false,
    userID: undefined,
    data: ListUsers,
    newNote: undefined,
    listAddData: undefined,
    modal: null
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_DATA_USERS:
            return {
                ...state,
                loading: true,
                success: false
            };
        case actions.GET_DATA_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                listData: action.payload.dataShow,
                page: action.payload.page,
                limit: action.payload.limit,
                count: action.payload.totalUsers
            };

        case actions.EDIT: 
            return {
                ...state, 
                success: false, 
                loading: true,
            }
        case actions.MODAL:
            return {
                ...state,
                modal: action.payload
            }
        case actions.EDIT_SUCCESS:
            return {
                ...state,
                listData: action.payload,
                loading: false,
                success: true,
                modal: false, 
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