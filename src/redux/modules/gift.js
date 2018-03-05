import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "./fetch";
import prodAddress from '../prodAddress'

const fetchGiftProductsRequest = createAction();
const fetchGiftProductsSuccess = createAction();
const fetchGiftProductsFailure = createAction();

export function getGiftProducts() {
  return dispatch => {
    dispatch(fetchGiftProductsRequest());
    axios({
      method: "get",
      url: `${prodAddress}/api/getSection/gift`
    })
      .then(response => {
        dispatch(fetchGiftProductsSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchGiftProductsFailure(error.message));
      });
  };
}

const entity = createReducer({}, {}).on(
  fetchGiftProductsSuccess,
  (state, saleProducts) => ({ ...state, ...saleProducts })
);

const error = createReducer({}, "").on(
  fetchGiftProductsFailure,
  (errorMessage) => (errorMessage)
);

export const gift = combineReducers({
  isFetching: makeIsFetching(
    fetchGiftProductsRequest,
    fetchGiftProductsSuccess,
    fetchGiftProductsFailure
  ),
  entity,
  error
});
