import { AUTH_USER, GET_ERRORS } from "./types";
import jwtDecode from "jwt-decode";
import { URL_REGISTER, URL_LOGIN } from "../utils/api-url";
import Http from "../utils/http";

export const signUp = userData => async dispatch => {
  try {
    const { token } = await Http.post(URL_REGISTER, userData);
    const user = jwtDecode(token);
    localStorage.setItem("token", token);
    dispatch({ type: AUTH_USER, payload: user });
  } catch (error) {
    const err = JSON.parse(error.message);
    dispatch({ type: GET_ERRORS, payload: err });
  }
};

export const login = userData => async dispatch => {
  try {
    const { token } = await Http.post(URL_LOGIN, userData);
    const user = jwtDecode(token);
    localStorage.setItem("token", token);
    dispatch({ type: AUTH_USER, payload: user });
  } catch (error) {
    const err = JSON.parse(error.message);
    dispatch({ type: GET_ERRORS, payload: err });
  }
};


export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: AUTH_USER,
    payload: {}
  };
};