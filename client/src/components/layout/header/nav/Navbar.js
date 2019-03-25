import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../../actions/authAction";
import { checkCartItemsStorage } from '../../../../utils/checkCartItemsStorage';
import "./Navbar.css";

class Navbar extends Component {
  state = {
    totalQuantity: 0
  };
  componentDidMount() {
    const items = checkCartItemsStorage();
    this.setState({
      totalQuantity: items.totalQuantity || 0
    });
  }



  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.setState({
        totalQuantity: this.props.items.items.totalQuantity || 0
      });
    }
  }
  handleOnclick = () => {
    this.props.logout();
  };

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
          {user.role === 'user' ? <Link to="/my-account">My Account</Link> : null}
          {user.role === 'admin' ? <Link to="/dashboard">Dashboard</Link> : null}
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
        <nav className="nav-bar nav-two">
          {!isAuthenticated ? guestLinks : authLinks}
          <ul>
            <li>
              <Link to="/cart">
                <i className="fas fa-shopping-cart" /> {totalQuantity}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  items: state.items
});
export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
