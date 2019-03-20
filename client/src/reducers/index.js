import { combineReducers } from "redux";
import auth from "./authReducer";
import errors from "./errorsReducer";
import category from "./categoryReducer";

export default combineReducers({
  auth,
  category,
  errors
});
