import clientRegistration from './clientRegistration';
import clientLogin from './clientLogin';
import { combineReducers } from 'redux'

export default combineReducers({
    clientRegistration,
    clientLogin
});