import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getContact as getContactApi,
    getContactInvoice as getContactInvoiceApi,
    getAllContact as getAllContactApi,
    addContact as addContactApi,
    deleteContact as deleteContactApi
    
} from '../../helpers';

interface ContactData {
    payload: {
        id: number;
        name: string;
        client_id: string;
        contact_type: string;
        contact_person: string;
        phone: string;
        email: string;
        city: string;
        country: string;
        billing_address: string;
        limit: number;
        page: number;
    };
    type: string;
}

function* getContact({ payload: {limit,page}}:ContactData):SagaIterator {
    try {
        const response = yield call(getContactApi,{limit,page});
        const data = response.data;
        yield put({type: 'GET_CONTACT_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_CONTACT_FAILED', error: error});
        
    }
}


function* getContactInvoice({ payload }:ContactData):SagaIterator {
    try {
        const response = yield call(getContactInvoiceApi,{payload});
        const data = response.data;
        yield put({type: 'GET_CONTACT_INVOICE_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_CONTACT_INVOICE_FAILED', error: error});
        
    }
}

function* getAllContact():SagaIterator {
    try {
        const response = yield call(getAllContactApi);
        const data = response.data;
        yield put({type: 'GET_ALLCONTACT_SUCCESS' , data: data.results});
    } catch (error) {
        yield put({type: 'GET_ALLCONTACT_FAILED', error: error});
        
    }
}



function* addContact({ payload: {name,client_id,contact_type,contact_person,phone,email,city,country,billing_address} }: ContactData):SagaIterator {
    
    try {
        const response = yield call(addContactApi,{name,client_id,contact_type,contact_person,phone,email,city,country,billing_address});
        const result = response.data;
        if(result.success){
            yield put({type: 'ADD_CONTACT_SUCCESS' , contact: result.data});
        }else{
            yield put({type: 'ADD_CONTACT_FAILED', error: result.error});
        }
        
    } catch (error) {
        yield put({type: 'ADD_CONTACT_FAILED', error: error});
        
    }
}

function* deleteContact({ payload: {id} }: ContactData):SagaIterator {
    try {
        console.log(id)
        const response = yield call(deleteContactApi,id);
        const result = response.data;
        if(result.success){
            yield put({type: 'DELETE_CONTACT_SUCCESS' , id: id});
        }else{
            yield put({type: 'DELETE_CONTACT_FAILED', error: result.error});
        }
        
    } catch (error) {
        yield put({type: 'DELETE_CONTACT_FAILED', error: error});
        
    }
}


export function* watchGetContact() {
    yield takeEvery('GET_CONTACT_REQUESTED', getContact);
}


export function* watchGetContactInvoice() {
    yield takeEvery('GET_CONTACT_INVOICE_REQUESTED', getContactInvoice);
}


export function* watchGetAllContact() {
    yield takeEvery('GET_ALLCONTACT_REQUESTED', getAllContact);
}



export function* watchAddContact() {
    yield takeEvery('ADD_CONTACT_REQUESTED', addContact);
}

export function* watchDeleteContact() {
    yield takeEvery('DELETE_CONTACT_REQUESTED', deleteContact);
}



function* contactSaga() {
    yield all([fork(watchGetContact),fork(watchAddContact),fork(watchDeleteContact),fork(watchGetAllContact), fork(watchGetContactInvoice)]);
}

export default contactSaga;
