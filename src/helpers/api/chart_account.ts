import { APICore } from './apiCore';

const api = new APICore();


function getChartAccount() {
    const baseUrl = '/api/account/';
    return api.get(`${baseUrl}`,{});
}

function addChartOfAccount(params:any) {
    const baseUrl = '/api/account/';
    return api.create(`${baseUrl}`,params);
}


export { getChartAccount, addChartOfAccount };
