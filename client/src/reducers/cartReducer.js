import { GET_CART, ADD_ITEM_CART, REMOVE_ITEM_CART, UPDATE_ITEM_CART, CART_LOADING } from "../actions/types";
const initialState = {
    items: {},
    loading: false,
    errors: {}
};
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case CART_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};