import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getPayment as getPaymentApi,    
    getContactPayment as getContactPaymentApi,    
    getPaymentDetails as getPaymentDetailsApi,    
    getAllPayment as getAllPaymentApi,
    getPaymentTypes as getPaymentTypesApi,    
    getDueInvoices as getDueInvoicesApi,    
    getClientBalance as getClientBalanceApi,    
    addPayment as addPaymentApi,    
    addInvoicePayment as addInvoicePaymentApi,    
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

function* getContactPayment({ payload}: any):SagaIterator {
    try {
        const response = yield call(getContactPaymentApi,{...payload});
        const data = response.data;
        // console.log('payments',data)
        yield put({type: 'GET_CONTACT_PAYMENT_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_CONTACT_PAYMENT_FAILED', error: error});
        
    }
}

function* getPaymentDetails({ payload }:PaymentData):SagaIterator {
    try {
        const response = yield call(getPaymentDetailsApi,{payload});
        const data = response.data;
        yield put({type: 'GET_PAYMENT_DETAILS_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_PAYMENT_DETAILS_FAILED', error: error});
        
    }
}

function* getAllPayment():SagaIterator {
    try {
        const response = yield call(getAllPaymentApi);
        const data = response.data;
        yield put({type: 'GET_ALLPAYMENT_SUCCESS' , data: data.results});
    } catch (error) {
        yield put({type: 'GET_ALLPAYMENT_FAILED', error: error});
        
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

function* getClientBalance({ payload: id}:any):SagaIterator {
    try {
        const response = yield call(getClientBalanceApi,{id});
        const data = response.data;
        yield put({type: 'GET_CLIENT_BALANCE_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_CLIENT_BALANCE_FAILED', error: error});
        
    }
}


function* addPayment({ payload: payloadData}:any):SagaIterator {
    try {
        const response = yield call(addPaymentApi,payloadData);
        const data = response.data;
        if(data?.success){
            yield put({type: 'ADD_PAYMENT_SUCCESS' , data: data});
        }else{
            yield put({type: 'ADD_PAYMENT_FAILED', error: data.msg});
        }
        
    } catch (error) {
        yield put({type: 'ADD_PAYMENT_FAILED', error: error});
        
    }
}


function* addInvoicePayment({ payload: payloadData}:any):SagaIterator {
    try {
        const response = yield call(addInvoicePaymentApi,payloadData);
        const data = response.data;
        if(data?.success){
            yield put({type: 'ADD_INVOICE_PAYMENT_SUCCESS' , data: data});
        }else{
            yield put({type: 'ADD_INVOICE_PAYMENT_FAILED', error: data});
        }
        
    } catch (error) {
        yield put({type: 'ADD_INVOICE_PAYMENT_FAILED', error: error});
        
    }
}


export function* watchGetPayment() {
    yield takeEvery('GET_PAYMENT_REQUESTED', getPayment);
}

export function* watchGetContactPayment() {
    yield takeEvery('GET_CONTACT_PAYMENT_REQUESTED', getContactPayment);
}

export function* watchGetPaymentDetails() {
    yield takeEvery('GET_PAYMENT_DETAILS_REQUESTED', getPaymentDetails);
}

export function* watchGetAllPayment(){
    yield takeEvery('GET_ALLPAYMENT_REQUESTED', getAllPayment);
}

export function* watchGetPaymentTypes() {
    yield takeEvery('GET_PAYMENT_TYPES_REQUESTED', getPaymentTypes);
}

export function* watchGetDueInvoices() {
    yield takeEvery('GET_DUE_INVOICES_REQUESTED', getDueInvoices);
}

export function* watchGetClientBalance() {
    yield takeEvery('GET_CLIENT_BALANCE_REQUESTED', getClientBalance);
}

export function* watchAddPayment() {
    yield takeEvery('ADD_PAYMENT_REQUESTED', addPayment);
}

export function* watchAddInvoicePayment() {
    yield takeEvery('ADD_INVOICE_PAYMENT_REQUESTED', addInvoicePayment);
}



function* paymentSaga() {
    yield all([fork(watchGetPayment),fork(watchGetContactPayment),fork(watchGetPaymentDetails),fork(watchGetAllPayment), fork(watchGetPaymentTypes),fork(watchGetDueInvoices), fork(watchGetClientBalance), fork(watchAddPayment),fork(watchAddInvoicePayment)]);
}

export default paymentSaga;
