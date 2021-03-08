import thunkMiddleware from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";

import rootReducer from "../reducers";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
