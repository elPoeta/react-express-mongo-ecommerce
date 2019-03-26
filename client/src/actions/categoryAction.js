import { GET_CATEGORIES, GET_CATEGORY, CATEGORY_LOADING, GET_ERRORS } from "./types";
import { URL_GET_CATEGORIES, URL_ADMIN_CATEGORY } from "../utils/api-url";
import Http from "../utils/http";

export const getCategories = () => async dispatch => {
  try {
    dispatch({ type: CATEGORY_LOADING, payload: true });
    const categories = await Http.get(URL_GET_CATEGORIES);
    dispatch({ type: GET_CATEGORIES, payload: categories });
  } catch (error) {
    const err = JSON.parse(error.message);
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export const addCategory = categoryData => async dispatch => {
  try {
    dispatch({ type: CATEGORY_LOADING, payload: true });
    const category = await Http.post(URL_ADMIN_CATEGORY, categoryData);
    dispatch({ type: GET_CATEGORY, payload: category })
  } catch (error) {
    const err = JSON.parse(error.message);
    dispatch({ type: GET_ERRORS, payload: err });
  }
}