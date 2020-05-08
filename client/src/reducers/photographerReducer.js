import {
  GET_PHOTOGRAPHERS,
  PHOTOGRAPHERS_LOADING,
  ADD_PHOTOGRAPHER,
} from "../actions/types";

const initialState = {
  photographersList: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PHOTOGRAPHERS:
      return {
        ...state,
        photographersList: action.payload,
        loading: false,
      };

    case PHOTOGRAPHERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_PHOTOGRAPHER:
      return {
        ...state,
        photographersList: [action.payload, ...state.photographersList],
      };
    default:
      return state;
  }
}
