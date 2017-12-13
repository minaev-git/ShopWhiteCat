import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "../fetch";

const fetchCategoryRequest = createAction();
const fetchCategorySuccess = createAction();
const fetchCategoryFailure = createAction();

export function getCategory(id, sort = null) {
  return dispatch => {
    dispatch(fetchCategoryRequest());
    axios({
      method: "get",
      /* url: `http://laravel.app/api/getCategory/${id}` */
      url: `http://192.168.0.107/api/getCategory/${id}`,
      params: {
        order: sort
      }
    })
      .then(response => {
        dispatch(fetchCategorySuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchCategoryFailure(error.message));
      });
  };
}

export function getSubCategory(id, sort = null) {
  return dispatch => {
    dispatch(fetchCategoryRequest());
    axios({
      method: "get",
      /* url: `http://laravel.app/api/getChildCategory/${id}` */
      url: `http://192.168.0.107/api/getChildCategory/${id}`,
      params: {
        order: sort
      }
    })
      .then(response => {
        dispatch(fetchCategorySuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchCategoryFailure(error.message));
      });
  };
}

const entity = createReducer({}, []).on(
  fetchCategorySuccess,
  (state, category) => ({ ...state, category })
);

const error = createReducer({}, "").on(
  fetchCategoryFailure,
  (errorMessage) => (errorMessage)
);

export const category = combineReducers({
  isFetching: makeIsFetching(
    fetchCategoryRequest,
    fetchCategorySuccess,
    fetchCategoryFailure
  ),
  entity,
  error
});
