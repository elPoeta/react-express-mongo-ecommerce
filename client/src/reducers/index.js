import { combineReducers } from "redux";
import auth from "./authReducer";
import errors from "./errorsReducer";
import category from "./categoryReducer";
import products from './productReducer';
export default combineReducers({
  auth,
  category,
  products,
  errors
});
