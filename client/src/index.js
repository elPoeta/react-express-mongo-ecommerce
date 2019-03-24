import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";

import "./index.css";
import App from "./components/App";
import Home from "./components/layout/pages/home/Home";
import About from "./components/layout/pages/about/About";
import NotFound from "./components/layout/pages/notFound/NotFound";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Products from "./components/product/Products";
import Product from "./components/product/Product";
import Cart from "./components/shopping-cart/Cart";
import Checkout from "./components/shopping-cart/Checkout";
import Customer from "./components/customer/Customer";
import Dashboard from "./components/dashboard/Dashboard";
import MyAccount from "./components/dashboard/MyAccount";

import store from "./store";

import { AUTH_USER } from "./actions/types";
import { logout } from "./actions/authAction";

import * as serviceWorker from "./serviceWorker";


if (localStorage.token) {
  if (jwtDecode(localStorage.getItem("token")).exp < Date.now()) {
    store.dispatch(logout());
    //store.dispatch(clearCustomer());
    window.location.href = "/login";
  }
  store.dispatch({
    type: AUTH_USER,
    payload: jwtDecode(localStorage.getItem("token"))
  });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/my-account" component={MyAccount} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/customer/:id" component={Customer} />
          <Route path="/product/:id" component={Product} />
          <Route path="/products/category/:category" component={Products} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
