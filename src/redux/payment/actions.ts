import * as type from './types';


export const getPayment = (limit:number,page:number) => ({
    type: type.GET_PAYMENT_REQUESTED,
    payload: {limit,page},
});

export const addPayment = (data:any) => ({
    type: type.ADD_PAYMENT_REQUESTED,
    payload: data,
});


export const addInvoicePayment = (data:any) => ({
    type: type.ADD_INVOICE_PAYMENT_REQUESTED,
    payload: data,
});

export const getPaymentDetails = (id:number) => ({
    type: type.GET_PAYMENT_DETAILS_REQUESTED,
    payload: id,
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


export const clearSubmitSuccessMessage = () => ({
    type: type.CLEAR_SUBMIT_SUCCESS_MESSAGE,
    payload: {},
});


export const clearSubmitErrorMessage = () => ({
    type: type.CLEAR_SUBMIT_ERROR_MESSAGE,
    payload: {},
});


export const clearDueInvoices = () => ({
    type: type.CLEAR_DUE_INVOICES,
    payload: {},
});

export const resetPaymentReducerState = () => ({
    type: type.RESET_PAYMENT_REDUCER_STATE,
    payload: {},
});




