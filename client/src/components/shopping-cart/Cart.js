import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CartItems from "./CartItems";
import {
  getCart,
  addItemCart,
  updateAndRemoveItemCart,
  clearCart,
  removeProductCart
} from "../../actions/cartAction";
import Spinner from "../common/spinner/Spinner";
import isEmpty from "../../utils/isEmpty";

import "./Cart.css";

class Cart extends Component {
  async componentDidMount() {
    await this.props.getCart();
  }
  handleAddOnClick = async (id, stock, quantity) => {
    if (stock > quantity) await this.props.addItemCart(id);
  };
  handleRemoveItemOnClick = async id => {
    await this.props.updateAndRemoveItemCart(id);
  };
  handleRemoveProductOnClick = async id => {
    await this.props.removeProductCart(id);
  };
  handleClearOnClick = () => {
    this.props.clearCart();
  };

  render() {
    const { items, loading } = this.props.items;
    let displayCart = "";
    if (loading) {
      return <Spinner classNames="spinner1" />;
    } else if (!isEmpty(items) && items.cart.length) {
      displayCart = (
        <div>
          {items.cart.map(cart => (
            <CartItems
              key={cart.product._id}
              product={cart.product}
              quantity={cart.quantity}
              handleAddOnClick={() =>
                this.handleAddOnClick(
                  cart.product._id,
                  cart.product.stock,
                  cart.quantity
                )
              }
              handleRemoveItemOnClick={() =>
                this.handleRemoveItemOnClick(cart.product._id)
              }
              handleRemoveProductOnClick={() =>
                this.handleRemoveProductOnClick(cart.product._id)
              }
            />
          ))}
          <div>
            <hr />
          </div>
          <h4 className="cart-total">Items: {items.totalQuantity}</h4>
          <h3 className="cart-total">Total: $ {items.totalAmount}</h3>
          <div className="cart-checkout-btn">
            <Link
              to="/products/category/all"
              className="cart-continue-shopping cart-btn-link"
            >
              Continue Shopping
            </Link>
            <Link to="/checkout" className="cart-checkout cart-btn-link">
              Checkout
            </Link>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/products/category/all" />;
    }
    return (
      <div className="cart-container">
        <div className="cart-container-title">
          <h2>Items in Your Bag</h2>
          <a href="#" className="cart-clear">
            <i className="fas fa-trash" onClick={this.handleClearOnClick}>
              {" "}
              Clear Cart
            </i>
          </a>
        </div>
        <div>
          <hr />
        </div>
        {displayCart}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  products: state.products,
  items: state.items
});
export default connect(
  mapStateToProps,
  {
    getCart,
    addItemCart,
    updateAndRemoveItemCart,
    removeProductCart,
    clearCart
  }
)(Cart);
