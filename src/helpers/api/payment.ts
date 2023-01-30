import { APICore } from './apiCore';

const api = new APICore();


function getPayment(params: {limit: number,page:number}) {
    const baseUrl = '/api/payment/';
    return api.get(`${baseUrl}`,params);
}

function getPaymentDetails(params:any) {
    const baseUrl = `/api/payment/${params.payload}/`;
    return api.get(`${baseUrl}`,null);
}

function getPaymentTypes(params: {limit: number,page:number}) {
    const baseUrl = '/api/payment_method/';
    if (params.limit!==undefined && params.page!==undefined){
        return api.get(`${baseUrl}`,params);
    }
    else{
        return api.get(`${baseUrl}`,null);
    }
}

function getDueInvoices(params: {id: number}) {
    const baseUrl = `/api/client/${params.id}/due-invoice`;
    return api.get(`${baseUrl}`,null);
}

function getClientBalance(params: {id: number}) {
    const baseUrl = `/api/client/${params.id}/balance`;
    return api.get(`${baseUrl}`,null);
}


function addPayment(params: {data: any}) {
    const baseUrl = `/api/payment/`;
    return api.create(`${baseUrl}`,params);
}


function addInvoicePayment(params: {amount: any, id: any, adjustment_amount: any}) {
    const baseUrl = `/api/invoice/${params.id}/payment`;
    return api.create(`${baseUrl}`, params);
}


export { getPayment,getPaymentDetails, getDueInvoices, getPaymentTypes, getClientBalance, addPayment, addInvoicePayment };
