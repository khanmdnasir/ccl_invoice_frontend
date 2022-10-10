import { APICore } from './apiCore';

const api = new APICore();


function getInvoice(params: {limit: number,page:number}) {
    const baseUrl = '/api/invoice/';
    return api.get(`${baseUrl}`,params);
}

function getInvoiceDetails(params: {id:number}) {
    const baseUrl = `/api/invoice/${params}/`;
    return api.get(`${baseUrl}`,{});
}

export { getInvoice,getInvoiceDetails };
