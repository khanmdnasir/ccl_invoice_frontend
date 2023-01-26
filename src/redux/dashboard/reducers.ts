import * as type from './types';

const INIT_STATE = {
    summaryList: [],
    loading: false,
    error: null,
    success: '',
};



const Dashboard = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case type.GET_DASHBOARD_REQUESTED: {
            return {
                ...state,
                loading: true,
            };
        }
        case type.GET_DASHBOARD_SUCCESS: {
            return {
                ...state,
                loading: false,
                summaryList: action.data.data,
            };
        }
        case type.GET_DASHBOARD_FAILED: {
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

export default Dashboard;
