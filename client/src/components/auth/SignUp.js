import React, { Component } from "react";
import { connect } from 'react-redux';
import { signUp } from '../../actions/authAction';
import TextFieldInput from "../common/input/TextField";

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
        <form className="auth-form" onSubmit={this.onSubmit}>
          {errors.invalid && <div className="invalid">{errors.invalid}</div>}
          {errors.exist && <div className="invalid">{errors.exist}</div>}
          <TextFieldInput
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.onChange}
            error={errors.email}
          />
          <TextFieldInput
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.onChange}
            error={errors.password}
          />
          <TextFieldInput
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={this.onChange}
            error={errors.confirmPassword}

          />
          <button>Sign Up</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors.error
})
export default connect(mapStateToProps, { signUp })(SignUp);
