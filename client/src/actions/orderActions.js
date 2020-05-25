import {
  GET_ORDERS,
  ORDERS_LOADING,
  ADD_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  GET_SINGLE_ORDER,
} from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";
import axios from "axios";

export const getOrders = () => (dispatch, getState) => {
  dispatch(setOrdersLoading());
  axios
    .get(
      "https://smartlensapplication.herokuapp.com/orders",
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getSingleOrder = (id) => (dispatch, getState) => {
  dispatch(setOrdersLoading());
  axios
    .get(
      `https://smartlensapplication.herokuapp.com/orders/${id}`,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: GET_SINGLE_ORDER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addOrder = (order) => (dispatch) => {
  axios
    .post("https://smartlensapplication.herokuapp.com/orders/add", order)
    .then((res) =>
      dispatch({
        type: ADD_ORDER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteOrder = (id) => (dispatch, getState) => {
  axios
    .delete(
      `https://smartlensapplication.herokuapp.com/orders/${id}`,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: DELETE_ORDER,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateOrder = (order) => (dispatch, getState) => {
  const id = order._id;
  axios
    .post(
      `https://smartlensapplication.herokuapp.com/orders/update/${id}`,
      order,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: UPDATE_ORDER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setOrdersLoading = () => {
  return {
    type: ORDERS_LOADING,
  };
};
