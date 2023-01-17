import { APICore } from './apiCore';

const api = new APICore();


function getKamList(params: {limit: number,page:number}) {
    const baseUrl = '/api/kam/';
    if(params.limit !== null && params.limit !== undefined && params.page !== null && params.page !== undefined){
        return api.get(`${baseUrl}`,params);
    }
    return api.get(`${baseUrl}`,{});
}


export { getKamList };
