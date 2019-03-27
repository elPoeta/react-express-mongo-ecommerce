import { GET_CUSTOMER, CLEAR_CUSTOMER, CUSTOMER_LOADING, GET_ERRORS } from './types';
import { URL_CUSTOMER, URL_ADD_ADDRESS_CUSTOMER } from '../utils/api-url';
import Http from '../utils/http';

export const getCustomer = () => async dispatch => {
    try {
        dispatch({ type: CUSTOMER_LOADING, payload: true });
        const customer = await Http.get(URL_CUSTOMER);
        dispatch({ type: GET_CUSTOMER, payload: customer });
    } catch (error) {
        console.log(error)
        dispatch({ type: GET_CUSTOMER, payload: {} });
    }
}

export const createCustomer = (customerData, history) => async dispatch => {
    try {
        dispatch({ type: CUSTOMER_LOADING, payload: true });
        const customer = await Http.post(URL_CUSTOMER, customerData);
        dispatch({ type: GET_CUSTOMER, payload: customer });
        history.push('/my-account');
    } catch (error) {
        const err = JSON.parse(error.message);
        dispatch({ type: GET_ERRORS, payload: err })
    }
}

export const addCustomerAddress = addressData => async dispatch => {
    try {
        dispatch({ type: CUSTOMER_LOADING, payload: true });
        const customer = await Http.post(URL_ADD_ADDRESS_CUSTOMER, addressData);
        dispatch({ type: GET_CUSTOMER, payload: customer });
    } catch (error) {
        const err = JSON.parse(error.message);
        dispatch({ type: GET_ERRORS, payload: err });
    }
}

export const deleteCustomerAddress = id => async dispatch => {
    try {
        dispatch({ type: CUSTOMER_LOADING, payload: true });
        const customer = await Http.delete(`${URL_ADD_ADDRESS_CUSTOMER}/${id}`);
        dispatch({ type: GET_CUSTOMER, payload: customer });
    } catch (error) {
        const err = JSON.parse(error.message);
        dispatch({ type: GET_ERRORS, payload: err });

    }
}

export const clearCustomer = () =>dispatch=>{
    dispatch({type:CLEAR_CUSTOMER, payload:null})
}