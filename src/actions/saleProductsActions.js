import axios from "axios";
import { createAction } from 'redux-act';

const request = createAction();
const success = createAction();
const failure = createAction();

export function getSaleProducts() {
  return dispatch => {
    dispatch(request());
    axios({
      method: "get",
      /* url: '/api/getSection/sale' */
      url: "http://192.168.0.107/api/getSection/sale"
    })
      .then(response => {
        dispatch(success(response));
      })
      .catch(error => {
        dispatch(failure(error.message));
      });
  };
}

export const a = 2;
