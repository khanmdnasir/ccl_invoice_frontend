import * as type from './types';

const INIT_STATE = {
    kam: [],
    kam_details: [],
    all_kam: [],
    previous: '',
    next: '',
    current_page: '',
    total_object: '',
    total_page: '',
    active: '',
    loading: false,
    error: null,
    success:null,
};

const Kam = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case type.GET_KAM_REQUESTED:{
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_KAM_SUCCESS: {
            return {
                ...state,
                loading: false,
                kam: action.data.results,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_object: action.data.total_object,
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

        case type.GET_KAM_DETAILS_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_KAM_DETAILS_SUCCESS: {
            return {
                ...state,
                loading: false,
                kam_details: action.data,
            };
        }
        case type.GET_KAM_DETAILS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.GET_ALLKAM_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_ALLKAM_SUCCESS: {
            return {
                ...state,
                loading: false,
                all_kam: action.data,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_ALLKAM_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.ADD_KAM_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.ADD_KAM_SUCCESS: {
            // console.log("saga",action.kam)
            return {
                ...state,
                loading: false,
                kam: [action.kam,...state.kam],
                success:'Kam Created Successfully'
                
            };
        }
        case type.ADD_KAM_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.DELETE_KAM_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.DELETE_KAM_SUCCESS: {
            const newKam = state.kam.filter(({i}) => i !== action.id)
            return {
                ...state,
                loading: false,
                kam: newKam
                
            };
        }
        case type.DELETE_KAM_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
       
        case type.UPDATE_ERROR_KAM_FAILED: {
            
            return {
                ...state,
                error: action.payload,
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
}

export default Kam;
