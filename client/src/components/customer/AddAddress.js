import React, { Component } from 'react'
import { connect } from 'react-redux';
import UserRoute from '../../HOC/UserRoute';
import TextField from '../common/input/TextField';

class AddAddress extends Component {
    state = {
        street: '',
        number: '',
        location: '',
        errors: {}
    }
    componentDidUpdate(prevProps) {
        if (this.props.errors !== prevProps.errors) {
            this.setState({
                errors: this.props.errors
            });
        }
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = e => {
        e.preventDefault();
        const addressData = {
            street: this.state.street,
            number: this.state.number,
            location: this.state.location
        }
        console.log(addressData);
    }
    render() {
        const { street, number, location, errors } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
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
            </div>
        )
    }
}
const mapStateToPops = state => ({
    customer: state.customer,
    errors: state.errors.error
})
export default connect(mapStateToPops)(UserRoute(AddAddress));