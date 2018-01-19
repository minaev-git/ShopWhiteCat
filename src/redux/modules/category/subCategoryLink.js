import axios from "axios";
import { createAction, createReducer } from "redux-act";
import { combineReducers } from "redux";
import makeIsFetching from "../fetch";
import prodAddress from '../../prodAddress'

const fetchSubCategoryLinkRequest = createAction();
const fetchSubCategoryLinkSuccess = createAction();
const fetchSubCategoryLinkFailure = createAction();

export function getSubCategoryLink(id) {
  return dispatch => {
    dispatch(fetchSubCategoryLinkRequest());
    axios({
      method: "get",
      /* url: `http://192.168.0.107/api/getChildCategory/${id}` */
      url: `${prodAddress}/api/getChildCategoryLink/${id}`
    })
      .then(response => {
        dispatch(fetchSubCategoryLinkSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchSubCategoryLinkFailure(error.message));
      });
  };
}

const entity = createReducer({}, {}).on(
  fetchSubCategoryLinkSuccess,
  (state, categoryLink) => ({...state, ...categoryLink })
);

const error = createReducer({}, "").on(
  fetchSubCategoryLinkFailure,
  (errorMessage) => (errorMessage)
);

export const subCategoryLink = combineReducers({
  isFetching: makeIsFetching(
    fetchSubCategoryLinkRequest,
    fetchSubCategoryLinkSuccess,
    fetchSubCategoryLinkFailure
  ),
  entity,
  error
});
