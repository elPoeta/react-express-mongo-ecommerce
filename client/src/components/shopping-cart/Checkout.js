import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import UserRoute from "../../HOC/UserRoute";
import { getCustomer } from "../../actions/customerAction";
import isEmpty from "../../utils/isEmpty";
import { checkCartItemsStorage } from "../../utils/checkCartItemsStorage";
import Spinner from '../common/spinner/Spinner';
import Ticket from './Ticket';
import './Checkout.css';

class Checkout extends Component {
  state = {
    shipAddress: '',
    items: ''
  }
  async componentDidMount() {
    await this.props.getCustomer();
    this.setState({
      items: checkCartItemsStorage()
    })
    console.log(this.state.items.cart);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.customer.customer === null && this.props.customer.loading) {
      this.props.history.push('/createcustomer');
    }
    if (nextProps.customer.customer !== this.props.customer.customer) {
      this.props.history.push('/checkout');
      this.setState({
        shipAddress: sessionStorage.getItem("shipAddress") || ''
      })
    }

  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    sessionStorage.setItem('shipAddress', e.target.value);
  }
  findAddress = id => {
    const { customer } = this.props.customer;
    if (customer.address) {
      return customer.address.filter(address => address._id === id);
    }
    return []
  };

  render() {
    const { customer, loading } = this.props.customer;
    const { items } = this.state;
    let displayContent = '';
    if (customer === null || loading) {

      return <Spinner classNames='spinner2' />

    } else if (isEmpty(customer)) {

      return <Redirect to="/createcustomer" />;
    }
    else {
      const listAddress = customer.address.length ?
        customer.address.map(address => (

          <li key={address._id} className='grid-checkout-address'>
            <input
              type="radio"
              name="shipAddress"
              value={address._id}
              checked={this.state.shipAddress === address._id}
              onChange={this.handleChange}
            />
            <span>{address.street}</span>
            <span>{address.number}</span>
            <span>{address.location}</span>
          </li>
        )) : null;
      displayContent = (
        <div>
          <div className='checkout-container'>
            <ul>
              <li className='grid-checkout-address title-credentials'>
                <span><i className="far fa-check-circle"></i></span>
                <span>Street</span>
                <span>Number</span>
                <span>Location</span>

              </li>
              <div><hr /></div>
              {listAddress}
            </ul>
            <Ticket
              shipAddress={this.findAddress(this.state.shipAddress)}
              totalPaid={items.totalAmount}
              totalItems={items.totalQuantity}
              cart={items.cart}
            />
          </div>
          <div className="btn-checkout-container">
            <div className='btn-checkout-container-links'>
              <Link
                to="/products/category/all"
                className="btn-checkout btn-checkout-color-grey"
              >
                Continue Shopping
            </Link>
              <Link
                to="/addaddress"
                className="btn-checkout btn-checkout-color-grey"
              >
                New Address
            </Link>
              {this.state.shipAddress && <Link to="/payment" className="btn-checkout btn-checkout-color-pay"><i className="fab fa-cc-paypal" />Go to Pay
          </Link>}
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className='forms'>
        <h2>Checkout</h2>
        {displayContent}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  customer: state.customer,
  items: state.items
});
export default connect(
  mapStateToProps,
  { getCustomer }
)(UserRoute(Checkout));
