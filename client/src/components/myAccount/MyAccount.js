
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCustomer } from '../../actions/customerAction';
import CustomerMenu from '../customer/CustomerMenu';
import Spinner from '../common/spinner/Spinner';
import UserRoute from '../../HOC/UserRoute';
import CustomerAddress from '../customer/CustomerAddress';

class MyAccount extends Component {
    async componentDidMount() {
        await this.props.getCustomer();
    }
    render() {
        const { loading, customer } = this.props.customer;
        const { user } = this.props.auth;
        let myaccountContent;

        if (customer === null || loading) {
            myaccountContent = <Spinner classNames='spinner2' />;
        } else {
            if (Object.keys(customer).length) {
                myaccountContent = (
                    <div>
                        <h3>
                            Welcome{" "}
                            <Link to={`/customer/${customer._id}`}>
                                <span className="dashboard-username">{customer.name}</span>
                            </Link>
                        </h3>
                        <CustomerMenu />
                        <CustomerAddress address={customer.address} />
                    </div>
                );
            } else {
                myaccountContent = (
                    <div>
                        <h3>
                            Welcome <span className="dashboard-username">Customer</span>
                        </h3>
                        <p>You have not yet setup a profile, please add some info ;)</p>
                        <div>
                            <Link to="/createcustomer" className="btn-create-customer">
                                Create Customer
                  </Link>
                        </div>
                    </div>
                );
            }
        }
        return (
            <div className="dashboard-container">
                <h2>My Account</h2>
                {myaccountContent}

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
)(UserRoute(MyAccount));