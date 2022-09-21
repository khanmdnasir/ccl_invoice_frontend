import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getCurrency as getCurrencyApi,
    addCurrency as addCurrencyApi
    
} from '../../helpers';

interface CurrencyData {
    payload: {
        id: number;
        prefix: string;
        short_key: string;
        rate: number;
        is_active: boolean;
        limit: number;
        page: number;
    };
    type: string;
}

function* getCurrency({ payload: {limit,page}}:CurrencyData):SagaIterator {
    try {
        const response = yield call(getCurrencyApi,{limit,page});
        const data = response.data;
        yield put({type: 'GET_CURRENCY_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_CURRENCY_FAILED', error: error});
        
    }
}

function* selectCurrency({ payload }: CurrencyData):SagaIterator {
    console.log(payload)
    yield put({type: 'SELECT_CURRENCY_SUCCESS' , scurrency: payload});
    
}

function* addCurrency({ payload: {prefix,short_key,is_active} }: CurrencyData):SagaIterator {
    
    try {
        const response = yield call(addCurrencyApi,{prefix,short_key,is_active});
        const result = response.data;
        if(result.success){
            yield put({type: 'ADD_CURRENCY_SUCCESS' , currency: result.data});
        }else{
            yield put({type: 'ADD_CURRENCY_FAILED', error: result.error});
        }
        
    } catch (error) {
        yield put({type: 'ADD_CURRENCY_FAILED', error: error});
        
    }
}


export function* watchGetCurrency() {
    yield takeEvery('GET_CURRENCY_REQUESTED', getCurrency);
}

export function* watchSelectCurrency() {
    yield takeEvery('SELECT_CURRENCY_REQUESTED', selectCurrency);
}

export function* watchAddCurrency() {
    yield takeEvery('ADD_CURRENCY_REQUESTED', addCurrency);
}



function* currencySaga() {
    yield all([fork(watchGetCurrency),fork(watchSelectCurrency),fork(watchAddCurrency)]);
}

export default currencySaga;
