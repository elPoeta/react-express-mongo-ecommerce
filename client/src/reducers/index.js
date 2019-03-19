import { combineReducers } from 'redux'
import auth from './authReducer';
import errors from './errorsReducer';

export default combineReducers({
    auth,
    errors
});
