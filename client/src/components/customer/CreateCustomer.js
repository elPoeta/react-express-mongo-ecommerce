import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCustomer, createCustomer } from '../../actions/customerAction';
import UserRoute from '../../HOC/UserRoute';
import TextField from '../common/input/TextField';

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
                <form onSubmit={this.onSubmit}>
                    <TextField
                        type='text'
                        placeholder='Your Name'
                        name='name'
                        value={name}
                        onChange={this.onChange}
                        error={errors.name}
                    />
                    <TextField
                        type='text'
                        placeholder='Your Phone'
                        name='phone'
                        value={phone}
                        onChange={this.onChange}
                        error={errors.phone}
                    />
                    <button>Create</button>
                </form>

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