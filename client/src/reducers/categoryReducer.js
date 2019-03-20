import { GET_CATEGORIES, CATEGORY_LOADING } from "../actions/types";
const initialState = {
  categories: [],
  category: {},
  loading: false,
  errors: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    case CATEGORY_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};
