import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// helpers
import {
    getCompanySettings as getCompanySettingsApi,
    addCompanySetting as addCompanySettingApi,
    
} from '../../helpers';

interface companySettingsData {
    payload: {
        id: number;
        company_settings: any;
        limit: number;
        page: number;
        contact_id: number;
    };
    type: string;
}

function* getCompanySettings({ payload: {limit,page}}:companySettingsData):SagaIterator {
    try {
        const response = yield call(getCompanySettingsApi,{limit,page});
        const data = response.data;
        yield put({type: 'GET_COMPANY_SETTINGS_SUCCESS' , data: data});
    } catch (error) {
        yield put({type: 'GET_COMPANY_SETTINGS_FAILED', error: error});
        
    }
}

function* addCompanySetting({ payload: company_settings }: companySettingsData):SagaIterator {
    try {
        const response = yield call(addCompanySettingApi, company_settings);
        const result = response.data;
        
        if(result.success){
            yield put({type: 'ADD_COMPANY_SETTINGS_SUCCESS' , data: result.data});
        }else{
            yield put({type: 'ADD_COMPANY_SETTINGS_FAILED', error: result.error});
        }
        
    } catch (error) {
        yield put({type: 'ADD_COMPANY_SETTINGS_FAILED', error: error});
        
    }
}



export function* watchGetCompanySettings() {
    yield takeEvery('GET_COMPANY_SETTINGS_REQUESTED', getCompanySettings);
}



export function* watchAddCompanySetting() {
    yield takeEvery('ADD_COMPANY_SETTINGS_REQUESTED', addCompanySetting);
}



function* companySettingsSaga() {
    yield all([fork(watchGetCompanySettings),fork(watchAddCompanySetting)]);
}

export default companySettingsSaga;
