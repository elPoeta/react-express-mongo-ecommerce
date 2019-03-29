import React, { Component } from 'react'
import { connect } from 'react-redux';

class Home extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated &&
            this.props.auth.user.isAdmin &&
            this.props.auth.user.role === 'admin') {
            this.props.history.push("/dashboard");
        }
    }
    render() {
        return (
            <div>
                Home Page
      </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(Home);

