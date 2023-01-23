import * as type from './types';

const INIT_STATE = {
    kamList: [],
    previous: '',
    next: '',
    current_page: '',
    total_page: '',
    active: '',
    loading: false,
    error: null,
    success: '',
};



const Kam = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case type.GET_KAM_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_KAM_SUCCESS: {
            return {
                ...state,
                loading: false,
                kamList: action.data.data,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_KAM_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }


        case type.SET_KAM_SUCCESS_ALERT: {
            return {
                ...state,
                success: action.payload,
            };
        }

        case type.SET_KAM_ERROR_ALERT: {
            return {
                ...state,
                error: action.payload,
            };
        }
        
        

        default:
            return state;
    }
};

export default Kam;
