import * as type from './types';


interface CompanySettingForm {
    company_setting: any[];
}

export const getCompanySettings = (limit:number,page:number) => ({
    type: type.GET_COMPANY_SETTINGS_REQUESTED,
    payload: {limit,page},
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
