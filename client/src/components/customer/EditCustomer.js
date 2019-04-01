import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getCustomer, createCustomer } from '../../actions/customerAction';
import UserRoute from '../../HOC/UserRoute';
import CustomerForm from './CustomerForm';

class EditCustomer extends Component {
    state = {
        _id: "",
        name: '',
        phone: '',
        errors: {}
    }
    async componentDidMount() {
        await this.props.getCustomer();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.errors !== this.props.errors) {
            this.setState({ errors: this.props.errors });
        }
        if (this.props.customer !== prevProps.customer) {
            const { _id, name, phone } = this.props.customer.customer;
            this.setState({
                _id: _id,
                name: name,
                phone: phone
            })
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
            _id: this.state._id,
            name: this.state.name,
            phone: this.state.phone
        }
        await this.props.createCustomer(customerData, this.props.history);
    }
    render() {
        const { name, phone, errors } = this.state;
        const { customer } = this.props;
        return (
            <div>
                <section className="forms">
                    <h2>Create Customer</h2>
                    <Link to="/my-account" className="btn-back">
                        Back
          </Link>
                    <CustomerForm
                        name={name}
                        phone={phone}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        errors={errors}
                        btnValue="Submit"
                    />
                </section>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    customer: state.customer,
    errors: state.errors.error
})
export default connect(mapStateToProps, { getCustomer, createCustomer })(UserRoute(withRouter(EditCustomer)));