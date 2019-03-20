import { GET_CART, CART_LOADING, GET_ERRORS } from './types';
import { URL_GET_CART } from '../utils/api-url';
import Http from '../utils/http';
import jwtDecode from 'jwt-decode';

export const getCart = () => async distpatch => {
    try {
        distpatch({ type: CART_LOADING, payload: true });
        const token = await Http.post(URL_GET_CART, JSON.parse(localStorage.getItem('cartItems')) || {});
        const cartToken = { token }
        localStorage.setItem('cartItems', JSON.stringify(cartToken));
        const { items } = jwtDecode(token);
        distpatch({ type: GET_CART, payload: items });
    } catch (error) {
        const err = JSON.parse(error.message);
        distpatch({ type: GET_ERRORS, payload: err });
    }
}

export const addItemCart = id => async distpatch => {
    try {

        distpatch({ type: CART_LOADING, payload: true });
        const token = await Http.post(`${URL_GET_CART}/${id}`, JSON.parse(localStorage.getItem('cartItems')) || {});
        const cartToken = { token }
        localStorage.setItem('cartItems', JSON.stringify(cartToken));
        const { items } = jwtDecode(token);
        distpatch({ type: GET_CART, payload: items });
    } catch (error) {
        const err = JSON.parse(error.message);
        distpatch({ type: GET_ERRORS, payload: err });
    }
}