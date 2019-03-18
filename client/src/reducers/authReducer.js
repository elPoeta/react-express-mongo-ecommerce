import { AUTH_USER } from '../actions/types';
import isEmpty from '../utils/isEmpty';

const initialState = {
    isAuthenticated: false,
    role: 'user',
    user: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                role: action.payload.user.role,
                user: action.payload
            };

        default:
            return state;
    }
};

