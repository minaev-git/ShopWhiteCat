import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "../fetch";
import prodAddress from '../../prodAddress'

const fetchSubCategoryRequest = createAction();
const fetchSubCategorySuccess = createAction();
const fetchSubCategoryFailure = createAction();

export function getSubCategory(id, sort = null) {
  return dispatch => {
    dispatch(fetchSubCategoryRequest());
    axios({
      method: "get",
      url: `${prodAddress}/api/getChildCategory/${id}`,
      params: {
        order: sort
      }
    })
      .then(response => {
        dispatch(fetchSubCategorySuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchSubCategoryFailure(error.message));
      });
  };
}

const entity = createReducer({}, []).on(
  fetchSubCategorySuccess,
  (state, category) => ({ ...state, ...category })
);

const error = createReducer({}, "").on(
  fetchSubCategoryFailure,
  errorMessage => errorMessage
);

export const subCategory = combineReducers({
  isFetching: makeIsFetching(
    fetchSubCategoryRequest,
    fetchSubCategorySuccess,
    fetchSubCategoryFailure
  ),
  entity,
  error
});
