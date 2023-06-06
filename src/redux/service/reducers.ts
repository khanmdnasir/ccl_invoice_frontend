import * as type from './types';

const INIT_STATE = {
    services: [],
    previous: '',
    next: '',
    current_page: '',
    total_page: '',
    active: '',
    loading: false,
    error: null,
};



const Service = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case type.GET_SERVICE_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_SERVICE_SUCCESS: {
            return {
                ...state,
                loading: false,
                services: action.data.results,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_SERVICE_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.GET_CONTACTSERVICE_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_CONTACTSERVICE_SUCCESS: {
            return {
                ...state,
                loading: false,
                services: action.data.results,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
                
                
            };
        }
        case type.GET_CONTACTSERVICE_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        case type.GET_CONTACTSERVICES_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_CONTACTSERVICES_SUCCESS: {
            return {
                ...state,
                loading: false,
                services: action.data.results,
                                
                
            };
        }
        case type.GET_CONTACTSERVICES_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.ADD_SERVICE_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.ADD_SERVICE_SUCCESS: {
            return {
                ...state,
                loading: false,
                services: [action.data,...state.services]
                
            };
        }
        case type.ADD_SERVICE_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        
       
                
        default:
            return state;
    }
};

export default Service;
