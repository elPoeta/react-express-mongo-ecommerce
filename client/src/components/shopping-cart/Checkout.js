import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import UserRoute from "../../HOC/UserRoute";
import { getCustomer } from "../../actions/customerAction";
import isEmpty from "../../utils/isEmpty";
import Spinner from '../common/spinner/Spinner';

class Checkout extends Component {
  state = {
    shipAddress: ''
  }
  async componentDidMount() {
    await this.props.getCustomer();
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
  render() {
    const { customer, loading } = this.props.customer;
    let displayContent = '';
    if (customer === null || loading) {

      return <Spinner classNames='spinner2' />

    } else if (isEmpty(customer)) {

      return <Redirect to="/createcustomer" />;
    }
    else {
      const listAddress = customer.address.length ?
        customer.address.map(address => (

          <li key={address._id}>
            <input
              type="radio"
              name="shipAddress"
              value={address._id}
              checked={this.state.shipAddress === address._id}
              onChange={this.handleChange}
            />
            {address.street} || {address.number} || {address.location}</li>
        )) : null;
      displayContent = (
        <div>
          {listAddress}
          <Link
            to="/products/category/all"
            className=""
          >
            Continue Shopping
            </Link>
          {this.state.shipAddress && <Link to="/payment" className="">
            Pay with Paypal
            </Link>}
        </div>
      )
    }
    return (
      <div>
        <h2>Checkout</h2>
        {displayContent}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  customer: state.customer
});
export default connect(
  mapStateToProps,
  { getCustomer }
)(UserRoute(Checkout));
