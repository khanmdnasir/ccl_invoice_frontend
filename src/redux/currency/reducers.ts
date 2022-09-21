import * as type from './types';

const INIT_STATE = {
    currency: [],
    previous: '',
    next: '',
    current_page: '',
    total_page: '',
    active: '',
    selectedCurrency: {},
    loading: false,
    error: null,
};



const Currency = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case type.GET_CURRENCY_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_CURRENCY_SUCCESS: {
            return {
                ...state,
                loading: false,
                currency: action.data.results,
                selectedCurrency: action.data.results[0],
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_CURRENCY_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.ADD_CURRENCY_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.ADD_CURRENCY_SUCCESS: {
            return {
                ...state,
                loading: false,
                currency: [...state.currency,action.currency]
                
            };
        }
        case type.ADD_CURRENCY_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        case type.SELECT_CURRENCY_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.SELECT_CURRENCY_SUCCESS: {
            return {
                ...state,
                loading: false,
                selectedCurrency: action.scurrency,
            };
        }
                
        default:
            return state;
    }
};

export default Currency;
