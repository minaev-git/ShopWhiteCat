import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "../fetch";

const requestAddToCart = createAction();
const successAddToCart = createAction();
const failureAddToCart = createAction();

export function addToCart(product) {
  return dispatch => {
    dispatch(requestAddToCart());
    axios({
      method: "get",
      url: `http://192.168.0.107/api/api/addCart`,
      data: { ...product }
    })
      .then(response => {
        dispatch(successAddToCart(response.data));
      })
      .catch(error => {
        dispatch(failureAddToCart(error.message));
      });
  };
}

const error = createReducer({}, "")
  .on(failureAddToCart, errorMessage => errorMessage)

export const add = combineReducers({
  isFetcingAddToCart: makeIsFetching(
    requestAddToCart,
    successAddToCart,
    failureAddToCart
  ),
  error
});