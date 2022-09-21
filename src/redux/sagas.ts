import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import userSaga from './user/saga';
import currencySaga from './currency/saga';
import roleSaga from './roles/saga';



export default function* rootSaga() {
    yield all([authSaga(), layoutSaga(), userSaga(),currencySaga(),roleSaga()]);
}
