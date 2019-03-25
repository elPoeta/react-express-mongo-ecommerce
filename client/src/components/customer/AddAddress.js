import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCustomerAddress } from '../../actions/customerAction';
import UserRoute from '../../HOC/UserRoute';
import TextField from '../common/input/TextField';
import isEmpty from '../../utils/isEmpty';

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
                <form onSubmit={this.onSubmit}>
                    {isAdd && <div className="">Address Add <i className="fas fa-check-circle"></i></div>}
                    {errors.user && <div className="invalid">{errors.user}</div>}
                    <TextField
                        type='text'
                        placeholder='Street'
                        name='street'
                        value={street}
                        onChange={this.onChange}
                        error={errors.street}
                    />
                    <TextField
                        type='text'
                        placeholder='Number'
                        name='number'
                        value={number}
                        onChange={this.onChange}
                        error={errors.number}
                    />
                    <TextField
                        type='text'
                        placeholder='Location'
                        name='location'
                        value={location}
                        onChange={this.onChange}
                        error={errors.location}
                    />
                    <button>Add Address</button>
                </form>
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