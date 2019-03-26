import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import UserRoute from '../../HOC/UserRoute';
import { getCustomer } from '../../actions/customerAction';
import isEmpty from '../../utils/isEmpty';

class Checkout extends Component {
  async componentDidMount() {
    await this.props.getCustomer();
  }
  render() {
    const { customer, loading } = this.props.customer;
    if (loading || isEmpty(customer)) {
      return <Redirect to='/createcustomer' />
    } else if (!isEmpty(customer) && isEmpty(customer.address)) {
      return <Redirect to='/addaddress' />
    }
    return <div>Checkout</div>;
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  customer: state.customer
});
export default connect(mapStateToProps, { getCustomer })(UserRoute(Checkout));