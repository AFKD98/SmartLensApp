import { GET_ORDERS, ORDERS_LOADING, ADD_ORDER } from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getOrders = () => (dispatch) => {
  dispatch(setOrdersLoading());
  axios
    .get("http://localhost:5000/orders")
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

export const setOrdersLoading = () => {
  return {
    type: ORDERS_LOADING,
  };
};
