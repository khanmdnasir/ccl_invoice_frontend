import { APICore } from './apiCore';

const api = new APICore();

function getKam(params: {limit: number, page:number}){
    const baseUrl = '/api/kam';
    return api.get(`${baseUrl}`,params);
}

function getKamDetails(params:any){
    const baseUrl = `/api/kam/${params.payload}`;
    return api.get(`${baseUrl}`,null);
}

function getAllKam(){
    const baseUrl = '/api/kam';
    return api.get(`${baseUrl}`,{});
}

function addKam(params: {id:number,name:string,phone:string,email:string,department:string}) {
    const baseUrl = '/api/kam/';
    return api.create(`${baseUrl}`,params);
}

function deleteKam(id:number) {
    const baseUrl = `/api/kam/${id}`;
    return api.delete(`${baseUrl}`);
}

export {getKam,getKamDetails,getAllKam,addKam,deleteKam};
