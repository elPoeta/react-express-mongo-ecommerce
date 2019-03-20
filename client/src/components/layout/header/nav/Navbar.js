import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../../actions/authAction';
import { getCart } from '../../../../actions/cartAction';
import './Navbar.css';

class Navbar extends Component {
    handleOnclick = () => {
        this.props.logout();
    }
    handleCartOnclick = async () => {
        await this.props.getCart();
        console.log('Cart ', this.props.cart.cart.totalQuantity);
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const { cart } = this.props.cart
        const guestLinks = (
            <ul>
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        );
        const authLinks = (
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>

                <li>
                    <Link to="" onClick={this.handleOnclick}>
                        Logout{" "}
                    </Link>
                </li>
            </ul>
        );
        return (
            <div>
                <nav className='nav-bar nav-two'>
                    {!isAuthenticated ? guestLinks : authLinks}
                    <ul>
                        <li>
                            <Link to="" onClick={this.handleCartOnclick}>
                                <i className="fas fa-shopping-cart" />{" "}{cart.totalQuantity ? cart.totalQuantity : 0}
                            </Link>
                        </li>
                    </ul>

                </nav>
            </div>

        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    cart: state.cart
})
export default connect(mapStateToProps, { logout, getCart })(Navbar);