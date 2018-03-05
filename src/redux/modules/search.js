import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "./fetch";
import prodAddress from '../prodAddress'

const fetchGetSearchRequest = createAction();
const fetchGetSearchSuccess = createAction();
const fetchGetSearchValueSuccess = createAction();
const fetchGetSearchFailure = createAction();
const fetchGetSearchStatus = createAction();

export function getSearch(value) {
  return dispatch => {
    dispatch(fetchGetSearchRequest());
    return axios({
      method: "get",
      url: `${prodAddress}/api/getSearch/${value}`
    })
      .then(response => {
        dispatch(fetchGetSearchStatus(response.status));
        dispatch(fetchGetSearchValueSuccess(value));
        dispatch(fetchGetSearchSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchGetSearchStatus(error.response.status));
        dispatch(fetchGetSearchFailure(error.response.data));
      });
  };
}

const entity = createReducer({}, []).on(
  fetchGetSearchSuccess,
  (state, searchProducts) => searchProducts
);

const error = createReducer({}, "").on(
  fetchGetSearchFailure,
  (state, errorMessage) => errorMessage
);

const title = createReducer({}, "").on(
  fetchGetSearchValueSuccess,
  (state, value) => value
)

const status = createReducer({}, "").on(
  fetchGetSearchStatus,
  (state, codeResponse) => codeResponse
)

export const searchProducts = combineReducers({
  isFetching: makeIsFetching(
    fetchGetSearchRequest,
    fetchGetSearchSuccess,
    fetchGetSearchFailure
  ),
  entity,
  title,
  error,
  status
});
