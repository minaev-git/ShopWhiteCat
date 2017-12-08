import axios from "axios";
import { createAction } from 'redux-act';

const request = createAction();
const success = createAction();
const failure = createAction();

export function getCategories() {
  return dispatch => {
    dispatch(request());
    axios({
      method: "get",
      /* url: 'http://laravel.app/api/getCategories' */
      url: "http://192.168.0.107/api/getCategories"
    })
      .then(response => {
        dispatch(success(response));
      })
      .catch(error => {
        dispatch(failure(error.message));
      });
  };
}

export function getCategory(id, sort = null) {
  return dispatch => {
    dispatch(request());
    axios({
      method: "get",
      /* url: `http://laravel.app/api/getCategory/${id}` */
      url: `http://192.168.0.107/api/getCategory/${id}`,
      params: {
        order: sort
      }
    })
      .then(response => {
        dispatch(success(response));
      })
      .catch(error => {
        dispatch(failure(error.message));
      });
  };
}

export function getSubCategory(id, sort = null) {
  return dispatch => {
    dispatch(request());
    axios({
      method: "get",
      /* url: `http://laravel.app/api/getChildCategory/${id}` */
      url: `http://192.168.0.107/api/getChildCategory/${id}`,
      params: {
        order: sort
      }
    })
      .then(response => {
        dispatch(success(response));
      })
      .catch(error => {
        dispatch(failure(error.message));
      });
  };
}

export function getCategoryLink(id) {
  return dispatch => {
    dispatch(request());
    axios({
      method: "get",
      /* url: `http://laravel.app/api/getChildCategory/${id}` */
      url: `http://192.168.0.107/api/getCategoryLink/${id}`
    })
      .then(response => {
        dispatch(success(response));
      })
      .catch(error => {
        dispatch(failure(error.message));
      });
  };
}

export function getChildCategoryLink(id) {
  return dispatch => {
    dispatch(request());
    axios({
      method: "get",
      /* url: `http://laravel.app/api/getChildCategory/${id}` */
      url: `http://192.168.0.107/api/getChildCategoryLink/${id}`
    })
      .then(response => {
        dispatch(success(response));
      })
      .catch(error => {
        dispatch(failure(error.message));
      });
  };
}
