import { APICore } from './apiCore';

const api = new APICore();


function getChartAccount(params: {limit: number,page:number}) {
    const baseUrl = '/api/account/';
    return api.get(`${baseUrl}`,params);
}

function addChartOfAccount(params:any) {
    const baseUrl = '/api/account/';
    return api.create(`${baseUrl}`,params);
}


export { getChartAccount, addChartOfAccount };
