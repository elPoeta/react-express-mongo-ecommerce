import { combineReducers } from "redux";
import auth from "./authReducer";
import customer from "./customerReducer";
import errors from "./errorsReducer";
import category from "./categoryReducer";
import products from './productReducer';
import items from './cartReducer';
export default combineReducers({
  auth,
  customer,
  category,
  products,
  items,
  errors
});
