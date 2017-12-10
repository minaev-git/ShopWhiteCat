import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { categories } from "./category/categories";
import { category } from "./category/category";
import { categoryLink } from "./category/categoryLink";
import { product } from "./product"
import { saleProducts } from "./saleProducts"

export default combineReducers({
  router: routerReducer,
  categories,
  category,
  categoryLink,
  product,
  saleProducts
});
