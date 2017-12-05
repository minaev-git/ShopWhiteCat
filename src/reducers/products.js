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

const initialState = {
  product: {},
  loadingProduct: false,
  errorProduct: ""
};

export default function(state = initialState, action) {
  switch (action.type) {

    case REQUEST_GET_PRODUCT:
      return { ...state, loadingProduct: action.loading };
    case SUCCESS_GET_PRODUCT:
      return { ...state, product: action.payload, loadingProduct: action.loading };
    case FAILURE_GET_PRODUCT:
      return { ...state, errorProduct: action.payload, loadingProduct: action.loading };

    case REQUEST_ADD_PRODUCT:
      return { ...state, loadingProduct: action.loading };
    case SUCCESS_ADD_PRODUCT:
      return { ...state, loadingProduct: action.loading };
    case FAILURE_ADD_PRODUCT:
      return {
        ...state,
        errorProduct: action.error,
        loadingProduct: action.loading
      };

    case REQUEST_REMOVE_PRODUCT:
      return { ...state, loadingProduct: action.loading };
    case SUCCESS_REMOVE_PRODUCT:
      return { ...state, loadingProduct: action.loading };
    case FAILURE_REMOVE_PRODUCT:
      return {
        ...state,
        errorProduct: action.error,
        loadingProduct: action.loading
      };

    default:
      return state;
  }
}
