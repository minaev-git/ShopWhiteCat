import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import fetch from './fetch'

export default combineReducers({
  router: routerReducer,
  fetch
});
