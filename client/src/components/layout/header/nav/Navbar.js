import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { logout } from '../../../../actions/authAction';
import { getCart } from '../../../../actions/cartAction';
import './Navbar.css';

class Navbar extends Component {
    state = {
        totalQuantity: 0
    }
    componentDidMount() {
        console.log(jwtDecode(localStorage.getItem("cartItems")).exp);
        if (localStorage.cartItems) {
            if (jwtDecode(localStorage.getItem("cartItems")).exp < Date.now()) {
                console.log("clear carttoken");
                localStorage.removeItem('cartIitems');
            } else {
                const { items } = jwtDecode(JSON.parse(localStorage.getItem("cartItems")).token)
                this.setState({
                    totalQuantity: items.totalQuantity
                });
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.items !== prevProps.items) {
            this.setState({
                totalQuantity: this.props.items.items.totalQuantity
            })
        }

    }
    handleOnclick = () => {
        this.props.logout();
    }
    handleCartOnclick = async () => {
        await this.props.getCart();
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        //const { items } = this.props.items
        const { totalQuantity } = this.state;
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
                                <i className="fas fa-shopping-cart" />{" "}{totalQuantity}
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
