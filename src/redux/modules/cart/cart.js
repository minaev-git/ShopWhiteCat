import { combineReducers } from "redux";
import { add } from "./addToCart"
import { remove } from "./removeToCart"
import { minus } from "./minusProductToCart"
import { cartProducts } from "./getCartProducts"
import { count } from "./getCount"

export default combineReducers({
  add,
  remove,
  minus,
  cartProducts,
  count
})