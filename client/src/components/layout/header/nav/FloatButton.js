import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../../actions/authAction";
import './FloatButton.css';

class FloatButton extends Component {
    state = {
        toogle: false
    }
    onClick = () => {
        this.setState({
            toogle: !this.state.toogle
        });
    }
    handleOnclickLogout = () => {
        if (this.props.auth.isAuthenticated) {
            this.props.logout();
        }
        this.setState({
            toogle: !this.state.toogle
        });
    };

    render() {
        const { toogle } = this.state;
        const { isAuthenticated } = this.props.auth;
        return (
            <div className={!toogle ? "circular-menu" : "circular-menu active"}>
                <a className={!toogle ? "floating-btn" : "floating-btn pulsed"} onClick={this.onClick}>
                    <i className="fa fa-plus"></i>
                </a>

                <menu className="items-wrapper">
                    <Link to={!isAuthenticated ? `/login` : ''}
                        onClick={this.handleOnclickLogout}
                        className={`menu-item 
                    ${!isAuthenticated ? 'fas fa-sign-in-alt' : 'fas fa-sign-out-alt'}`
                        } ></Link>
                    <Link to='/cart' className="menu-item fas fa-shopping-cart" onClick={this.onClick}></Link>
                    <Link to='/my-account' className="menu-item fas fa-user" onClick={this.onClick}></Link>
                    <Link to='/' className="menu-item fas fa-home" onClick={this.onClick}></Link>
                </menu>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logout })(FloatButton);
