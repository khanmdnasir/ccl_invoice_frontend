import { APICore } from './apiCore';

const api = new APICore();


function getRole(params: {limit: number,page:number}) {
    const baseUrl = '/api/groups/';
    return api.get(`${baseUrl}`,params);
}

function getUserRole() {
    const baseUrl = '/api/user_role';
    return api.get(`${baseUrl}`,{});
}



export { getRole,getUserRole };
