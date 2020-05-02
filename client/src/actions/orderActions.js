import { GET_ORDERS, ORDERS_LOADING, ADD_ORDER, DELETE_ORDER } from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";
import axios from "axios";

export const getOrders = () => (dispatch, getState) => {
  dispatch(setOrdersLoading());
  axios
    .get("http://localhost:5000/orders", tokenConfig(getState))
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

export const addOrder = (order) => (dispatch) => {
  axios
    .post("http://localhost:5000/orders/add", order)
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
    .delete(`http://localhost:5000/orders/${id}`, tokenConfig(getState))
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

export const setOrdersLoading = () => {
  return {
    type: ORDERS_LOADING,
  };
};
