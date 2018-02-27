import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "../fetch";
import prodAddress from '../../prodAddress'

const requestCreateOrder = createAction();
const successCreateOrder = createAction();
const failureCreateOrder = createAction();


export function createOrder(userInfo) {
  return dispatch => {
    dispatch(requestCreateOrder());
    axios({
      method: "post",
      url: `${prodAddress}/api/createOrder`,
      data: { ...userInfo }
    })
      .then(response => {
        dispatch(successCreateOrder(response.data));
      })
      .catch(error => {
        dispatch(failureCreateOrder(error.message));
      });
  };
}

const entity = createReducer({}, "").on(
  successCreateOrder,
  (state, product) =>  product 
);

const error = createReducer({}, "")
  .on(failureCreateOrder, errorMessage => errorMessage)

export const order = combineReducers({
  isFetcingCreateOrder: makeIsFetching(
    requestCreateOrder,
    successCreateOrder,
    failureCreateOrder
  ),
  entity,
  error,
});
