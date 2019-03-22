import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/spinner/Spinner";
import ProductItem from "./ProductItem";
import {
  getProducts,
  getProductsByCategory
} from "../../actions/productAction";
import { addItemCart } from "../../actions/cartAction";
import { checkCartItemsStorage } from "../../utils/checkCartItemsStorage";
import "./Product.css";
class Products extends Component {
  state = {
    items: {}
  };
  componentDidMount() {
    const category = this.props.match.params.category;
    this.getProduct(category);
    const items = checkCartItemsStorage();
    this.setState({
      items: items || {}
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.getProduct(this.props.match.params.category);
    }
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }
  handleOnClick = async (event, id, stock) => {
    event.preventDefault();
    const inCart = this.inCart(id);
    if (stock > inCart.quantity || inCart.quantity === undefined) {
      await this.props.addItemCart(id);
      const items = checkCartItemsStorage();
      this.setState({
        items: items || {}
      });
    }
  };
  async getProduct(category) {
    if (category === "all") {
      await this.props.getProducts();
    } else {
      await this.props.getProductsByCategory(category);
    }
  }
  inCart(id) {
    if (Object.keys(this.state.items).length && this.state.items.cart.length) {
      const found = this.state.items.cart.filter(
        cart => cart.product._id === id
      );
      return found.length ? found[0] : [];
    }
    return {};
  }
  render() {
    const { products, loading, errors } = this.props.products;
    let productDisplay;
    if (loading) {
      return <Spinner classNames="spinner1" />;
    } else {
      productDisplay = products.map(product => (
        <ProductItem
          key={product._id}
          handleOnClick={e => {
            this.handleOnClick(e, product._id, product.stock);
          }}
          product={product}
        />
      ));
    }
    return (
      <div>
        <h2>products {this.props.match.params.category}</h2>
        <section className="product-container">{productDisplay}</section>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  products: state.products
});
export default connect(
  mapStateToProps,
  { getProducts, getProductsByCategory, addItemCart }
)(Products);
