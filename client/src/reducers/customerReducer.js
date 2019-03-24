import { GET_CUSTOMER } from '../actions/types';

const initialState = {
    customer: null,
    loading: false,
    errors: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CUSTOMER: return {
            ...state,
            customer: action.payload,
            loading: false
        }
        default: return state;
    }
}