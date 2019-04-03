import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import { login } from "../../actions/authAction";
import "./auth.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };
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
  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { email, password, errors } = this.state;

    return (
      <div>
        <div className="forms">
          <h2>Login</h2>
          <LoginForm
            email={email}
            password={password}
            errors={errors}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          />
        </div>
        <p>Do you not have account ?</p>
        <Link to='/signup' >Sign Up</Link>
      </div>

    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors.error
})
export default connect(
  mapStateToProps,
  { login }
)(Login);
