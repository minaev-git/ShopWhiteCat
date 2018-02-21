import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "../fetch";
import prodAddress from '../../prodAddress'

const requestGetCount = createAction();
const successGetCount = createAction();
const failureGetCount = createAction();

export function getCount() {
  return dispatch => {
    dispatch(requestGetCount());
    axios({
      method: "get",
      url: `${prodAddress}/api/getCount`
    })
      .then(response => {
        dispatch(successGetCount(response.data));
      })
      .catch(error => {
        dispatch(failureGetCount(error.message));
      });
  };
}

const entity = createReducer({}, 0).on(
  successGetCount,
  (state, count) => ({ ...state, ...count })
);

const error = createReducer({}, "").on(
  failureGetCount,
  errorMessage => errorMessage
);

export const count = combineReducers({
  isFetching: makeIsFetching(
    requestGetCount,
    successGetCount,
    failureGetCount
  ),
  entity,
  error
});
