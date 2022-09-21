import { APICore } from './apiCore';

const api = new APICore();


function getCurrency(params: {limit: number,page:number}) {
    const baseUrl = '/api/currency/';
    return api.get(`${baseUrl}`,params);
}

function addCurrency(params: { prefix: string; short_key: string;is_active: boolean }) {
    const baseUrl = '/api/currency/';
    return api.create(`${baseUrl}`,params);
}


export { getCurrency, addCurrency };
