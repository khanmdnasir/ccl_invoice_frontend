import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getService as getServiceApi,
    getContactService as getContactServiceApi,
    getContactServices as getContactServicesApi,
    addService as addServiceApi,
    
} from '../../helpers';

interface ServiceData {
    payload: {
        id: number;
        service: any[];
        limit: number;
        page: number;
        contact_id: number;
    };
    type: string;
}

function* getService({ payload: {limit,page}}:ServiceData):SagaIterator {
    try {
        const response = yield call(getServiceApi,{limit,page});
        const data = response.data;
        yield put({type: 'GET_SERVICE_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_SERVICE_FAILED', error: error});
        
    }
}

function* getContactService({ payload }:any):SagaIterator {
    try {
        const response = yield call(getContactServiceApi,{...payload});
        const data = response.data;
        yield put({type: 'GET_CONTACTSERVICE_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_CONTACTSERVICE_FAILED', error: error});
        
    }
}

function* getContactServices({ payload }:any):SagaIterator {
    try {
        const response = yield call(getContactServicesApi,{...payload});
        const data = response.data;
        console.log('services',data)
        yield put({type: 'GET_CONTACTSERVICES_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_CONTACTSERVICES_FAILED', error: error});
        
    }
}



function* addService({ payload: {service} }: ServiceData):SagaIterator {
    try {
        const response = yield call(addServiceApi,{service});
        const result = response.data;
        
        if(result.success){
            yield put({type: 'ADD_SERVICE_SUCCESS' , contact: result.data});
        }else{
            yield put({type: 'ADD_SERVICE_FAILED', error: result.error});
        }
        
    } catch (error) {
        yield put({type: 'ADD_SERVICE_FAILED', error: error});
        
    }
}



export function* watchGetService() {
    yield takeEvery('GET_SERVICE_REQUESTED', getService);
}

export function* watchGetContactService() {
    yield takeEvery('GET_CONTACTSERVICE_REQUESTED', getContactService);
}
export function* watchGetContactServices() {
    yield takeEvery('GET_CONTACTSERVICES_REQUESTED', getContactServices);
}



export function* watchAddService() {
    yield takeEvery('ADD_SERVICE_REQUESTED', addService);
}



function* serviceSaga() {
    yield all([fork(watchGetService), fork(watchAddService),fork(watchGetContactService),fork(watchGetContactServices)]);
}

export default serviceSaga;
