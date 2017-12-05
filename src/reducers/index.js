import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import categories from './categories';
import saleProducts from './saleProducts';
import products from './products';

export default combineReducers({
  router: routerReducer,
  categories,
  saleProducts,
  products
});
