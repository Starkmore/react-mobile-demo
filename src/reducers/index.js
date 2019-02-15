// import {combineReducers} from "redux-immutable"
// import { createStore,compose, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { homeRedurces } from "./home";

// const store = createStore(
//   combineReducers({
//     home: homeRedurces,
//   }), compose(
//     applyMiddleware(thunk),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
//   ));

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { homeRedurces } from "./home.js";
const store = createStore(
  combineReducers({
    homeRedurces
  }),
  applyMiddleware(thunk)
);

export default store;
