import { GET_PRODUCTS, PRODUCT_LOADING } from "../actions/types";
const initialState = {
    products: [],
    product: {},
    loading: false,
    errors: {}
};
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        case PRODUCT_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};
