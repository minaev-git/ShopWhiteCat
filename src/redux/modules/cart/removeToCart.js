import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "../fetch";
import prodAddress from '../../prodAddress'

const requestRemoveToCart = createAction();
const successRemoveToCart = createAction();
const failureRemoveToCart = createAction();

export function removeToCart(product) {
  return dispatch => {
    dispatch(requestRemoveToCart());
    axios({
      method: "post",
      url: `${prodAddress}/api/removeCart`,
      data: { ...product }
    })
      .then(() => {
        dispatch(successRemoveToCart());
      })
      .catch(error => {
        dispatch(failureRemoveToCart(error.message));
      });
  };
}

const error = createReducer({}, "")
  .on(failureRemoveToCart, errorMessage => errorMessage)

export const remove = combineReducers({
  isFetchingRemoveToCart: makeIsFetching(
    requestRemoveToCart,
    successRemoveToCart,
    failureRemoveToCart
  ),
  error
});
