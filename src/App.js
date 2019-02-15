import React, { Component } from "react";
import Home from "./pages/home/home";
import Manager from "./pages/manager/manager.js";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, NavLink, withRouter } from "react-router-dom";
// import browserHistory  from 'react-router';
import { connect } from "react-redux";
// //   redux 部分
// import { createStore,combineReducers,applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// // import store from "./reducers/index.js";
// import { homeRedurces } from "./reducers/home.js";
// const store = createStore(combineReducers({
//   homeRedurces,
// }),applyMiddleware(thunk))
// 封装至  reducers/index.js
function test() {
  return "ssssss";
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  // componentDidMount() {
  //   console.log(this.props, "aaaa8");
  // }
  tabBarRender = () => {
    // console.log(this.props.location.pathname, "aaaa8");
    let path = "";
    // return
    return (
      <div className="tab-bar">
        <NavLink
          exact
          to="/"
          activeClassName="tab-bar__active"
          isActive={(match, location) => {
            if (location.pathname === "/") {
              return true;
            }
          }}
        >
          首页
        </NavLink>
        <NavLink
          to="/manager"
          activeClassName="tab-bar__active"
          isActive={(match, location) => {
            if (location.pathname === "/manager") {
              return true;
            }
          }}
        >
          数据管理
        </NavLink>
      </div>
    );
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/manager" component={Manager} />
          <Route path="/test" component={test} />
          {this.tabBarRender()}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
