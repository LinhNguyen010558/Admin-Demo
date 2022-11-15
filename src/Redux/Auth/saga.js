import { all, put, takeLatest, fork } from 'redux-saga/effects';
import actions from './actions';
import notification from '../../Copomnent/Common/Notification/index';
import { checkAuth } from "../../helper/ActionLogin";


function* Login() {
    yield takeLatest(actions.LOGIN, function* ({ data }) {
        try {
            const callApi = checkAuth(data)
            if (callApi?.code === 1) {
                yield localStorage.setItem('user', JSON.stringify(callApi.user));
                yield localStorage.setItem('token', callApi.token);
                yield put(actions.loginSuccess());
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


function* LogOut() {
    yield takeLatest(actions.LOGOUT, function* ({ payload }) {
        try { 
            yield localStorage.clear();
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