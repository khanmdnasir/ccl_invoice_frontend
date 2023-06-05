import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getRepeatingInvoice as getRepeatingInvoiceApi,    
    getContactRepeatingInvoice as getContactRepeatingInvoiceApi,    
    getRepeatingInvoiceDetails as getRepeatingInvoiceDetailsApi,    
} from '../../helpers';

interface InvoiceData {
    payload: {
        id: number;
        limit: number;
        page: number;
    };
    type: string;
}

function* getRepeatingInvoice({ payload: {limit,page}}:InvoiceData):SagaIterator {
    try {
        const response = yield call(getRepeatingInvoiceApi,{limit,page});
        const data = response.data;
        yield put({type: 'GET_REPEATINGINVOICE_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_REPEATINGINVOICE_FAILED', error: error});
        
    }
}
function* getContactRepeatingInvoice({ payload }: any):SagaIterator {
    try {
        const response = yield call(getContactRepeatingInvoiceApi,{...payload});
        const data = response.data;
        yield put({type: 'GET_CONTACT_REPEATINGINVOICE_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_CONTACT_REPEATINGINVOICE_FAILED', error: error});
        
    }
}

function* getRepeatingInvoiceDetails({ payload }:InvoiceData):SagaIterator {
    try {
        const response = yield call(getRepeatingInvoiceDetailsApi,{payload});
        const data = response.data;
        yield put({type: 'GET_REPEATINGINVOICEDETAILS_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_REPEATINGINVOICEDETAILS_FAILED', error: error});
        
    }
}


export function* watchGetRepeatingInvoice() {
    yield takeEvery('GET_REPEATINGINVOICE_REQUESTED', getRepeatingInvoice);
}

export function* watchGetContactRepeatingInvoice() {
    yield takeEvery('GET_CONTACT_REPEATINGINVOICE_REQUESTED', getContactRepeatingInvoice);
}

export function* watchGetRepeatingInvoiceDetails() {
    yield takeEvery('GET_REPEATINGINVOICEDETAILS_REQUESTED', getRepeatingInvoiceDetails);
}



function* repeatingInvoiceSaga() {
    yield all([fork(watchGetRepeatingInvoice),fork(watchGetContactRepeatingInvoice),fork(watchGetRepeatingInvoiceDetails)]);
}

export default repeatingInvoiceSaga;
