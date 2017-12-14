import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "../fetch";

const fetchCategoriesRequest = createAction();
const fetchCategoriesSuccess = createAction();
const fetchCategoriesFailure = createAction(errorMessage => errorMessage);

export function getCategories() {
  return dispatch => {
    dispatch(fetchCategoriesRequest());
    axios({
      method: "get",
      /* url: 'http://laravel.app/api/getCategories' */
      url: "/api/getCategories"
    })
      .then(categories => {
        dispatch(fetchCategoriesSuccess(categories.data));
      })
      .catch(error => {
        dispatch(fetchCategoriesFailure(error.message));
      });
  };
}

const entity = createReducer({}, {}).on(
  fetchCategoriesSuccess,
  (state, categories) => ({...state, categories})
);

const error = createReducer({}, "").on(
  fetchCategoriesFailure,
  (errorMessage) => (errorMessage)
);

export const categories = combineReducers({
  isFetching: makeIsFetching(
    fetchCategoriesRequest,
    fetchCategoriesSuccess,
    fetchCategoriesFailure
  ),
  entity,
  error
});
