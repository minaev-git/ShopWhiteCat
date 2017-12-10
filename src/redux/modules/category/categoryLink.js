import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "../fetch";

const fetchCategoryLinkRequest = createAction();
const fetchCategoryLinkSuccess = createAction(categoryLink => ({
  categoryLink
}));
const fetchCategoryLinkFailure = createAction();

export function getCategoryLink(id) {
  return dispatch => {
    dispatch(fetchCategoryLinkRequest());
    axios({
      method: "get",
      /* url: `http://laravel.app/api/getChildCategory/${id}` */
      url: `http://192.168.0.107/api/getCategoryLink/${id}`
    })
      .then(response => {
        dispatch(fetchCategoryLinkSuccess(response));
      })
      .catch(error => {
        dispatch(fetchCategoryLinkFailure(error.message));
      });
  };
}

export function getSubCategoryLink(id) {
  return dispatch => {
    dispatch(fetchCategoryLinkRequest());
    axios({
      method: "get",
      /* url: `http://laravel.app/api/getChildCategory/${id}` */
      url: `http://192.168.0.107/api/getChildCategoryLink/${id}`
    })
      .then(response => {
        dispatch(fetchCategoryLinkSuccess(response));
      })
      .catch(error => {
        dispatch(fetchCategoryLinkFailure(error.message));
      });
  };
}

const entity = createReducer({}, []).on(
  fetchCategoryLinkSuccess,
  categoryLink => ({ categoryLink })
);

export const categoryLink = combineReducers({
  isFetching: makeIsFetching(
    fetchCategoryLinkRequest,
    fetchCategoryLinkSuccess,
    fetchCategoryLinkFailure
  ),
  entity
});
