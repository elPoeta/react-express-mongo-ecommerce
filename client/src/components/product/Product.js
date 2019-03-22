import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Spinner from "../common/spinner/Spinner";
import { getProductById } from "../../actions/productAction";
import { addItemCart, updateAndRemoveItemCart } from "../../actions/cartAction";
import { checkCartItemsStorage } from '../../utils/checkCartItemsStorage';
import './ProductDetail.css';

class Product extends Component {
  state = {
    items: {}
  }
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.getProductById(id);
    const items = checkCartItemsStorage();
    this.setState({
      items: items || {}
    });
  }

  handleAddOnClick = async id => {
    await this.props.addItemCart(id);
    const items = checkCartItemsStorage();
    this.setState({
      items: items || {}
    });
  }
  handleRemoveOnClick = async id => {
    await this.props.updateAndRemoveItemCart(id);
    const items = checkCartItemsStorage();
    this.setState({
      items: items || {}
    });
  }
  inCart(id) {
    if (Object.keys(this.state.items).length && this.state.items.cart.length) {
      const found = this.state.items.cart.filter(cart => cart.product._id === id);
      return found.length ? found[0] : [];
    }
    return {}
  }

  render() {
    const { product, loading } = this.props.products;
    const items = this.state.items;
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
              <div>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
              </div>

              <div className="product-detail-price">
                {product.discount && product.discount > 0 ? <small>$ {product.price}</small> : null}{' '}
                ${product.discount && product.discount > 0 ? Number(product.price - product.discount * product.price * 0.01).toFixed(2) : product.price}
              </div>
              <div>

                {Object.keys(items).length && Object.keys(this.inCart(product._id)).length ? <ul className='product-detail-icons'>
                  <li><i className="fas fa-plus-circle fa-2x i-add-color" onClick={() => this.handleAddOnClick(product._id)}></i></li>
                  <li><span className='product-detail-qty'>{this.inCart(product._id).quantity}</span></li>
                  <li><i className="fas fa-minus-circle fa-2x i-minus-color" onClick={() => this.handleRemoveOnClick(product._id)}></i></li>
                </ul> :
                  <ul className='product-detail-icons'>
                    <li> <i className="fas fa-cart-plus fa-2x i-add-color" onClick={() => this.handleAddOnClick(product._id)} /></li>
                  </ul>
                }
                {items.totalQuantity ? <Link to='/cart'>Go to Cart</Link> : null}
              </div>
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
