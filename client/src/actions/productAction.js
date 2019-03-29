import {
  GET_PRODUCTS,
  GET_PRODUCT,
  PRODUCT_LOADING,
  GET_ERRORS,
  REMOVE_PRODUCT
} from "./types";
import {
  URL_GET_PRODUCTS,
  URL_ADMIN_PRODUCT,
  URL_GET_PRODUCTS_BY_CATEGORY,
  URL_GET_PRODUCT_BY_ID
} from "../utils/api-url";
import Http from "../utils/http";

export const getProducts = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LOADING, payload: true });
    const products = await Http.get(URL_GET_PRODUCTS);
    dispatch({ type: GET_PRODUCTS, payload: products });
  } catch (error) {
    const err = JSON.parse(error.message);
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export const getProductById = id => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LOADING, payload: true });
    const product = await Http.get(`${URL_GET_PRODUCT_BY_ID}/${id}`);
    dispatch({ type: GET_PRODUCT, payload: product });
  } catch (error) {
    const err = JSON.parse(error.message);
    dispatch({ type: GET_ERRORS, payload: err });
  }
};
export const getProductByIdToEdit = id => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LOADING, payload: true });
    const product = await Http.get(`${URL_ADMIN_PRODUCT}/${id}`);
    dispatch({ type: GET_PRODUCT, payload: product });
  } catch (error) {
    const err = JSON.parse(error.message);
    dispatch({ type: GET_ERRORS, payload: err });
  }
};
export const getProductsByCategory = category => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LOADING, payload: true });
    const products = await Http.get(
      `${URL_GET_PRODUCTS_BY_CATEGORY}/${category}`
    );
    dispatch({ type: GET_PRODUCTS, payload: products });
  } catch (error) {
    const err = JSON.parse(error.message);
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export const addProduct = productData => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LOADING, payload: true });
    const product = await Http.post(URL_ADMIN_PRODUCT, productData);
    dispatch({ type: GET_PRODUCT, payload: product });
  } catch (error) {
    const err = JSON.parse(error.message);
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export const editProduct = (productData, history) => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LOADING, payload: true });
    const product = await Http.post(URL_ADMIN_PRODUCT, productData);
    dispatch({ type: GET_PRODUCT, payload: product });
    history.push("/dashboard");
  } catch (error) {
    const err = JSON.parse(error.message);
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export const deleteProduct = id => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LOADING, payload: true });
    const product = await Http.delete(`${URL_ADMIN_PRODUCT}/${id}`);
    if (product.success) {
      dispatch({ type: REMOVE_PRODUCT, payload: id })
    }
  } catch (error) {
    const err = JSON.parse(error.message);
    dispatch({ type: GET_ERRORS, payload: err });
  }
}
