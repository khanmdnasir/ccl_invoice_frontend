import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getDashboardSummary as getDashboardSummaryApi
    
} from '../../helpers';


function* getDashboardSummary({ payload}:any):SagaIterator {
    try {
        const response = yield call(getDashboardSummaryApi,{...payload});
        const data = response.data;
        yield put({type: 'GET_DASHBOARD_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_DASHBOARD_FAILED', error: error});
        
    }
}


export function* watchGetDashboardSummary() {
    yield takeEvery('GET_DASHBOARD_REQUESTED', getDashboardSummary);
}



function* dashboardSaga() {
    yield all([fork(watchGetDashboardSummary)]);
}

export default dashboardSaga;
