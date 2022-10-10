import { APICore } from './apiCore';

const api = new APICore();


function getChartAccount() {
    const baseUrl = '/api/account/';
    return api.get(`${baseUrl}`,{});
}


export { getChartAccount };
