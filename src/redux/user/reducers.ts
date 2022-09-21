import * as type from './types';

const INIT_STATE = {
    users: [],
    previous: '',
    next: '',
    current_page: '',
    total_page: '',
    active: '',
    loading: false,
    error: null,
};





const User = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case type.GET_USER_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                users: action.data.results,
                previous: action.data.previous,
                next: action.data.next,
                current_page: action.data.current_page,
                total_page: action.data.total_page,
                active: action.data.current_page,
            };
        }
        case type.GET_USER_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case type.ADD_USER_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.ADD_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                users: [...state.users,action.user]
                
            };
        }
        case type.ADD_USER_FAILED: {
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

export default User;
