import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getUser as getUserApi,
    addUser as addUserApi
    
} from '../../helpers';

interface UserData {
    payload: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        phone: string;
        groups: number[];
        is_active: boolean;
        limit: number;
        page: number;
    };
    type: string;
}

function* getUser({ payload: {limit,page}}:UserData):SagaIterator {
    try {
        const response = yield call(getUserApi,{limit,page});
        const data = response.data;
        yield put({type: 'GET_USER_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_USER_FAILED', error: error});
        
    }
}

function* addUser({ payload: {first_name,last_name,email,password,phone,groups,is_active} }: UserData):SagaIterator {
    
    try {
        const response = yield call(addUserApi,{first_name,last_name,email,password,phone,groups,is_active});
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


export function* watchGetUser() {
    yield takeEvery('GET_USER_REQUESTED', getUser);
}

export function* watchAddUser() {
    yield takeEvery('ADD_USER_REQUESTED', addUser);
}



function* userSaga() {
    yield all([fork(watchGetUser),fork(watchAddUser)]);
}

export default userSaga;
