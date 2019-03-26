import React from 'react';
import TextFieldInput from "../common/input/TextField";

const LoginForm = ({ errors, onChange, onSubmit, email, password }) =>
    (
        <form className="auth-form" onSubmit={onSubmit}>
            {errors.invalid && <div className="invalid">{errors.invalid}</div>}
            <TextFieldInput
                type="email"
                name="email"
                placeholder="Email"
                onChange={onChange}
                value={email}
                error={errors.email}
            />
            <TextFieldInput
                type="password"
                name="password"
                placeholder="Password"
                onChange={onChange}
                value={password}
                error={errors.password}
            />
            <button>Login</button>
        </form>
    )


export default LoginForm
