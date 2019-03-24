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
            const { isAuthenticated, user } = this.props.auth;
            if (!isAuthenticated)
                return this.props.history.push('/');
            if (isAuthenticated)
                if (!user.isAdmin && user.role !== 'admin')
                    return this.props.history.push('/');

        }

        render() {
            return <AdminRoute {...this.props} />;
        }
    }

    const mapStateToProps = state => ({
        auth: state.auth
    })

    return connect(mapStateToProps)(ComposedComponent);
};