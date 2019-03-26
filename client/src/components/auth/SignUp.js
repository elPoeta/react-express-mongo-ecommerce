import React, { Component } from "react";
import { connect } from 'react-redux';
import { signUp } from '../../actions/authAction';
import SignUpForm from './SignUpForm';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    errors: {}
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }
    this.props.signUp(userData);
  }
  render() {
    const { email, password, confirmPassword, errors } = this.state;
    return (
      <div>
        <h2>Sign Up!</h2>
        <SignUpForm
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          errors={errors}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors.error
})
export default connect(mapStateToProps, { signUp })(SignUp);
