import axios from "axios";
import {
  REQUEST_CATEGORIES,
  SUCCESS_CATEGORIES,
  FAILURE_CATEGORIES,
  REQUEST_CATEGORY,
  FAILURE_CATEGORY,
  SUCCESS_CATEGORY,
  REQUEST_CATEGORY_LINK,
  SUCCESS_CATEGORY_LINK,
  FAILURE_CATEGORY_LINK
} from "../constants/menu";

export function getCategories() {
  return dispatch => {
    dispatch({
      type: REQUEST_CATEGORIES,
      loading: true
    });
    axios({
      method: "get",
      /* url: 'http://laravel.app/api/getCategories' */
      url: "http://laravel.app/api/getCategories"
    })
      .then(response => {
        dispatch({
          type: SUCCESS_CATEGORIES,
          payload: response.data,
          loading: false
        });
      })
      .catch(error => {
        dispatch({
          type: FAILURE_CATEGORIES,
          payload: error.message,
          loading: false
        });
      });
  };
}

export function getCategory(id, sort = null) {
  return dispatch => {
    dispatch({
      type: REQUEST_CATEGORY,
      loading: true
    });
    axios({
      method: "get",
      /* url: `http://laravel.app/api/getCategory/${id}` */
      url: `http://laravel.app/api/getCategory/${id}`,
      params: {
        order: sort
      }
    })
      .then(response => {
        dispatch({
          type: SUCCESS_CATEGORY,
          payload: response.data,
          loading: false
        });
      })
      .catch(error => {
        dispatch({
          type: FAILURE_CATEGORY,
          payload: error.message,
          loading: false
        });
      });
  };
}

export function getSubCategory(id, sort = null) {
  return dispatch => {
    dispatch({
      type: REQUEST_CATEGORY,
      loading: true
    });
    axios({
      method: "get",
      /* url: `http://laravel.app/api/getChildCategory/${id}` */
      url: `http://laravel.app/api/getChildCategory/${id}`,
      params: {
        order: sort
      }
    })
      .then(response => {
        dispatch({
          type: SUCCESS_CATEGORY,
          payload: response.data,
          loading: false
        });
      })
      .catch(error => {
        dispatch({
          type: FAILURE_CATEGORY,
          payload: error.message,
          loading: false
        });
      });
  };
}

export function getCategoryLink(id) {
  return dispatch => {
    dispatch({
      type: REQUEST_CATEGORY_LINK,
      loading: true
    });
    axios({
      method: "get",
      /* url: `http://laravel.app/api/getChildCategory/${id}` */
      url: `http://laravel.app/api/getCategoryLink/${id}`
    })
      .then(response => {
        dispatch({
          type: SUCCESS_CATEGORY_LINK,
          payload: response.data,
          loading: false
        });
      })
      .catch(error => {
        dispatch({
          type: FAILURE_CATEGORY_LINK,
          payload: error.message,
          loading: false
        });
      });
  };
}

export function getChildCategoryLink(id) {
  return dispatch => {
    dispatch({
      type: REQUEST_CATEGORY_LINK,
      loading: true
    });
    axios({
      method: "get",
      /* url: `http://laravel.app/api/getChildCategory/${id}` */
      url: `http://laravel.app/api/getChildCategoryLink/${id}`
    })
      .then(response => {
        dispatch({
          type: SUCCESS_CATEGORY_LINK,
          payload: response.data,
          loading: false
        });
      })
      .catch(error => {
        dispatch({
          type: FAILURE_CATEGORY_LINK,
          payload: error.message,
          loading: false
        });
      });
  };
}
