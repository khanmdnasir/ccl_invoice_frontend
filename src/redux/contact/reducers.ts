import * as type from './types';

const INIT_STATE = {
    contact: [],
    all_contact: [],
    previous: '',
    next: '',
    current_page: '',
    total_page: '',
    active: '',
    loading: false,
    error: null,
};



const Contact = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case type.GET_CONTACT_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_CONTACT_SUCCESS: {
            return {
                ...state,
                loading: false,
                contact: action.data.results,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_CONTACT_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.GET_ALLCONTACT_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_ALLCONTACT_SUCCESS: {
            return {
                ...state,
                loading: false,
                all_contact: action.data,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_ALLCONTACT_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.ADD_CONTACT_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.ADD_CONTACT_SUCCESS: {
            return {
                ...state,
                loading: false,
                contact: [action.contact,...state.contact]
                
            };
        }
        case type.ADD_CONTACT_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.DELETE_CONTACT_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.DELETE_CONTACT_SUCCESS: {
            const newContact = state.contact.filter(({i}) => i !== action.id)
            return {
                ...state,
                loading: false,
                contact: newContact
                
            };
        }
        case type.DELETE_CONTACT_FAILED: {
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

export default Contact;
