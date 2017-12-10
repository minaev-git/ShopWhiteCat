import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "./fetch";

const requestGetProduct = createAction();
const successGetProduct = createAction();
const failureGetProduct = createAction();

const requestAddProduct = createAction();
const successAddProduct = createAction();
const failureAddProduct = createAction();

const requestRemoveProduct = createAction();
const successRemoveProduct = createAction();
const failureRemoveProduct = createAction();

export function getProduct(id) {
  return dispatch => {
    dispatch(requestGetProduct());
    axios({
      method: "get",
      url: `http://192.168.0.107/api/getProduct/${id}`
    })
      .then(response => {
        dispatch(successGetProduct(response));
      })
      .catch(error => {
        dispatch(failureGetProduct(error.message));
      });
  };
}

export function addProduct(product) {
  return dispatch => {
    dispatch(requestAddProduct());
    axios({
      method: "post",
      url: "http://192.168.0.107/api/addCart",
      data: { ...product }
    })
      .then(() => {
        dispatch(successAddProduct());
      })
      .catch(error => {
        dispatch(failureAddProduct(error.message));
      });
  };
}

export function removeProduct(product) {
  return dispatch => {
    dispatch(requestRemoveProduct());
    axios({
      method: "post",
      url: "http://192.168.0.107/api/removeCart",
      data: { ...product }
    })
      .then(() => {
        dispatch(successRemoveProduct());
      })
      .catch(error => {
        dispatch(failureRemoveProduct(error.message));
      });
  };
}

export const product = combineReducers({
  isFetcingGetProduct: makeIsFetching(
    requestGetProduct,
    successGetProduct,
    failureGetProduct
  ),
  isFetchingAddProduct: makeIsFetching(
    requestAddProduct,
    successAddProduct,
    failureAddProduct
  ),
  isFetchingRemoveProduct: makeIsFetching(
    requestRemoveProduct,
    successRemoveProduct,
    failureRemoveProduct
  )
});
