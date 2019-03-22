import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/spinner/Spinner";
import { getProductById } from "../../actions/productAction";
import { addItemCart, updateAndRemoveItemCart } from "../../actions/cartAction";
class Product extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.getProductById(id);
  }
  render() {
    const { product, loading } = this.props.products;
    let displayProduct;
    if (loading) {
      return <Spinner classNames="spinner1" />;
    } else {
      displayProduct = (
        <div>
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
        </div>
      );
    }
    return (
      <div>
        <h2>Product</h2>
        {displayProduct}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  products: state.products,
  items: state.items
});
export default connect(
  mapStateToProps,
  { getProductById, addItemCart, updateAndRemoveItemCart }
)(Product);
