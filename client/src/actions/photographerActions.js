import {
  GET_PHOTOGRAPHERS,
  PHOTOGRAPHERS_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
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
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  axios
    .post(
      "http://localhost:5000/photographers/add",
      photolad,
      config,
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
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
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

export const updatePhotographerText = (photolad) => (dispatch, getState) => {
  const id = photolad._id;

  axios
    .post(
      `http://localhost:5000/photographers/updatetext/${id}`,
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
