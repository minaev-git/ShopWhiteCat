import { combineReducers } from "redux";
import { remove } from "./removeToCart"
import { cartProducts } from "./getCartProducts"
import { count } from "./getCount"
import { totalPrice } from "./getTotalPrice"
import { order } from "./createOrder"

export default combineReducers({
  remove,
  cartProducts,
  count,
  totalPrice,
  order
})