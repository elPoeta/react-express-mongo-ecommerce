import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getCustomer } from '../../actions/customerAction';
import AdminRoute from '../../HOC/AdminRoute';
import DashboardMenu from './DashboardMenu';
import './Dashboard.css';
class Dashboard extends Component {
    async componentDidMount() {
        //  await this.props.getCustomer();
    }
    handleOnClick = x => {
        console.log('X ## ', x);
    }
    render() {
        return (
            <div className='dashboard'>
                <h2>Dashboard</h2>
                <section className='dashboard-container'>
                    <div className='dashboard-menu'>
                        <DashboardMenu />
                    </div>
                    <div className='dashboard-content'>dasboard content</div>
                </section>
            </div>

        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    customer: state.customer
})
export default connect(mapStateToProps, { getCustomer })(AdminRoute(Dashboard))