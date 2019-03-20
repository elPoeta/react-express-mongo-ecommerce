import { GET_CATEGORIES, CATEGORY_LOADING, GET_ERRORS } from "./types";
import { URL_GET_CATEGORIES } from "../utils/api-url";
import Http from "../utils/http";

export const getCategories = () => async distpatch => {
  try {
    distpatch({ type: CATEGORY_LOADING, payload: true });
    const categories = await Http.get(URL_GET_CATEGORIES);
    distpatch({ type: GET_CATEGORIES, payload: categories });
  } catch (error) {
    const err = JSON.parse(error.message);
    distpatch({ type: GET_ERRORS, payload: err });
  }
};
