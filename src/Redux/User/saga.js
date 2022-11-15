import { all, put, takeLatest, fork, select } from 'redux-saga/effects';
import actions from './actions';
import notification from '../../Compomnent/Common/Notification/index';
import { getListUser, deleteUser, addUser, editUser } from "../../helper/ActionUser";


function* handleGetListData() {
    yield takeLatest(actions.GET_DATA_USERS, function* ({ payload }) {
        try {

            const Users = yield select((state) => state.users.data);
            const callApi = yield getListUser({ ...payload, Users })
            if (callApi?.code === 1) {
                yield put(actions.getDataUserSuccess(callApi?.data));
            } else {
                notification('error', 'Error!', '');
                yield put(actions.actionFailure());
            }
        } catch (error) {
            notification('error', 'Error!', '');
            yield put(actions.actionFailure());
        }
    })
}


function* editUserData() {
    yield takeLatest(actions.EDIT, function* ({ payload }) {
        try {

            const { actionName, data } = payload;
            const Users = yield select((state) => state.users.listData);
            let data_output = {
                data: null,
                code: null,
                message: ''
            };
            switch (actionName) {
                case 'Add':
                    data_output = yield addUser({ user: data, listData: Users });
                    break;
                case 'Edit':
                    data_output = yield editUser({ user: data, listData: Users });
                    break;
                case 'Delete':
                    data_output = yield deleteUser({ user: data, listData: Users });
                    break;
                default:
                    break;
            }
            if (data_output?.code === 1) {
                notification('success', 'Success', '');
                yield put(actions.editDataSuccess(data_output?.data));
            } else {
                notification('error', 'Error!', '');
                yield put(actions.actionFailure());
            }
        } catch (error) {
            notification('error', 'Error!', '');
            yield put(actions.actionFailure());
        }
    })
}



export default function* rootSaga() {
    yield all([
        fork(handleGetListData),
        fork(editUserData)
    ]);
}