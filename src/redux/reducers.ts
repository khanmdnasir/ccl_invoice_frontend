import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import User from './user/reducers';
import Currency from './currency/reducers';
import Role from './roles/reducers';


export default combineReducers({
    Auth,
    Layout,
    User,
    Currency,
    Role,
    
});
