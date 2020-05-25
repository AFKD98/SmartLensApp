import {
  GET_PHOTOGRAPHERS,
  PHOTOGRAPHERS_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  DELETE_PHOTOGRAPHER,
  UPDATE_PHOTOGRAPHER,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  ADD_PHOTOGRAPHER_FAIL,
} from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";
import axios from "axios";

// Login
export const loginPhoto = ({ Email, Password }) => (dispatch) => {
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

// Logout
export const logoutPhoto = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Check token & load user
export const loadPhotographer = () => (dispatch, getState) => {
  // USer loading
  dispatch({ type: USER_LOADING });

  axios
    .get(
      "https://smartlensapplication.herokuapp.com/photographers/getuser",
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

export const getPhotographers = () => (dispatch, getState) => {
  dispatch(setPhotographersLoading());
  axios
    .get("https://smartlensapplication.herokuapp.com/photographers")
    .then((res) =>
      dispatch({
        type: GET_PHOTOGRAPHERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addPhotographer = (photolad) => (dispatch, getState) => {
  axios
    .post(
      "https://smartlensapplication.herokuapp.com/photographers/add",
      photolad,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ADD_PHOTOGRAPHER_FAIL"
        )
      );
      dispatch({
        type: ADD_PHOTOGRAPHER_FAIL,
      });
    });
};

export const deletePhotographer = (id) => (dispatch, getState) => {
  axios
    .delete(
      `https://smartlensapplication.herokuapp.com/photographers/${id}`,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: DELETE_PHOTOGRAPHER,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updatePhotographer = (photolad) => (dispatch, getState) => {
  const id = photolad._id;
  axios
    .post(
      `https://smartlensapplication.herokuapp.com/photographers/update/${id}`,
      photolad,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: UPDATE_PHOTOGRAPHER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updatePhotographerText = (photolad) => (dispatch, getState) => {
  const id = photolad._id;

  axios
    .post(
      `https://smartlensapplication.herokuapp.com/photographers/updatetext/${id}`,
      {
        //  this.state.photographer
        Name: photolad.Name,
        Username: photolad.Username,
        Password: photolad.Password,
        ContactNumber: photolad.ContactNumber,
        Email: photolad.Email,
        Calendar: photolad.Calendar, //calendar link
        Level: photolad.Level,
        Range: photolad.Range,
        Address: photolad.Address,
        Equipment: photolad.Equipment,
        Bio: photolad.Bio,
        Category: photolad.Category, //check number of categories
        videos: photolad.videos,
        date: photolad.date,
      },

      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: UPDATE_PHOTOGRAPHER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setPhotographersLoading = () => {
  return {
    type: PHOTOGRAPHERS_LOADING,
  };
};
