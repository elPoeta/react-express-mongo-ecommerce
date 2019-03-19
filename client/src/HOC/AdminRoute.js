import React, { Component } from 'react';
import { connect } from 'react-redux';

export default AdminRoute => {
    class ComposedComponent extends Component {

        componentDidMount() {
            this.navigatePermission();
        }

        componentDidUpdate() {
            this.navigatePermission();
        }

        navigatePermission() {
            if (!this.props.isAuthenticated &&
                !this.props.isAdmin &&
                this.role !== 'admin') {
                this.props.history.push('/');
            }
        }

        render() {
            return <AdminRoute {...this.props} />;
        }
    }

    const mapStateToProps = state => ({
        isAuthenticated: state.auth.isAuthenticated,
        role: state.auth.user.role,
        isAdmin: state.auth.user.isAdmin
    })

    return connect(mapStateToProps)(ComposedComponent);
};