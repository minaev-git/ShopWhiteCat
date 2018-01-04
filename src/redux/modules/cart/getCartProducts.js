import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "../fetch";

const requestGetCartProducts = createAction();
const successGetCartProducts = createAction();
const failureGetCartProducts = createAction();

export function getCartProducts() {
  return dispatch => {
    dispatch(requestGetCartProducts());
    axios({
      method: "get",
      /* url: `http://laravel.app/api/getCartProducts}` */
      url: `http://192.168.0.107/api/getCartProducts`
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
