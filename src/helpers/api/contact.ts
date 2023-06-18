import { APICore } from './apiCore';

const api = new APICore();


function getContact(params: {limit: number,page:number}) {
    const baseUrl = '/api/contact/';
    return api.get(`${baseUrl}`,params);
}

function getContactDetails(params:any) {
    const baseUrl = `/api/contact/${params.payload}`;
    return api.get(`${baseUrl}`,null);
}

function getContactInvoice(params:any) {
    const baseUrl = `/api/invoice?contact_id=${params.id}&limit=${params.limit}&page=${params.page}`;
    return api.get(`${baseUrl}`,null);
}

function getContactRepeatingInvoice(params:any) {
    const baseUrl = `/api/repeating-invoice?contact_id=${params.id}&limit=${params.limit}&page=${params.page}`;
    return api.get(`${baseUrl}`,null);
}

function getContactService(params:any) {
    const baseUrl = `/api/service?contact_id=${params.id}&limit=${params.limit}&page=${params.page}`;
    return api.get(`${baseUrl}`,null);
}
function getContactServices(params:any) {
    const baseUrl = `/api/service?contact_id=${params.id}`;
    return api.get(`${baseUrl}`,null);
}

function getContactPayment(params:any) {
    const baseUrl = `/api/payment?contact_id=${params.id}&limit=${params.limit}&page=${params.page}`;
    return api.get(`${baseUrl}`,null);
}

function getContactInvoiceSetting(params:any) {
    const baseUrl = `/api/invoice-setting?contact_id=${params.payload}`;
    return api.get(`${baseUrl}`,null);
}

function updateContactInvoiceSetting(params:any) {
    const baseUrl = `/api/invoice-setting/`;
    return api.create(`${baseUrl}`,params.payload);
}

function getAllContact() {
    const baseUrl = '/api/contact/';
    return api.get(`${baseUrl}`,{});
}

function addContact(params: { name:string,client_id:string,contact_type:string,contact_person:string,phone:string,bin:string,kam:string,email:string,city:string,country:string,billing_address:string }) {
    const baseUrl = '/api/contact/';
    return api.create(`${baseUrl}`,params);
}

function updateContact(params: { id: any, name:string,client_id:string,contact_type:string,contact_person:string,phone:string,bin:string,kam:string,email:string,city:string,country:string,billing_address:string }) {
    const baseUrl = `/api/contact/${params?.id}/`;
    return api.updatePatch(`${baseUrl}`,params);
}

function deleteContact(id:number) {
    const baseUrl = `/api/contact/${id}/`;
    return api.delete(`${baseUrl}`);
}

function editedContact(params: { id: any, name:string,client_id:string,contact_type:string,contact_person:string,phone:string,bin:string,kam:string,email:string,city:string,country:string,billing_address:string }) {
    const baseUrl = `/api/contact/${params?.id}/`;
    return api.updatePatch(`${baseUrl}`,params);
}

export { getContact, addContact,deleteContact,getAllContact, getContactInvoice,getContactService,getContactServices,getContactRepeatingInvoice,getContactPayment, getContactDetails, getContactInvoiceSetting, updateContactInvoiceSetting, updateContact,editedContact };
