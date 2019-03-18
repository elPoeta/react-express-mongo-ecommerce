import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
    handleOnclick = () => {
        console.log('logout');
    }

    render() {
        //const { isAuthenticated, user } = this.props.auth;
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
            <nav className='nav-bar'>
                {guestLinks}
            </nav>
        )
    }
}

export default Navbar;