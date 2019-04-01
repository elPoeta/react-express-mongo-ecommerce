import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import UserRoute from "../../HOC/UserRoute";
import { getCustomer } from "../../actions/customerAction";
import isEmpty from "../../utils/isEmpty";
import PaypalRenderButton from "./PaypalRenderButton";
import Spinner from '../common/spinner/Spinner';
import Ticket from './Ticket';
import { checkCartItemsStorage } from "../../utils/checkCartItemsStorage";

class Payment extends Component {
    state = {
        items: {}
    }
    async componentDidMount() {
        await this.props.getCustomer();
        this.setState({
            items: checkCartItemsStorage()
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.customer.customer === null && this.props.customer.loading) {
            this.props.history.push('/createcustomer');
        }
        if (nextProps.customer.customer !== this.props.customer.customer) {
            this.props.history.push('/payment');
        }

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
        if (localStorage.getItem('cartItems') === null) {
            return <Redirect to="/products/category/all" />;
        }
        else if (customer === null || loading) {
            return <Spinner classNames='spinner2' />
        } else if (isEmpty(customer)) {
            return <Redirect to="/createcustomer" />;
        } else if (sessionStorage.getItem('shipAddress') === null) {
            return <Redirect to="/checkout" />;
        }
        else {
            displayContent = (
                <div>
                    <div className="payment-btn">
                        <Link
                            to="/products/category/all"
                            className="btn-checkout-color-grey payment-btn-links"
                        >
                            Continue Shopping
            </Link>
                        <Link to="/cart" className="btn-checkout-color-grey payment-btn-links">
                            Back to cart
            </Link>
                    </div>

                    <Ticket
                        shipAddress={this.findAddress(sessionStorage.getItem('shipAddress'))}
                        totalPaid={items.totalAmount}
                        totalItems={items.totalQuantity}
                        cart={items.cart}
                    />
                </div>
            )
        }
        return (
            <div>
                <div div className='forms'>
                    <h2>Pay with Paypal</h2>
                    {displayContent}
                </div>
                <div className="payment-btn-paypal-container">
                    <PaypalRenderButton />
                </div>

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
