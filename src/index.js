import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { selectSubreddit, fetchPosts, fetchPostsIfNeeded } from "./actions";
import rootReducer from "./reducers";

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() function
    loggerMiddleware // neat middleware that logs actions
  )
);

store.dispatch(selectSubreddit("reactjs"));
store.dispatch(fetchPosts("reactjs")).then(() => console.log(store.getState()));

store
  .dispatch(fetchPostsIfNeeded("reactjs"))
  .then(() => console.log(store.getState()));

ReactDOM.render(<App />, document.getElementById("root"));
