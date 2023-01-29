import * as type from './types';


interface CompanySettingForm {
    key: string;
    value: any;
    type: string;
}

export const getCompanySettings = (limit:number,page:number) => ({
    type: type.GET_COMPANY_SETTINGS_REQUESTED,
    payload: {limit,page},
});


export const getInvoiceMappingCompanySettings = () => ({
    type: type.GET_INVOICE_MAPPING_COMPANY_SETTINGS_REQUESTED,
    payload: {},
});

export const addCompanySetting = (company_setting: CompanySettingForm) => ({
    type: type.ADD_COMPANY_SETTINGS_REQUESTED,
    payload: company_setting,
});


export const setCompanySettingsSuccessAlert = (msg:string) => ({
    type: type.SET_COMPANY_SETTINGS_SUCCESS_ALERT,
    payload: msg,
});


export const setCompanySettingsErrorAlert = (msg:string) => ({
    type: type.SET_COMPANY_SETTINGS_ERROR_ALERT,
    payload: msg,
});
