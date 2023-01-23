import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getKamList as getKamListApi,              
} from '../../helpers';



function* getKamList({ payload: {limit,page}}:any):SagaIterator {
    try {
        const response = yield call(getKamListApi,{limit,page});
        const data = response.data;
        yield put({type: 'GET_KAM_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_KAM_FAILED', error: error});
        
    }
}





export function* watchGetKamList() {
    yield takeEvery('GET_KAM_REQUESTED', getKamList);
}


function* kamSaga() {
    yield all([fork(watchGetKamList),]);
}

export default kamSaga;
