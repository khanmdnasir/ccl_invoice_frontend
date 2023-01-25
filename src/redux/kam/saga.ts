import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getKam as getKamApi,
    getKamDetails as getKamDetailsApi,
    getAllKam as getAllKamApi,
    addKam as addKamApi,
    deleteKam as deleteKamApi

} from '../../helpers';

interface KamData {
    payload: {
        id: number;
        name: string;
        phone: string;
        email: string;
        department: string;
        limit: number;
        page: number;
    };
    type: string;
}

function* getKam({ payload: {limit,page}}:KamData):SagaIterator {
    try {
        const response = yield call(getKamApi,{limit,page});
        const data = response.data;
        yield put({type: 'GET_KAM_SUCCESS', data: data});

    } catch (error) {
        yield put({type: 'GET_KAM_FAILED', error: error});
    }
}

function* getKamDetails ({ payload }:KamData):SagaIterator {
    try {
        const response = yield call(getKamDetailsApi,{payload});
        const data = response.data;
        yield put({type: 'GET_KAM_DETAILS_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_KAM_DETAILS_FAILED', error: error});
        
    }
}


function* getAllKam():SagaIterator {
    try {
        const response = yield call(getAllKamApi);
        const data = response.data;
        yield put({type: 'GET_ALLKAM_SUCCESS' , data: data.results});
    } catch (error) {
        yield put({type: 'GET_ALLKAM_FAILED', error: error});
        
    }
}

function* addKam({ payload: {id,name,phone,email,department} }: KamData):SagaIterator {
    
    try {
        const response = yield call(addKamApi,{id,name,phone,email,department});
        const result = response.data;
        // console.log("saga",result.data)
        if(result.success){
            yield put({type: 'ADD_KAM_SUCCESS' , kam: result.data});
        }else{
            yield put({type: 'ADD_KAM_FAILED', error: result.error});
        }
        
    } catch (error) {
        yield put({type: 'ADD_KAM_FAILED', error: error});
        
    }
}

function* deleteKam({ payload: {id} }: KamData):SagaIterator {
    try {
        console.log(id)
        const response = yield call(deleteKamApi,id);
        const result = response.data;
        if(result.success){
            yield put({type: 'DELETE_KAM_SUCCESS' , id: id});
        }else{
            yield put({type: 'DELETE_KAM_FAILED', error: result.error});
        }
        
    } catch (error) {
        yield put({type: 'DELETE_KAM_FAILED', error: error});
        
    }
}


function* setKamSuccessAlert( msg:string) {

    put({type: 'SET_KAM_SUCCESS_ALERT',success: msg});
}

function* setKamErrorAlert(msg:string) {

    put({type: 'SET_KAM_ERROR_ALERT',error: msg});
}




export function* watchGetKam() {
    yield takeEvery('GET_KAM_REQUESTED', getKam);
}

export function* watchGetKamDetails() {
    yield takeEvery('GET_KAM_DETAILS_REQUESTED', getKamDetails);
}


export function* watchGetAllKam() {
    yield takeEvery('GET_ALLKAM_REQUESTED', getAllKam);
}



export function* watchAddKam() {
    yield takeEvery('ADD_KAM_REQUESTED', addKam);
}

export function* watchDeleteKam() {
    yield takeEvery('DELETE_KAM_REQUESTED', deleteKam);
}


function* kamSaga() {
    yield all([fork(watchGetKam),fork(watchAddKam),fork(watchDeleteKam),fork(watchGetAllKam), fork(watchGetKamDetails), setKamSuccessAlert,setKamErrorAlert]);
}

export default kamSaga;