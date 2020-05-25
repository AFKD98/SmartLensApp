import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // USer loading
  dispatch({ type: USER_LOADING });

  axios
    .get(
      "https://smartlensapplication.herokuapp.com/users/getuser",
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register User
export const register = ({ name, email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post(
      "https://smartlensapplication.herokuapp.com/users/register",
      body,
      config
    )
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Login user
export const login = ({ email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // request body
  const body = JSON.stringify({ email, password });

  axios
    .post(
      "https://smartlensapplication.herokuapp.com/users/login",
      body,
      config
    )
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Logout
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Login photographer
export const loginPhotographer = ({ Email, Password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // request body
  const body = JSON.stringify({ Email, Password });

  axios
    .post(
      "https://smartlensapplication.herokuapp.com/photographers/login",
      body,
      config
    )
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Logout photographer
export const logoutPhotographer = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from local state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
