import {
  GET_PHOTOGRAPHERS,
  PHOTOGRAPHERS_LOADING,
  ADD_PHOTOGRAPHER,
  DELETE_PHOTOGRAPHER,
  UPDATE_PHOTOGRAPHER,
} from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";
import axios from "axios";

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
        type: ADD_PHOTOGRAPHER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
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
      `http://localhost:5000/photographers/update/${id}`,
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

export const setPhotographersLoading = () => {
  return {
    type: PHOTOGRAPHERS_LOADING,
  };
};
