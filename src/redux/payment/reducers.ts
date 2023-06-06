import * as type from './types';

const INIT_STATE = {
    payments: [],
    payment_types: [],
    due_invoices: [],
    client_balance: 0,
    payment_details: [],
    all_payment: [],
    previous: '',
    next: '',
    current_page: '',
    total_page: '',
    active: '',
    loading: false,
    error: null,
    success: null,
    payment_error: null,
    payment_success:null,
    invoice_payment_error: null,
    invoice_payment_success:null,
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

        case type.GET_CONTACT_PAYMENT_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_CONTACT_PAYMENT_SUCCESS: {
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
        case type.GET_CONTACT_PAYMENT_FAILED: {
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
            // console.log(action.data);
            return {
                ...state,
                loading: false,
                payment_details: action.data.data,
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

        case type.GET_ALLPAYMENT_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_ALLPAYMENT_SUCCESS: {
            return {
                ...state,
                loading: false,
                all_payment: action.data,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_ALLPAYMENT_FAILED: {
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
                payment_types: action.data.data,
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


                        
        case type.GET_CLIENT_BALANCE_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_CLIENT_BALANCE_SUCCESS: {
            return {
                ...state,
                loading: false,
                client_balance: action.data.data,
            };
        }
        case type.GET_CLIENT_BALANCE_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }


        case type.SET_PAYMENT_SUCCESS_ALERT: {
            
            return {
                ...state,
                success: action.payload,
            };
        }

        case type.SET_PAYMENT_ERROR_ALERT: {
            
            return {
                ...state,
                error: action.payload,
            };
        }

        // case type.GET_PAYMENT_DETAILS_SUCCESS_MSG: {
            
        //     return {
        //         ...state,
        //         success:'Payment Canceled Successfully',
        //     };
        // }

                        
        case type.ADD_PAYMENT_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.ADD_PAYMENT_SUCCESS: {
            return {
                 ...state,
                loading: false,
                payments: [action.data.data,...state.payments],
                payment_success:'Payment Successful'
            };
        }
        case type.ADD_PAYMENT_FAILED: {
            return {
                ...state,
                loading: false,
                payment_error: action.error,
            };
        }

                        
        case type.ADD_INVOICE_PAYMENT_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.ADD_INVOICE_PAYMENT_SUCCESS: {
            return {
                 ...state,
                loading: false,
                invoice_payment_success:'Invoice Payment Successful'
            };
        }
        case type.ADD_INVOICE_PAYMENT_FAILED: {
            let invoice_payment_error = null
            
            if (action?.error?.error){
                invoice_payment_error = action?.error?.error
            }
            else{
                invoice_payment_error = "Something Went Wrong"
            }
            return {
                ...state,
                loading: false,
                invoice_payment_error: invoice_payment_error,
            };
        }


        case type.CLEAR_SUBMIT_SUCCESS_MESSAGE: {
            return {
                ...state,
                loading: false,
                payment_success: null,
                invoice_payment_success: null,
            };
        }

        case type.CLEAR_SUBMIT_ERROR_MESSAGE: {
            return {
                ...state,
                loading: false,
                payment_error: null,
                invoice_payment_error: null,
            };
        }

        case type.CLEAR_DUE_INVOICES: {
            return {
                ...state,
                loading: false,
                due_invoices: [],
            };
        }


        case type.RESET_PAYMENT_REDUCER_STATE: {
            return {
                payments: [],
                payment_types: state.payment_types,
                due_invoices: [],
                client_balance: 0,
                payment_details: [],
                previous: '',
                next: '',
                current_page: '',
                total_page: '',
                active: '',
                loading: false,
                error: null,
                success: null,
                payment_error: null,
                payment_success:null,
            };
        }

        default:
            return state;
    }
};

export default Payment;
