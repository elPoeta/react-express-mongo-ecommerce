import React, { Component } from "react";
import TextFieldInput from "../common/input/TextField";

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    errors: {}
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
  }
  render() {
    const { email, password, confirmPassword, errors } = this.state;
    return (
      <div>
        <h2>Sign Up!</h2>
        <form className="auth-form" onSubmit={this.onSubmit}>
          {errors.invalid}
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

export default SignUp;
