import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "./fetch";
import prodAddress from '../prodAddress'

const fetchSaleProductsRequest = createAction();
const fetchSaleProductsSuccess = createAction();
const fetchSaleProductsFailure = createAction();

export function getSaleProducts() {
  return dispatch => {
    dispatch(fetchSaleProductsRequest());
    axios({
      method: "get",
      url: "http://192.168.0.107/api/getSection/sale"
    })
      .then(response => {
        dispatch(fetchSaleProductsSuccess(response.data.products));
      })
      .catch(error => {
        dispatch(fetchSaleProductsFailure(error.message));
      });
  };
}

const entity = createReducer({}, {}).on(
  fetchSaleProductsSuccess,
  (state, saleProducts) => ({ ...state, saleProducts })
);

const error = createReducer({}, "").on(
  fetchSaleProductsFailure,
  (errorMessage) => (errorMessage)
);

export const saleProducts = combineReducers({
  isFetching: makeIsFetching(
    fetchSaleProductsRequest,
    fetchSaleProductsSuccess,
    fetchSaleProductsFailure
  ),
  entity,
  error
});
