import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getCustomer } from '../../actions/customerAction';
import AdminRoute from '../../HOC/AdminRoute';
import './Dashboard.css';
class Dashboard extends Component {
    async componentDidMount() {
        await this.props.getCustomer();
    }
    render() {
        return (
            <div>
                dashboard
      </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    customer: state.customer
})
export default connect(mapStateToProps, { getCustomer })(AdminRoute(Dashboard))