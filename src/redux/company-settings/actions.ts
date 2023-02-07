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


export const getCompanySettingsByKey = (data:any) => ({
    type: type.GET_COMPANY_SETTINGS_BY_KEY_REQUESTED,
    payload: data,
});

export const getLogo = () => ({
    type: type.GET_LOGO_REQUESTED,
    payload: null,
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


export const setLogo = (data:any) => ({
    type: type.SET_LOGO,
    payload: data,
});
