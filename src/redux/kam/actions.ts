import * as type from './types';

interface KamForm {
    id: string;
    name: string;
    phone: string;
    department: string;
}

export const getKam = (limit:number,page:number) => ({
    type: type.GET_KAM_REQUESTED,
    payload: {limit,page},
});

export const getKamDetails = (id:number) => {
    return ({
        type: type.GET_KAM_DETAILS_REQUESTED,
        payload: id,
    });
}

export const getAllKam = () => ({
    type: type.ADD_KAM_REQUESTED,
    payload: {},
});

export const addKam = (formData: KamForm) => ({
    type: type.ADD_KAM_REQUESTED,
    payload: formData,
});

export const updateError = (msg:string) => ({
    type: type.UPDATE_ERROR_KAM_FAILED,
    payload: msg,
});

export const deleteKam = (id: number) => ({
    type: type.DELETE_KAM_REQUESTED,
    payload: id,
});

export const setKamSuccessAlert = (msg:string) => ({
    type: type.SET_KAM_SUCCESS_ALERT,
    payload: msg,
});

export const setKamErrorAlert = (msg:string) => ({
    type: type.SET_KAM_ERROR_ALERT,
    payload: msg,
});

