import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "./fetch";

const fetchSaleProductsRequest = createAction();
const fetchSaleProductsSuccess = createAction(saleProducts => ({
  saleProducts
}));
const fetchSaleProductsFailure = createAction();

export function getSaleProducts() {
  return dispatch => {
    dispatch(fetchSaleProductsRequest());
    axios({
      method: "get",
      /* url: '/api/getSection/sale' */
      url: "http://192.168.0.107/api/getSection/sale"
    })
      .then(response => {
        dispatch(fetchSaleProductsSuccess(response));
      })
      .catch(error => {
        dispatch(fetchSaleProductsFailure(error.message));
      });
  };
}

const entity = createReducer({}, []).on(
  fetchSaleProductsSuccess,
  saleProducts => ({ saleProducts })
);

export const saleProducts = combineReducers({
  isFetching: makeIsFetching(fetchSaleProductsRequest, fetchSaleProductsSuccess, fetchSaleProductsFailure),
  entity
});
