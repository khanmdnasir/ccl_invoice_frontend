import * as type from './types';


interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    role: number;
    is_active: boolean;
}

export const getUser = (limit:number,page:number) => ({
    type: type.GET_USER_REQUESTED,
    payload: {limit,page},
});

export const addUser = (formData: UserData) => ({
    type: type.ADD_USER_REQUESTED,
    payload: formData,
});


