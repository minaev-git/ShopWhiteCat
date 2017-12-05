import axios from "axios";
import {
  REQUEST_SALE_PRODUCTS,
  FAILURE_SALE_PRODUCTS,
  SUCCESS_SALE_PRODUCTS
} from "../constants/saleProducts";

export function getSaleProducts() {
  return dispatch => {
    dispatch({
      type: REQUEST_SALE_PRODUCTS
    });
    axios({
      method: "get",
      /* url: '/api/getSection/sale' */
      url: "http://laravel.app/api/getSection/sale"
    })
      .then(response => {
        dispatch({
          type: SUCCESS_SALE_PRODUCTS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: FAILURE_SALE_PRODUCTS,
          payload: error.message
        });
      });
  };
}
export const a = 2;
