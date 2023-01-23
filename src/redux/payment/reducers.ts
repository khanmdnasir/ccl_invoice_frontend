import * as type from './types';

const INIT_STATE = {
    payments: [],
    payment_types: [],
    due_invoices: [],
    payment_details: [],
    previous: '',
    next: '',
    current_page: '',
    total_page: '',
    active: '',
    loading: false,
    error: null,
};



const Payment = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case type.GET_PAYMENT_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_PAYMENT_SUCCESS: {
            return {
                ...state,
                loading: false,
                payments: action.data.results,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_PAYMENT_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        
        case type.GET_PAYMENT_DETAILS_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_PAYMENT_DETAILS_SUCCESS: {
            return {
                ...state,
                loading: false,
                payment_details: action.data.result,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_PAYMENT_DETAILS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

                
        case type.GET_PAYMENT_TYPES_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_PAYMENT_TYPES_SUCCESS: {
            return {
                ...state,
                loading: false,
                payment_types: action.data.result,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_PAYMENT_TYPES_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }


                        
        case type.GET_DUE_INVOICES_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_DUE_INVOICES_SUCCESS: {
            return {
                ...state,
                loading: false,
                due_invoices: action.data.data,
            };
        }
        case type.GET_DUE_INVOICES_FAILED: {
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

export default Payment;
