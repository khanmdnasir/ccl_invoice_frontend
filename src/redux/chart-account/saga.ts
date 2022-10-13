import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getChartAccount as getChartAccountApi,        
} from '../../helpers';



function* getChartAccount():SagaIterator {
    try {
        const response = yield call(getChartAccountApi);
        const data = response.data;
        yield put({type: 'GET_CHARTACCOUNT_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_CHARTACCOUNT_FAILED', error: error});
        
    }
}




export function* watchGetChartAccount() {
    yield takeEvery('GET_CHARTACCOUNT_REQUESTED', getChartAccount);
}





function* charAccountSaga() {
    yield all([fork(watchGetChartAccount)]);
}

export default charAccountSaga;
