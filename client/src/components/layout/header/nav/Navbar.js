import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../../actions/authAction';
import { getCart } from '../../../../actions/cartAction';
import './Navbar.css';

class Navbar extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.items.items !== prevProps.items.items) {
            console.log('did', this.props.items)
        }

    }
    handleOnclick = () => {
        this.props.logout();
    }
    handleCartOnclick = async () => {
        await this.props.getCart();
        console.log('Cart ', this.props.items.items);
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const { items } = this.props.items
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
                                <i className="fas fa-shopping-cart" />{" "}{items.totalQuantity ? items.totalQuantity : 0}
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
    items: state.items
})
export default connect(mapStateToProps, { logout, getCart })(Navbar);