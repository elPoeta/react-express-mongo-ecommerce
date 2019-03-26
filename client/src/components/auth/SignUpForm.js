import React from 'react';
import TextFieldInput from "../common/input/TextField";

const SignUpForm = ({ errors, email, password, confirmPassword, onChange, onSubmit }) =>
    (
        <form className="auth-form" onSubmit={onSubmit}>
            {errors.invalid && <div className="invalid">{errors.invalid}</div>}
            {errors.exist && <div className="invalid">{errors.exist}</div>}
            <TextFieldInput
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={onChange}
                error={errors.email}
            />
            <TextFieldInput
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
                error={errors.password}
            />
            <TextFieldInput
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={onChange}
                error={errors.confirmPassword}

            />
            <button>Sign Up</button>
        </form>
    )


export default SignUpForm;
