import * as type from './types';


export const getPayment = (limit:number,page:number) => ({
    type: type.GET_PAYMENT_REQUESTED,
    payload: {limit,page},
});

export const addPayment = (data:any) => ({
    type: type.ADD_PAYMENT_REQUESTED,
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


export const clearSuccessMessage = () => ({
    type: type.CLEAR_SUCCESS_MESSAGE,
    payload: {},
});




