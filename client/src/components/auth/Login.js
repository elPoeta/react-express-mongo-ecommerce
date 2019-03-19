import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldInput from "../common/input/TextField";
import { login } from "../../actions/authAction";
import "./auth.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };
  onSubmit = async e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    await this.props.login(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <form className="auth-form" onSubmit={this.onSubmit}>
          <TextFieldInput
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.onChange}
            value={email}
          />
          <TextFieldInput
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.onChange}
            value={password}
          />
          <button>Login</button>
        </form>
        <p>{email}</p>
        <p>{password}</p>
      </div>
    );
  }
}

export default connect(
  null,
  { login }
)(Login);
