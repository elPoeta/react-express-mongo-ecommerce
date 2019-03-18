import React, { Component } from 'react'
import TextFieldInput from '../common/input/TextField';
import './auth.css';

class Login extends Component {
    render() {
        return (
            <div>
                <h2>Login</h2>
                <form className="auth-form">
                    <TextFieldInput type="email" placeholder="Email" />
                    <TextFieldInput type="password" placeholder="Password" />
                    <button>Login</button>
                </form>
            </div>
        )
    }
}

export default Login;