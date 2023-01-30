import { APICore } from './apiCore';

const api = new APICore();


function getDashboardSummary(params: {limit: number,page:number}) {
    const baseUrl = '/api/dashboard/summary';
    if(params.limit !== null && params.limit !== undefined && params.page !== null && params.page !== undefined){
        return api.get(`${baseUrl}`,params);
    }
    return api.get(`${baseUrl}`,{});
}


export { getDashboardSummary };
