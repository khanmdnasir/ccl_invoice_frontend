import { APICore } from './apiCore';

const api = new APICore();


function getCompanySettings(params: {limit: number,page:number}) {
    const baseUrl = '/api/company_settings/';
    if(params.limit !== null && params.limit !== undefined && params.page !== null && params.page !== undefined){
        return api.get(`${baseUrl}`,params);
    }
    return api.get(`${baseUrl}`,{});
}

function addCompanySetting(params:any) {
    const baseUrl = '/api/company_settings/';
    return api.create(`${baseUrl}`,params);
}


export { getCompanySettings, addCompanySetting };
