import * as type from './types';


export const getPayment = (limit:number,page:number) => ({
    type: type.GET_PAYMENT_REQUESTED,
    payload: {limit,page},
});

export const getPaymentDetails = (id:number) => ({
    type: type.GET_PAYMENT_DETAILS_REQUESTED,
    payload: id,
});

export const getAllPayment = () => ({
    type: type.GET_ALLPAYMENT_REQUESTED,
    payload: {},
});


export const getPaymentTypes = (limit:number,page:number) => ({
    type: type.GET_PAYMENT_TYPES_REQUESTED,
    payload: {limit,page},
});

export const getDueInvoices = (id:number) => ({
    type: type.GET_DUE_INVOICES_REQUESTED,
    payload: id,
});

export const getClientBalance = (id:number) => ({
    type: type.GET_CLIENT_BALANCE_REQUESTED,
    payload: id,
});

export const getPaymentDetailsSuccessMsg = (msg:string) => ({
    type: type.GET_PAYMENT_DETAILS_SUCCESS_MSG,
    payload: msg,
});

export const setPaymentSuccessAlert = (msg:string) => ({
    type: type.SET_PAYMENT_SUCCESS_ALERT,
    payload: msg,
});

export const setPaymentErrorAlert = (msg:string) => ({
    type: type.SET_PAYMENT_ERROR_ALERT,
    payload: msg,
});



