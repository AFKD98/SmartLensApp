import {
  GET_ORDERS,
  ORDERS_LOADING,
  ADD_ORDER,
  GET_SINGLE_ORDER,
} from "../actions/types";

const initialState = {
  ordersList: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        ordersList: action.payload,
        loading: false,
      };
    case GET_SINGLE_ORDER:
      return {
        ...state,
        ordersList: action.payload,
        loading: false,
      };
    case ORDERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_ORDER:
      return {
        ...state,
        ordersList: [action.payload, ...state.ordersList],
      };
    default:
      return state;
  }
}
