import * as type from './types';


interface ServiceForm {
    service: any[];
}

export const getService = (limit:number,page:number) => ({
    type: type.GET_SERVICE_REQUESTED,
    payload: {limit,page},
});


export const addService = (service: ServiceForm) => ({
    type: type.ADD_SERVICE_REQUESTED,
    payload: service,
});


export const getContactService = (id:any, limit:any, page:any) => ({
    type: type.GET_CONTACTSERVICE_REQUESTED,
    payload: {id, limit, page},
});

export const getContactServices = (id:any) => ({
    type: type.GET_CONTACTSERVICES_REQUESTED,
    payload: {id}
});
