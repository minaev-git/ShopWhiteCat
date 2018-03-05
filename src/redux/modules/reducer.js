import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { categories } from "./category/categories";
import { category } from "./category/category";
import { subCategory } from "./category/subCategory"
import { categoryLink } from "./category/categoryLink";
import { subCategoryLink } from "./category/subCategoryLink";
import { product } from "./product";
import { saleProducts } from "./saleProducts";
import { gift } from "./gift";
import { searchProducts } from "./search";
import cart from './cart/cart';

export default combineReducers({
  router: routerReducer,
  categories,
  category,
  subCategory,
  categoryLink,
  subCategoryLink,
  product,
  saleProducts,
  gift,
  cart,
  searchProducts
});
