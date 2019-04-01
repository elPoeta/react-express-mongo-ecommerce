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
import Payment from "./components/shopping-cart/Payment";
import Customer from "./components/customer/Customer";
import Dashboard from "./components/dashboard/Dashboard";
import MyAccount from "./components/myAccount/MyAccount";
import CreateCustomer from "./components/customer/CreateCustomer";
import EditCustomer from "./components/customer/EditCustomer";
import AddAddress from "./components/customer/AddAddress";
import CreateCategory from "./components/category/CreateCategory";
import EditCategory from "./components/category/EditCategory";
import Categories from "./components/category/Categories";
import CreateProduct from "./components/product/CreateProduct";
import EditAndDeleteProducts from "./components/product/EditAndDeleteProducts";
import EditProduct from "./components/product/EditProduct";

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
          <Route path="/createcustomer" component={CreateCustomer} />
          <Route path="/editcustomer" component={EditCustomer} />
          <Route path="/addaddress" component={AddAddress} />
          <Route path="/product/:id" component={Product} />
          <Route path="/products/category/:category" component={Products} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/payment" component={Payment} />
          <Route path="/admin/add-category" component={CreateCategory} />
          <Route
            path="/admin/edit-category/categories"
            component={Categories}
          />
          <Route path="/admin/edit-category/:id" component={EditCategory} />
          <Route path="/admin/add-product" component={CreateProduct} />
          <Route path="/admin/edit-product/products" component={EditAndDeleteProducts} />
          <Route path="/admin/edit-product/:id" component={EditProduct} />
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
