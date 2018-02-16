import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "../fetch";
import prodAddress from '../../prodAddress'

const fetchCategoryLinkRequest = createAction();
const fetchCategoryLinkSuccess = createAction();
const fetchCategoryLinkFailure = createAction();

export function getCategoryLink(id) {
  return dispatch => {
    dispatch(fetchCategoryLinkRequest());
    axios({
      method: "get",
      url: `${prodAddress}/api/getCategoryLink/${id}`
    })
      .then(response => {
        dispatch(fetchCategoryLinkSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchCategoryLinkFailure(error.message));
      });
  };
}

const entity = createReducer({}, {}).on(
  fetchCategoryLinkSuccess,
  (state, categoryLink) => ({...state, ...categoryLink })
);

const error = createReducer({}, "").on(
  fetchCategoryLinkFailure,
  (errorMessage) => (errorMessage)
);

export const categoryLink = combineReducers({
  isFetching: makeIsFetching(
    fetchCategoryLinkRequest,
    fetchCategoryLinkSuccess,
    fetchCategoryLinkFailure
  ),
  entity,
  error
});
