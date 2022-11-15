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


function* addChartOfAccount({ payload: {account_name,code,account_type,details,transaction_type} }: any):SagaIterator {
    
    try {
        const response = yield call(getChartAccountApi);
        const result = response.data;
        
        if(result.success){
            yield put({type: 'ADD_USER_SUCCESS' , user: result.data});
        }else{
            yield put({type: 'ADD_USER_FAILED', error: result.error});
        }
        
    } catch (error) {
        yield put({type: 'ADD_USER_FAILED', error: error});
        
    }
}





export function* watchGetChartAccount() {
    yield takeEvery('GET_CHARTACCOUNT_REQUESTED', getChartAccount);
}


export function* watchAddChartOfAccount() {
    yield takeEvery('ADD_CHART_OF_ACCOUNT_REQUESTED', addChartOfAccount);
}



function* charAccountSaga() {
    yield all([fork(watchGetChartAccount), fork(watchAddChartOfAccount)]);
}

export default charAccountSaga;
