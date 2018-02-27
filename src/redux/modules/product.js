import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "./fetch";
import prodAddress from '../prodAddress'

const requestGetProduct = createAction();
const successGetProduct = createAction();
const failureGetProduct = createAction();

const requestAddProduct = createAction();
const successAddProduct = createAction();
const failureAddProduct = createAction();


export function getProduct(id) {
  return dispatch => {
    dispatch(requestGetProduct());
    axios({
      method: "get",
      url: `${prodAddress}/api/getProduct/${id}`
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
    return axios({
      method: "post",
      url: `${prodAddress}/api/addCart`,
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


const entity = createReducer({}, []).on(
  successGetProduct,
  (state, product) => ({ ...state, product })
);

const error = createReducer({}, "")
  .on(failureGetProduct, errorMessage => errorMessage)
  .on(failureAddProduct, errorMessage => errorMessage)

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
    failureAddProduct
  )
});
