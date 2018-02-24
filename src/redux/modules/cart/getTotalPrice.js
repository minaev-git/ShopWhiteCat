import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "../fetch";
import prodAddress from '../../prodAddress'

const requestGetTotalPrice = createAction();
const successGetTotalPrice = createAction();
const failureGetTotalPrice = createAction();

export function getTotalPrice() {
  return dispatch => {
    dispatch(requestGetTotalPrice());
    axios({
      method: "get",
      responseType: "text",
      url: `${prodAddress}/api/getTotalPrice`
    })
      .then(response => {
        dispatch(successGetTotalPrice(response.data));
      })
      .catch(error => {
        dispatch(failureGetTotalPrice(error.message));
      });
  };
}

const entity = createReducer({}, "").on(
  successGetTotalPrice,
  (state, totalPrice) => totalPrice
);

const error = createReducer({}, "").on(
  failureGetTotalPrice,
  errorMessage => errorMessage
);

export const totalPrice = combineReducers({
  isFetching: makeIsFetching(
    requestGetTotalPrice,
    successGetTotalPrice,
    failureGetTotalPrice
  ),
  entity,
  error
});
