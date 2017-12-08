import axios from "axios";
import { createAction } from 'redux-act';

const request = createAction();
const success = createAction();
const failure = createAction();

export function getProduct(id) {
  return dispatch => {
    dispatch(request())
    axios({
      method: "get",
      url: `http://192.168.0.107/api/getProduct/${id}`
    })
      .then((response)=>{
        dispatch(success(response))
      })
      .catch((error)=>{
        dispatch(failure(error.message))
      })
  }
}

export function addProduct(product) {
  return dispatch => {
    dispatch(request());
    axios({
      method: "post",
      url: "http://192.168.0.107/api/addCart",
      data: { ...product }
    })
      .then(() => {
        dispatch(success());
      })
      .catch(error => {
        dispatch(failure(error.message));
      });
  };
}

export function removeProduct(product) {
  return dispatch => {
    dispatch(request());
    axios({
      method: "post",
      url: "http://192.168.0.107/api/removeCart",
      data: { ...product }
    })
      .then(() => {
        dispatch(success());
      })
      .catch(error => {
        dispatch(failure(error.message));
      });
  };
}
