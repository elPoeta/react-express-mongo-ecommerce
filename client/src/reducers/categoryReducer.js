import {
  GET_CATEGORIES,
  GET_CATEGORY,
  REMOVE_CATEGORY,
  CATEGORY_LOADING
} from "../actions/types";
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
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false
      };
    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: [
          ...state.categories.filter(
            category => category._id !== action.payload
          )
        ],
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
