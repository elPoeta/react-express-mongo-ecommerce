import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import UserRoute from "../../HOC/UserRoute";
import { getCustomer } from "../../actions/customerAction";
import isEmpty from "../../utils/isEmpty";
import PaypalRenderButton from "./PaypalRenderButton";
import Spinner from '../common/spinner/Spinner';

class Payment extends Component {
    async componentDidMount() {
        await this.props.getCustomer();
    }
    render() {
        const { customer, loading } = this.props.customer;
        let displayContent = '';
        if (customer === null || loading) {
            return <Spinner classNames='spinner2' />
        } else if (isEmpty(customer)) {
            return <Redirect to="/createcustomer" />;
        }
        else if (!isEmpty(customer) && isEmpty(customer.address)) {
            return <Redirect to="/address" />;
        } else {
            displayContent = (
                <div>
                    <Link
                        to="/products/category/all"
                        className=""
                    >
                        Continue Shopping
            </Link>
                    <Link to="/cart" className="">
                        Back to cart
            </Link>
                </div>
            )
        }
        return (
            <div>
                <h2>Pay with Paypal</h2>
                <PaypalRenderButton />
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
)(UserRoute(Payment));
