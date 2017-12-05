import axios from "axios";
import {
  REQUEST_GET_PRODUCT,
  SUCCESS_GET_PRODUCT,
  FAILURE_GET_PRODUCT,
  REQUEST_ADD_PRODUCT,
  SUCCESS_ADD_PRODUCT,
  FAILURE_ADD_PRODUCT,
  REQUEST_REMOVE_PRODUCT,
  SUCCESS_REMOVE_PRODUCT,
  FAILURE_REMOVE_PRODUCT
} from "../constants/products";

export function getProduct(id) {
  return dispatch => {
    dispatch({
      type: REQUEST_GET_PRODUCT,
      loading: true
    })
    axios({
      method: "get",
      url: `http://laravel.app/api/getProduct/${id}`
    })
      .then((response)=>{
        dispatch({
          type: SUCCESS_GET_PRODUCT,
          payload: response.data,
          loading: false
        })
      })
      .catch((error)=>{
        dispatch({
          type: FAILURE_GET_PRODUCT,
          payload: error.message,
          loading: false
        })
      })
  }
}

export function addProduct(product) {
  return dispatch => {
    dispatch({
      type: REQUEST_ADD_PRODUCT,
      loading: true
    });
    axios({
      method: "post",
      url: "http://laravel.app/api/addCart",
      data: { ...product }
    })
      .then(() => {
        dispatch({
          type: SUCCESS_ADD_PRODUCT,
          loading: false
        });
      })
      .catch(error => {
        dispatch({
          type: FAILURE_ADD_PRODUCT,
          error: error.message,
          loading: false
        });
      });
  };
}

export function removeProduct(product) {
  return dispatch => {
    dispatch({
      type: REQUEST_REMOVE_PRODUCT,
      loading: true
    });
    axios({
      method: "post",
      url: "http://laravel.app/api/removeCart",
      data: { ...product }
    })
      .then(() => {
        dispatch({
          type: SUCCESS_REMOVE_PRODUCT,
          loading: false
        });
      })
      .catch(error => {
        dispatch({
          type: FAILURE_REMOVE_PRODUCT,
          error: error.message,
          loading: false
        });
      });
  };
}
