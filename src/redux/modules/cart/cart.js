import { combineReducers } from "redux";
import { remove } from "./removeToCart"
import { cartProducts } from "./getCartProducts"
import { count } from "./getCount"
import { totalPrice } from "./getTotalPrice"

export default combineReducers({
  remove,
  cartProducts,
  count,
  totalPrice
})