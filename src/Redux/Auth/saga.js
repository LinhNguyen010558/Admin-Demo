import { all, takeEvery, put, takeLatest, fork } from 'redux-saga/effects';
import actions from './actions';
import notification from '../../Copomnent/Common/Notification/index';
import { auth } from "../../Assets/data";

export function* Login({ payload: data }) {
    yield takeLatest(actions.LOGIN, function* ({ payload }) {
        try {
            const { email, password } = data;
            if (email === auth.USERNAME && password === auth.PASSWORD) {
                // yield put(LoginAction(ACTION.USER_LOGIN_SUCCESS, email));

                notification('success', 'SUCCESS', '')
            } else { 
                notification('error', 'Login Error!', '');
                yield put(actions.actionFailure());
            }
        } catch (error) { 
            notification('error', 'Login Error!', '');
            yield put(actions.actionFailure());
        }
    })
}


export function* LogOut() {
    yield takeLatest(actions.LOGOUT, function* ({ payload }) {
    try {
        // yield put(LogOutAction(ACTION.USER_LOGOUT_SUCCESS));
    } catch (error) {
        
        notification('error', 'Logout Error!', '');
        yield put(actions.actionFailure());
    }
})
}


export default function* rootSaga() {
    yield all([
        fork(Login),
        fork(LogOut),
    ]);
}