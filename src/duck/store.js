import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/createRootReducer";
import {createHashHistory} from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createHashHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = (initialState = {}) => {

  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    thunk,
    reactRouterMiddleware,
  ];

  return createStore(rootReducer(history), initialState, composeEnhancers(
    applyMiddleware(...middlewares)
    )
  );

};
export default configureStore;


