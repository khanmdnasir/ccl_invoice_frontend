import * as type from './types';


export const getRepeatingInvoice = (limit:number,page:number,filter:string) => ({
    type: type.GET_REPEATINGINVOICE_REQUESTED,
    payload: {limit,page,filter},
});

export const getRepeatingInvoiceDetails = (id:number) => ({
    type: type.GET_REPEATINGINVOICEDETAILS_REQUESTED,
    payload: id,
});

export const getContactRepeatingInvoice = (id:any, limit:any, page:any) => ({
    type: type.GET_CONTACT_REPEATINGINVOICE_REQUESTED,
    payload: {id, limit, page},
});
