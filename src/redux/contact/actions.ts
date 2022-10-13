import * as type from './types';


interface ContactForm {
    name: string;
    client_id: string;
    contact_type: string;
    contact_person: string;
    phone: string;
    email: string;
    city: string;
    country: string;
    billing_address: string;
}

export const getContact = (limit:number,page:number) => ({
    type: type.GET_CONTACT_REQUESTED,
    payload: {limit,page},
});

export const getAllContact = () => ({
    type: type.GET_ALLCONTACT_REQUESTED,
    payload: {},
});

export const addContact = (formData: ContactForm) => ({
    type: type.ADD_CONTACT_REQUESTED,
    payload: formData,
});

export const deleteContact = (id: number) => ({
    type: type.DELETE_CONTACT_REQUESTED,
    payload: id,
});