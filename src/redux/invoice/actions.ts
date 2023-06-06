import * as type from './types';


export const getInvoice = (limit:number,page:number) => ({
    type: type.GET_INVOICE_REQUESTED,
    payload: {limit,page},
});

export const getInvoiceDetails = (id:number) => ({
    type: type.GET_INVOICEDETAILS_REQUESTED,
    payload: id,
});

export const getContactInvoice = (id:any, limit:any, page:any) => ({
    type: type.GET_CONTACT_INVOICE_REQUESTED,
    payload: {id, limit, page},
});



