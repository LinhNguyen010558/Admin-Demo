import { all, put, takeLatest, fork } from 'redux-saga/effects';
import actions from './actions';
import notification from '../../Compomnent/Common/Notification/index';
import { checkAuth } from "../../helper/ActionLogin";


function* Login() {
    yield takeLatest(actions.LOGIN, function* ( {payload} ) {
        try { 
            const callApi = yield checkAuth(payload)
            if (callApi?.code === 1) {
                yield localStorage.setItem('user', JSON.stringify(callApi.user));
                yield localStorage.setItem('token', callApi.token);
                yield put(actions.loginSuccess({
                    token: callApi.token,
                    user: callApi.user
                }));
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