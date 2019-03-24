import { GET_CUSTOMER, CUSTOMER_LOADING, GET_ERRORS } from './types';
import { URL_GET_CUSTOMER } from '../utils/api-url';
import Http from '../utils/http';

export const getCustomer = () => async dispatch => {
    try {
        dispatch({ type: CUSTOMER_LOADING, payload: true });
        const customer = await Http.get(URL_GET_CUSTOMER);
        dispatch({ type: GET_CUSTOMER, payload: customer });
    } catch (error) {
        console.log(error)
        dispatch({ type: GET_CUSTOMER, payload: {} });
    }
}