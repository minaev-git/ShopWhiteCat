import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './modules/reducer'

const history = createHistory();

export default function configureStore() {
  const store = createStore(reducer,
    composeWithDevTools(
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    ),
  ));
  return store
}