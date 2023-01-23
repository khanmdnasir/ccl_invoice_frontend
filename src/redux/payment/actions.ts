import * as type from './types';


export const getPayment = (limit:number,page:number) => ({
    type: type.GET_PAYMENT_REQUESTED,
    payload: {limit,page},
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




