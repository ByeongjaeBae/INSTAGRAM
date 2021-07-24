import { combineReducers } from 'redux';
import Auth from './auth';
import User from './user';

const rootReducer = combineReducers({ Auth, User });

export default rootReducer;
