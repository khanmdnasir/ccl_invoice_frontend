import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getPayment as getPaymentApi,    
    getPaymentDetails as getPaymentDetailsApi,    
    getPaymentTypes as getPaymentTypesApi,    
    getDueInvoices as getDueInvoicesApi,    
} from '../../helpers';

interface PaymentData {
    payload: {
        id: number;
        limit: number;
        page: number;
    };
    type: string;
}

function* getPayment({ payload: {limit,page}}:PaymentData):SagaIterator {
    try {
        const response = yield call(getPaymentApi,{limit,page});
        const data = response.data;
        yield put({type: 'GET_PAYMENT_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_PAYMENT_FAILED', error: error});
        
    }
}

function* getPaymentDetails({ payload }:PaymentData):SagaIterator {
    try {
        const response = yield call(getPaymentDetailsApi,{payload});
        const data = response.data;
        yield put({type: 'GET_INVOICEDETAILS_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_INVOICEDETAILS_FAILED', error: error});
        
    }
}


function* getPaymentTypes({ payload: {limit,page}}:any):SagaIterator {
    try {
        const response = yield call(getPaymentTypesApi,{limit,page});
        const data = response.data;
        yield put({type: 'GET_PAYMENT_TYPES_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_PAYMENT_TYPES_FAILED', error: error});
        
    }
}


function* getDueInvoices({ payload: id}:any):SagaIterator {
    try {
        const response = yield call(getDueInvoicesApi,{id});
        const data = response.data;
        yield put({type: 'GET_DUE_INVOICES_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_DUE_INVOICES_FAILED', error: error});
        
    }
}


export function* watchGetPayment() {
    yield takeEvery('GET_PAYMENT_REQUESTED', getPayment);
}

export function* watchGetPaymentDetails() {
    yield takeEvery('GET_PAYMENT_DETAILS_REQUESTED', getPaymentDetails);
}



export function* watchGetPaymentTypes() {
    yield takeEvery('GET_PAYMENT_TYPES_REQUESTED', getPaymentTypes);
}

export function* watchGetDueInvoices() {
    yield takeEvery('GET_DUE_INVOICES_REQUESTED', getDueInvoices);
}



function* paymentSaga() {
    yield all([fork(watchGetPayment),fork(watchGetPaymentDetails), fork(watchGetPaymentTypes),fork(watchGetDueInvoices)]);
}

export default paymentSaga;
