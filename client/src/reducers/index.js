import { combineReducers } from "redux";
import orderReducer from "./orderReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  orders: orderReducer,
  auth: authReducer,
  error: errorReducer,
});
