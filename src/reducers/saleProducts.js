import {
  SUCCESS_SALE_PRODUCTS,
  FAILURE_SALE_PRODUCTS
} from "../constants/saleProducts";

const inititalState = {
  saleProducts: [],
  error: ""
};

export default function(state = inititalState, action) {
  switch (action.type) {
    case SUCCESS_SALE_PRODUCTS:
      return { ...state, saleProducts: action.payload.products };
    case FAILURE_SALE_PRODUCTS:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
