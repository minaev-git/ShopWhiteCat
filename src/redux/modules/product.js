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
      url: `/api/getProduct/${id}`
    })
      .then(response => {
        dispatch(successGetProduct(response.data));
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
      url: "/api/addCart",
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
      url: "/api/removeCart",
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

const entity = createReducer({}, []).on(
  successGetProduct,
  (state, product) => ({ ...state, product })
);

const error = createReducer({}, "")
  .on(failureGetProduct, errorMessage => errorMessage)
  .on(failureAddProduct, errorMessage => errorMessage)
  .on(failureRemoveProduct, errorMessage => errorMessage);

export const product = combineReducers({
  isFetcingGetProduct: makeIsFetching(
    requestGetProduct,
    successGetProduct,
    failureGetProduct
  ),
  entity,
  error,
  isFetchingAddProduct: makeIsFetching(
    requestAddProduct,
    successAddProduct,
    failureAddProduct,
    error
  ),
  isFetchingRemoveProduct: makeIsFetching(
    requestRemoveProduct,
    successRemoveProduct,
    failureRemoveProduct,
    error
  )
});
