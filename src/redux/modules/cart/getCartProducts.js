import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "../fetch";
import prodAddress from '../../prodAddress'

const requestGetCartProducts = createAction();
const successGetCartProducts = createAction();
const failureGetCartProducts = createAction();

export function getCartProducts() {
  return dispatch => {
    dispatch(requestGetCartProducts());
    axios({
      method: "get",
      url: `${prodAddress}/api/getCartProducts`
    })
      .then(response => {
        dispatch(successGetCartProducts(response.data));
      })
      .catch(error => {
        dispatch(failureGetCartProducts(error.message));
      });
  };
}

const entity = createReducer({}, []).on(
  successGetCartProducts,
  (state, cartProducts) => ({ ...state, ...cartProducts })
);

const error = createReducer({}, "").on(
  failureGetCartProducts,
  errorMessage => errorMessage
);

export const cartProducts = combineReducers({
  isFetching: makeIsFetching(
    requestGetCartProducts,
    successGetCartProducts,
    failureGetCartProducts
  ),
  entity,
  error
});
