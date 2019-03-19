import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../../actions/authAction';
import './Navbar.css';

class Navbar extends Component {
    handleOnclick = () => {
        this.props.logout();
    }
    handleCartOnclick = () => {
        console.log('Cart');
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
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
                    <Link to="" onClick={this.handleCartOnclick}>
                        <i className="fas fa-shopping-cart" />{" "}
                    </Link>
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
                </nav>
            </div>

        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logout })(Navbar);