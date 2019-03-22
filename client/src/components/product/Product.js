import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/spinner/Spinner";
import { getProductById } from "../../actions/productAction";
import { addItemCart, updateAndRemoveItemCart } from "../../actions/cartAction";
import './ProductDetail.css';

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
        <div className='product-detail-container'>
          <section className='product-detail'>
            <figure className='product-detail-tumb'>
              {product.discount && product.discount > 0 ? (
                <div className="badge-detail">{product.discount}% off</div>
              ) : null}
              <img src={product.image} alt={product.name} />
            </figure>
            <div className='product-detail-desc'>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
          </section>
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
