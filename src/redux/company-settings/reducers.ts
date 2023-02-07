import * as type from './types';

const INIT_STATE = {
    company_settings: [],
    company_setting_by_key: null,
    previous: '',
    next: '',
    current_page: '',
    total_page: '',
    active: '',
    loading: false,
    error: null,
};



const CompanySettings = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case type.GET_COMPANY_SETTINGS_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_COMPANY_SETTINGS_SUCCESS: {
            return {
                ...state,
                loading: false,
                company_settings: action.data.results,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_COMPANY_SETTINGS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }



        case type.GET_COMPANY_SETTINGS_BY_KEY_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_COMPANY_SETTINGS_BY_KEY_SUCCESS: {
            return {
                ...state,
                company_setting_by_key:action.data.data
            };
        }
        case type.GET_COMPANY_SETTINGS_BY_KEY_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }


        case type.SET_LOGO: {
            return {
                ...state,
                company_setting_by_key:action.payload
            };
        }


        case type.ADD_COMPANY_SETTINGS_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.ADD_COMPANY_SETTINGS_SUCCESS: {
            return {
                ...state,
                loading: false,
                company_settings: [action.data,...state.company_settings],
                success: 'Company Settings Created Successfully'

            };
        }
        case type.ADD_COMPANY_SETTINGS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.SET_COMPANY_SETTINGS_SUCCESS_ALERT: {
            return {
                ...state,
                success: action.payload,
            };
        }

        case type.SET_COMPANY_SETTINGS_ERROR_ALERT: {
            return {
                ...state,
                error: action.payload,
            };
        }
                
        default:
            return state;
    }
};

export default CompanySettings;
