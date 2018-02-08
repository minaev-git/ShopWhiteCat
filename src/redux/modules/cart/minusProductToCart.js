import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "../fetch";
import prodAddress from '../../prodAddress'

const requestMinusProductToCart = createAction();
const successMinusProductToCart = createAction();
const failureMinusProductToCart = createAction();

export function minusProductToCart(product) {
  return dispatch => {
    dispatch(requestMinusProductToCart());
    axios({
      method: "post",
      url: `${prodAddress}/api/minusCart`,
      data: { ...product }
    })
      .then(() => {
        dispatch(successMinusProductToCart());
      })
      .catch(error => {
        dispatch(failureMinusProductToCart(error.message));
      });
  };
}

const error = createReducer({}, "")
  .on(failureMinusProductToCart, errorMessage => errorMessage)

export const minus = combineReducers({
  isFetchingMinusProductToCart: makeIsFetching(
    requestMinusProductToCart,
    successMinusProductToCart,
    failureMinusProductToCart,
  ),
  error
});