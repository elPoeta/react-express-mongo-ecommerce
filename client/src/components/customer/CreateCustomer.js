import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCustomer, createCustomer } from '../../actions/customerAction';
import UserRoute from '../../HOC/UserRoute';
import CustomerForm from './CustomerForm';

class CreateCustomer extends Component {
    state = {
        name: '',
        phone: '',
        errors: {}
    }
    componentDidUpdate(prevProps) {
        if (prevProps.errors !== this.props.errors) {
            this.setState({ errors: this.props.errors });
        }
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = async e => {
        e.preventDefault();
        const customerData = {
            name: this.state.name,
            phone: this.state.phone
        }
        await this.props.createCustomer(customerData, this.props.history);
    }
    render() {
        const { name, phone, errors } = this.state;
        return (
            <div>
                <h2>Create Customer</h2>
                <CustomerForm
                    name={name}
                    phone={phone}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    errors={errors}
                />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    customer: state.customer,
    errors: state.errors.error
})
export default connect(mapStateToProps, { getCustomer, createCustomer })(UserRoute(withRouter(CreateCustomer)));