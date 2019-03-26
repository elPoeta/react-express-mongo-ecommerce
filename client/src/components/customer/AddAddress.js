import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCustomerAddress } from '../../actions/customerAction';
import UserRoute from '../../HOC/UserRoute';
import AddressForm from './AddressForm';


class AddAddress extends Component {
    state = {
        street: '',
        number: '',
        location: '',
        errors: {},
        isAdd: false
    }
    componentDidUpdate(prevProps) {
        if (this.props.customer.customer !== prevProps.customer.customer) {
            this.setState({
                street: '',
                number: '',
                location: '',
                errors: {},
                isAdd: true
            })
        }
        if (this.props.errors !== prevProps.errors) {
            this.setState({
                errors: this.props.errors
            });
        }
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            isAdd: false
        });
    }
    onSubmit = async e => {
        e.preventDefault();
        const addressData = {
            street: this.state.street,
            number: this.state.number,
            location: this.state.location
        }
        await this.props.addCustomerAddress(addressData);

    }

    render() {
        const { street, number, location, errors, isAdd } = this.state;
        return (
            <div>
                <h2>Add Address</h2>
                <AddressForm
                    street={street}
                    number={number}
                    location={location}
                    isAdd={isAdd}
                    errors={errors}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                />
                <Link to='my-account'>Back</Link>
            </div>
        )
    }
}
const mapStateToPops = state => ({
    customer: state.customer,
    errors: state.errors.error
})
export default connect(mapStateToPops, { addCustomerAddress })(UserRoute(AddAddress));